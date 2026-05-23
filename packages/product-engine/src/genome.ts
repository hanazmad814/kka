import type { ProductType } from '../../core/src';
import type { SiteRecipe } from './recipes';
import type { BlockVariant, LayoutVariant, StylePreset } from '../../template-system/src';

export interface DesignGenome {
  id: string;
  seed: string;
  productType: ProductType;
  recipeId: string;
  stylePresetId: string;
  layoutVariantId: string;
  blockVariantIds: string[];
}

export interface SeededRandom {
  readonly seed: string;
  next(): number;
  nextInt(maxExclusive: number): number;
}

export const createSeed = (input: { productType: ProductType; scope: string; stylePresetId: string; data: Record<string, unknown> }): string =>
  stableHash(JSON.stringify(input));

export const stableHash = (value: string): string => {
  let hash = 2166136261;
  for (let i = 0; i < value.length; i += 1) {
    hash ^= value.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0).toString(16).padStart(8, '0');
};

export const createSeededRandom = (seed: string): SeededRandom => {
  let state = parseInt(stableHash(seed), 16) >>> 0;
  return {
    seed,
    next: () => {
      state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
      return state / 4294967296;
    },
    nextInt: (maxExclusive: number) => {
      if (maxExclusive <= 0) return 0;
      state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
      return state % maxExclusive;
    }
  };
};

export const genomeId = (genome: Omit<DesignGenome, 'id'>): string =>
  `genome-${stableHash(JSON.stringify(genome))}`;

export const calculateVariantCapacity = (input: {
  recipe: SiteRecipe;
  stylePresets: StylePreset[];
  layoutVariants: LayoutVariant[];
  blockVariants: BlockVariant[];
}): number => {
  const styleCount = Math.max(1, input.stylePresets.length);
  const layoutCount = Math.max(1, input.layoutVariants.length);
  const blockCount = input.recipe.pages
    .flatMap((page) => page.blocks)
    .reduce((acc, block) => {
      const count = input.blockVariants.filter((variant) => variant.blockId === block.blockId).length;
      return acc * Math.max(1, count);
    }, 1);
  return styleCount * layoutCount * blockCount;
};

export const generateGenomeCandidates = (input: {
  productType: ProductType;
  recipe: SiteRecipe;
  stylePresets: StylePreset[];
  layoutVariants: LayoutVariant[];
  blockVariants: BlockVariant[];
  seed: string;
  count: number;
}): DesignGenome[] => {
  const random = createSeededRandom(input.seed);
  const styles = input.stylePresets.filter((item) => item.productType === input.productType);
  const layouts = input.layoutVariants.filter((item) => item.productType === input.productType);
  const blocks = input.blockVariants.filter((item) => item.productType === input.productType);
  if (styles.length === 0) throw new Error('No style presets available for product type');
  if (layouts.length === 0) throw new Error('No layout variants available for product type');

  return Array.from({ length: input.count }).map(() => {
    const style = styles[random.nextInt(styles.length)];
    const layout = layouts[random.nextInt(layouts.length)];
    const blockVariantIds = input.recipe.pages.flatMap((page) => page.blocks.map((block) => {
      const candidates = blocks.filter((variant) => variant.blockId === block.blockId);
      if (candidates.length === 0) throw new Error(`No block variants for blockId ${block.blockId}`);
      return candidates[random.nextInt(candidates.length)].id;
    }));

    const base: Omit<DesignGenome, 'id'> = {
      seed: input.seed,
      productType: input.productType,
      recipeId: input.recipe.id,
      stylePresetId: style.id,
      layoutVariantId: layout.id,
      blockVariantIds
    };
    return { ...base, id: genomeId(base) };
  });
};
