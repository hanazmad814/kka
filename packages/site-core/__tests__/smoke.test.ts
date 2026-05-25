import { describe, expect, it } from 'vitest';
import { OUTCOME_FIRST_PIPELINE, validatePublicRenderInput } from '../src/index';
import type { OutcomeFirstMeta, ProductCategory, ProductDraft } from '../src/index';

describe('site-core smoke', () => {
  it('exports validators', () => {
    expect(validatePublicRenderInput).toBeTypeOf('function');
  });

  it('supports outcome-first site metadata and draft typing', () => {
    const category: ProductCategory = 'restaurant-food';
    const meta: OutcomeFirstMeta = {
      pipeline: [...OUTCOME_FIRST_PIPELINE],
      currentStep: 'QUICK_EDIT',
      generatedVariantCount: 4,
      qualityScore: 92,
      publishReady: false
    };

    const draftRef: Pick<ProductDraft, 'id' | 'productCategory'> = {
      id: 'draft_001',
      productCategory: category
    };

    expect(meta.generatedVariantCount).toBe(4);
    expect(draftRef.productCategory).toBe('restaurant-food');
  });
});
