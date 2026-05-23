import { describe, expect, it } from 'vitest';
import { createBlockVariantFixture, createLayoutVariantFixture, createStylePresetFixture } from '../../template-system/src';
import { createSiteRecipeFixture } from '../src/recipes';
import {
  calculateVariantCapacity,
  createSeededRandom,
  generateGenomeCandidates,
  genomeId
} from '../src/genome';

describe('genome foundation', () => {
  it('same seed same output', () => {
    const a = createSeededRandom('seed-1');
    const b = createSeededRandom('seed-1');
    expect([a.next(), a.nextInt(100), a.next()]).toEqual([b.next(), b.nextInt(100), b.next()]);
  });

  it('different seed different output', () => {
    const a = createSeededRandom('seed-1');
    const b = createSeededRandom('seed-2');
    expect([a.next(), a.nextInt(100), a.next()]).not.toEqual([b.next(), b.nextInt(100), b.next()]);
  });

  it('genome id stable', () => {
    const base = {
      seed: 'abc',
      productType: 'business' as const,
      recipeId: 'business-basic',
      stylePresetId: 'minimal',
      layoutVariantId: 'layout-1',
      blockVariantIds: ['hero-a']
    };
    expect(genomeId(base)).toBe(genomeId(base));
  });


  it('different style changes generated candidates', () => {
    const recipe = createSiteRecipeFixture();
    const baseStyle = createStylePresetFixture();
    const altStyle = { ...createStylePresetFixture(), id: 'luxury' };
    const layouts = [createLayoutVariantFixture()];
    const blocks = [createBlockVariantFixture()];

    const g1 = generateGenomeCandidates({ productType: 'business', recipe, stylePresets: [baseStyle], layoutVariants: layouts, blockVariants: blocks, seed: 'seed-1', count: 1 });
    const g2 = generateGenomeCandidates({ productType: 'business', recipe, stylePresets: [altStyle], layoutVariants: layouts, blockVariants: blocks, seed: 'seed-1', count: 1 });
    expect(g1[0].stylePresetId).not.toBe(g2[0].stylePresetId);
  });
  it('capacity calculation > 1B with fixture registry', () => {
    const recipe = createSiteRecipeFixture();
    recipe.pages = [{ id: 'home', title: 'Home', blocks: Array.from({ length: 10 }).map((_, i) => ({ blockId: `hero-${i}`, props: {} })) }];

    const styles = Array.from({ length: 1000 }).map((_, i) => ({ ...createStylePresetFixture(), id: `style-${i}` }));
    const layouts = Array.from({ length: 1000 }).map((_, i) => ({ ...createLayoutVariantFixture(), id: `layout-${i}` }));
    const blocks = recipe.pages[0].blocks.flatMap((block) =>
      Array.from({ length: 2 }).map((_, i) => ({ ...createBlockVariantFixture(), id: `${block.blockId}-v${i}`, blockId: block.blockId }))
    );

    expect(calculateVariantCapacity({ recipe, stylePresets: styles, layoutVariants: layouts, blockVariants: blocks })).toBeGreaterThan(1_000_000_000);
  });

  it('generated genomes are structurally valid', () => {
    const recipe = createSiteRecipeFixture();
    const styles = [createStylePresetFixture()];
    const layouts = [createLayoutVariantFixture()];
    const blocks = [createBlockVariantFixture()];

    const genomes = generateGenomeCandidates({
      productType: 'business',
      recipe,
      stylePresets: styles,
      layoutVariants: layouts,
      blockVariants: blocks,
      seed: 'seed-abc',
      count: 3
    });

    expect(genomes).toHaveLength(3);
    for (const genome of genomes) {
      expect(genome.recipeId).toBe(recipe.id);
      expect(styles.some((item) => item.id === genome.stylePresetId)).toBe(true);
      expect(layouts.some((item) => item.id === genome.layoutVariantId)).toBe(true);
      for (const blockId of genome.blockVariantIds) {
        expect(blocks.some((item) => item.id === blockId)).toBe(true);
      }
    }
  });
});
