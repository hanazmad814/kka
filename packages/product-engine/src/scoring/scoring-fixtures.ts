import { createProductSiteFixture } from '../../../site-core/src';
import type { ProductInput } from '../assembly';

export const createScoringInputFixture = (): ProductInput => ({
  productType: 'business',
  scope: 'landing',
  stylePresetId: 'minimal',
  data: { businessName: 'Acme', seoTitle: 'Acme', seoDescription: 'Desc' }
});

export const createScoringSiteFixture = () => createProductSiteFixture();
