import { createProductSiteFixture } from '../fixtures';
import type { ProductDraft } from './draft.types';

export const createProductDraftFixture = (): ProductDraft => ({
  id: 'draft-1',
  siteId: 'site-1',
  productType: 'business',
  status: 'draft',
  site: createProductSiteFixture(),
  source: { type: 'generated_variant', variantId: 'variant-1' },
  meta: { createdAt: 1, updatedAt: 1, selectedAt: 1 }
});
