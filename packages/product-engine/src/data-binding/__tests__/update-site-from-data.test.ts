import { describe, expect, it } from 'vitest';
import { createProductSiteFixture } from '../../../../site-core/src/fixtures';
import { updateSiteFromDataPatch } from '../update-site-from-data';

describe('updateSiteFromDataPatch', () => {
  it('does not mutate original site', () => {
    const site = createProductSiteFixture();
    const original = structuredClone(site);
    const updated = updateSiteFromDataPatch(site, { dataPatch: { brandName: 'New Brand' } });
    expect(site).toEqual(original);
    expect(updated.dataModel.fields.brandName).toBe('New Brand');
  });

  it('supports restaurant/business/wedding and preserves structure', () => {
    for (const pt of ['restaurant', 'business', 'wedding'] as const) {
      const site = { ...createProductSiteFixture(), productType: pt };
      const updated = updateSiteFromDataPatch(site, { dataPatch: { phone: '123' }, stylePresetId: 'minimal' });
      expect(updated.productType).toBe(site.productType);
      expect(updated.siteMap.pages.length).toBe(site.siteMap.pages.length);
      expect(updated.navigation.items.length).toBe(site.navigation.items.length);
      expect(updated.dataModel.fields.stylePresetId).toBe('minimal');
    }
  });
});
