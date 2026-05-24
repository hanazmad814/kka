import { describe, expect, it } from 'vitest';
import { validatePublicRenderInput } from '../src/index';
import type { OutcomeFirstMeta, ProductCategory } from '../src/index';

describe('site-core smoke', () => {
  it('exports validators', () => {
    expect(validatePublicRenderInput).toBeTypeOf('function');
  });

  it('supports outcome-first site metadata', () => {
    const category: ProductCategory = 'restaurant-food';
    const meta: OutcomeFirstMeta = {
      pipeline: ['INPUT_DATA', 'GENERATE_VARIANTS', 'SELECT_BEST_DESIGN', 'QUICK_EDIT', 'QUALITY_CHECK', 'PUBLISH'],
      currentStep: 'QUICK_EDIT',
      generatedVariantCount: 4,
      qualityScore: 92
    };

    expect(category).toBe('restaurant-food');
    expect(meta.generatedVariantCount).toBe(4);
  });
});
