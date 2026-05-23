import type { ProductInput } from '../assembly';
import type { DesignGenome } from '../genome';

export interface CompatibilityContext {
  input: ProductInput;
  candidate: DesignGenome;
  metadata: {
    layoutTagsById: Record<string, string[]>;
    blockTagsById: Record<string, string[]>;
    styleTagsById: Record<string, string[]>;
    pageCountByRecipeId: Record<string, number>;
  };
}

export interface CompatibilityResult {
  ruleId: string;
  pass: boolean;
  severity: 'error' | 'warning';
  reason: string;
}

export interface CompatibilityRule {
  id: string;
  description: string;
  evaluate(context: CompatibilityContext): CompatibilityResult;
}

export class CompatibilityRegistry {
  private readonly byId = new Map<string, CompatibilityRule>();

  constructor(rules: CompatibilityRule[] = []) {
    this.load(rules);
  }

  load(rules: CompatibilityRule[]): void {
    for (const rule of rules) {
      if (this.byId.has(rule.id)) throw new Error(`Duplicate compatibility rule id: ${rule.id}`);
      this.byId.set(rule.id, rule);
    }
  }

  list(): CompatibilityRule[] {
    return Array.from(this.byId.values());
  }
}

const ok = (ruleId: string, reason: string, severity: 'error' | 'warning' = 'error'): CompatibilityResult => ({ ruleId, pass: true, severity, reason });
const fail = (ruleId: string, reason: string, severity: 'error' | 'warning' = 'error'): CompatibilityResult => ({ ruleId, pass: false, severity, reason });

export const defaultCompatibilityRules: CompatibilityRule[] = [
  {
    id: 'no-image-reject-image-heavy',
    description: 'No image input must reject image-heavy layouts.',
    evaluate: (context) => {
      const noImage = context.input.data.noImageInput === true;
      const tags = context.metadata.layoutTagsById[context.candidate.layoutVariantId] ?? [];
      return !noImage || !tags.includes('image-heavy') ? ok('no-image-reject-image-heavy', 'pass') : fail('no-image-reject-image-heavy', 'image-heavy layout rejected');
    }
  },
  {
    id: 'menu-60-reject-sparse',
    description: 'Restaurant/menu with >50 items must reject sparse menu layouts.',
    evaluate: (context) => {
      const isRestaurant = context.input.productType === 'restaurant';
      const menuCount = Number(context.input.data.menuItemCount ?? 0);
      const tags = context.metadata.layoutTagsById[context.candidate.layoutVariantId] ?? [];
      return !(isRestaurant && menuCount > 50 && tags.includes('sparse-menu')) ? ok('menu-60-reject-sparse', 'pass') : fail('menu-60-reject-sparse', 'sparse menu layout rejected');
    }
  },
  {
    id: 'luxury-reject-neon',
    description: 'Luxury style must reject neon/rainbow palettes.',
    evaluate: (context) => {
      const isLuxury = context.candidate.stylePresetId === 'luxury';
      const tags = context.metadata.styleTagsById[context.candidate.stylePresetId] ?? [];
      return !(isLuxury && (tags.includes('neon') || tags.includes('rainbow'))) ? ok('luxury-reject-neon', 'pass') : fail('luxury-reject-neon', 'neon/rainbow palette rejected');
    }
  },
  {
    id: 'catalog-require-grid',
    description: 'Catalog product must require product-grid/collection block.',
    evaluate: (context) => {
      const isCatalog = context.input.productType === 'business' && context.input.data.catalog === true;
      const okBlock = context.candidate.blockVariantIds.some((id) => (context.metadata.blockTagsById[id] ?? []).some((tag) => tag === 'product-grid' || tag === 'collection'));
      return !isCatalog || okBlock ? ok('catalog-require-grid', 'pass') : fail('catalog-require-grid', 'missing product-grid/collection block');
    }
  },
  {
    id: 'one-page-reject-multipage-nav',
    description: 'One-page scope must reject multi-page navigation.',
    evaluate: (context) => {
      const isOnePage = context.input.scope === 'landing';
      const pageCount = context.metadata.pageCountByRecipeId[context.candidate.recipeId] ?? 1;
      return !(isOnePage && pageCount > 1) ? ok('one-page-reject-multipage-nav', 'pass') : fail('one-page-reject-multipage-nav', 'multi-page recipe rejected for one-page scope');
    }
  },
  {
    id: 'mobile-first-require-mobile-variant',
    description: 'Mobile-first products must require mobile-supported variants.',
    evaluate: (context) => {
      const mobileFirst = context.input.data.mobileFirst === true;
      const layoutTags = context.metadata.layoutTagsById[context.candidate.layoutVariantId] ?? [];
      return !mobileFirst || layoutTags.includes('mobile-supported') ? ok('mobile-first-require-mobile-variant', 'pass') : fail('mobile-first-require-mobile-variant', 'missing mobile-supported variant');
    }
  },
  {
    id: 'long-text-reject-short-copy-layout',
    description: 'Long text must reject short-copy-only layouts.',
    evaluate: (context) => {
      const longText = String(context.input.data.longText ?? '').length > 280;
      const layoutTags = context.metadata.layoutTagsById[context.candidate.layoutVariantId] ?? [];
      return !(longText && layoutTags.includes('short-copy-only')) ? ok('long-text-reject-short-copy-layout', 'pass') : fail('long-text-reject-short-copy-layout', 'short-copy-only layout rejected');
    }
  },
  {
    id: 'warning-rule-non-blocking',
    description: 'Example warning-only rule.',
    evaluate: () => fail('warning-rule-non-blocking', 'advisory warning', 'warning')
  }
];

export const evaluateCompatibility = (context: CompatibilityContext, registry: CompatibilityRegistry): CompatibilityResult[] =>
  registry.list().map((rule) => rule.evaluate(context));

export const filterCompatibleGenomes = (
  candidates: DesignGenome[],
  input: ProductInput,
  registry: CompatibilityRegistry,
  metadata: CompatibilityContext['metadata']
): DesignGenome[] =>
  candidates.filter((candidate) => {
    const results = evaluateCompatibility({ input, candidate, metadata }, registry);
    return !results.some((result) => result.severity === 'error' && !result.pass);
  });
