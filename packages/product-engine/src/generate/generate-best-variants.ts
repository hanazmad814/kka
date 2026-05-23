import { normalizeProductData, assembleSite, type ProductInput } from '../assembly';
import { createSeed, createSeededRandom, generateGenomeCandidates } from '../genome';
import { createSiteRecipeFixture, RecipeRegistry } from '../recipes';
import { createRestaurantSiteRecipe, restaurantBlockVariants } from '../../../packs/restaurant/src';
import { createBusinessSiteRecipe, businessBlockVariants } from '../../../packs/business/src';
import { createWeddingSiteRecipe, weddingBlockVariants } from '../../../packs/wedding/src';
import { createLayoutVariantFixture, createStylePresetFixture, createBlockVariantFixture, defaultStylePresets } from '../../../template-system/src';
import { CompatibilityRegistry, defaultCompatibilityRules, filterCompatibleGenomes } from '../compatibility';
import { runQualityGate } from '../quality-gate';
import { scoreDesignCandidate, selectTopK } from '../scoring';
import type { GenerateBestVariantsOptions, GenerateBestVariantsResult, GeneratedVariant } from './generate-best-variants.types';
import { generateVariantPreview } from './generate-variant-preview';

const beamGenerateGenomes = (input: { input: ProductInput; maxCandidates: number; seed: string }) => {
  const scope = (input.input.data.restaurantScope ?? input.input.data.businessScope ?? input.input.data.weddingScope) as 'one_page' | 'mini_site_3_pages' | 'standard_site_5_pages' | undefined;
  const normalizedScope = scope ?? 'one_page';
  const recipe = input.input.productType === 'restaurant' ? createRestaurantSiteRecipe(normalizedScope) : input.input.productType === 'business' ? createBusinessSiteRecipe(normalizedScope) : input.input.productType === 'wedding' ? createWeddingSiteRecipe(normalizedScope) : createSiteRecipeFixture();
  const styles = defaultStylePresets.filter((s) => s.productType === input.input.productType);
  const layouts = [input.input.productType === 'restaurant' ? { ...createLayoutVariantFixture(), id: 'restaurant-layout', productType: 'restaurant' as const } : input.input.productType === 'business' ? { ...createLayoutVariantFixture(), id: 'business-layout', productType: 'business' as const } : input.input.productType === 'wedding' ? { ...createLayoutVariantFixture(), id: 'wedding-layout', productType: 'wedding' as const } : createLayoutVariantFixture()];
  const blocks = input.input.productType === 'restaurant'
    ? recipe.pages.flatMap((p) => p.blocks).map((b, i) => ({ ...createBlockVariantFixture(), id: (restaurantBlockVariants[i % restaurantBlockVariants.length]?.id ?? `block-${i}`), blockId: b.blockId, productType: input.input.productType }))
    : input.input.productType === 'business'
      ? recipe.pages.flatMap((p) => p.blocks).map((b, i) => ({ ...createBlockVariantFixture(), id: (businessBlockVariants[i % businessBlockVariants.length]?.id ?? `business-block-${i}`), blockId: b.blockId, productType: input.input.productType }))
      : input.input.productType === 'wedding'
        ? recipe.pages.flatMap((p) => p.blocks).map((b, i) => ({ ...createBlockVariantFixture(), id: (weddingBlockVariants[i % weddingBlockVariants.length]?.id ?? `wedding-block-${i}`), blockId: b.blockId, productType: input.input.productType }))
        : recipe.pages[0].blocks.map((b, i) => ({ ...createBlockVariantFixture(), id: `block-${i}`, blockId: b.blockId, productType: input.input.productType }));
  return generateGenomeCandidates({ productType: input.input.productType, recipe, stylePresets: styles.length ? styles : [createStylePresetFixture()], layoutVariants: layouts, blockVariants: blocks, seed: input.seed, count: input.maxCandidates });
};

export const generateBestVariants = (input: ProductInput, options?: GenerateBestVariantsOptions): GenerateBestVariantsResult => {
  const start = Date.now();
  const min = options?.minVariants ?? 3;
  const max = options?.maxVariants ?? 6;
  const maxCandidates = options?.maxCandidates ?? 120;

  const normalizedInput: ProductInput = { ...input, data: normalizeProductData(input) };
  const seed = createSeed(normalizedInput);
  const _rng = createSeededRandom(seed);

  const genomes = beamGenerateGenomes({ input: normalizedInput, maxCandidates, seed });
  const scope = (normalizedInput.data.restaurantScope ?? normalizedInput.data.businessScope ?? normalizedInput.data.weddingScope) as 'one_page' | 'mini_site_3_pages' | 'standard_site_5_pages' | undefined;
  const normalizedScope = scope ?? 'one_page';
  const recipe = normalizedInput.productType === 'restaurant' ? createRestaurantSiteRecipe(normalizedScope) : normalizedInput.productType === 'business' ? createBusinessSiteRecipe(normalizedScope) : normalizedInput.productType === 'wedding' ? createWeddingSiteRecipe(normalizedScope) : createSiteRecipeFixture();
  const layoutId = normalizedInput.productType === 'restaurant' ? 'restaurant-layout' : normalizedInput.productType === 'business' ? 'business-layout' : normalizedInput.productType === 'wedding' ? 'wedding-layout' : createLayoutVariantFixture().id;
  const meta = {
    layoutTagsById: { [layoutId]: ['mobile-supported'] },
    blockTagsById: Object.fromEntries(recipe.pages[0].blocks.map((b, i) => [[`block-${i}`], ['hero']])),
    styleTagsById: Object.fromEntries(defaultStylePresets.map((s) => [s.id, ['neutral']])),
    pageCountByRecipeId: { [recipe.id]: recipe.pages.length }
  };
  const compatible = filterCompatibleGenomes(genomes, normalizedInput, new CompatibilityRegistry(defaultCompatibilityRules), meta as never);

  const registry = new RecipeRegistry([recipe]);
  const scored = compatible.map((genome) => {
    const site = assembleSite(normalizedInput, registry);
    const quality = runQualityGate(site, { mode: 'preview', strict: options?.strictQuality ?? false });
    return scoreDesignCandidate({ site, input: normalizedInput, genome, quality, allCandidates: compatible.map((g) => ({ genome: g, site })) });
  }).filter((c) => c.quality.blockingCount === 0);

  const selected = selectTopK(scored, { min, max, enforceDiversity: true });
  const variants: GeneratedVariant[] = selected.map((candidate) => {
    const site = candidate.site;
    const quality = runQualityGate(site, { mode: options?.strictQuality ? 'publish' : 'preview', strict: options?.strictQuality ?? false });
    return { id: candidate.id, genome: candidate.genome!, site, quality, score: candidate.score, reasons: candidate.reasons, preview: generateVariantPreview(site) };
  });

  return {
    ok: variants.length >= Math.min(min, max),
    variants,
    issues: variants.flatMap((v) => v.quality.issues),
    metrics: options?.includeMetrics ? {
      seed,
      candidateCount: genomes.length,
      compatibleCandidateCount: compatible.length,
      previewCandidateCount: scored.length,
      validCandidateCount: variants.filter((v) => v.quality.blockingCount === 0).length,
      selectedCount: variants.length,
      elapsedMs: Date.now() - start
    } : undefined
  };
};
