import { describe, expect, it } from 'vitest';
import {
  createDefaultDesignSystemFixture,
  createProductSiteFixture,
  validateProductSite,
  validatePublishedSiteSnapshot,
  validateSiteDesignSystem
} from '../src/index';

describe('site-core foundation', () => {
  it('valid ProductSite passes', () => {
    expect(validateProductSite(createProductSiteFixture()).valid).toBe(true);
  });

  it('ProductSite missing page fails', () => {
    const site = createProductSiteFixture();
    site.siteMap.pages.push({ id: 'missing', path: '/missing', title: 'Missing' });
    expect(validateProductSite(site).valid).toBe(false);
  });

  it('navigation to unknown page fails', () => {
    const site = createProductSiteFixture();
    site.navigation.items[0].pageId = 'unknown-page';
    expect(validateProductSite(site).valid).toBe(false);
  });

  it('invalid design system fails', () => {
    const design = createDefaultDesignSystemFixture();
    // @ts-expect-error test invalid runtime shape
    design.colors = undefined;
    expect(validateSiteDesignSystem(design).valid).toBe(false);
  });

  it('valid PublishedSiteSnapshot passes', () => {
    const snapshot = {
      id: 'snapshot-1',
      createdAtIso: '2026-05-23T00:00:00.000Z',
      site: createProductSiteFixture(),
      routes: [{ path: '/', pageId: 'home' }],
      assets: []
    };
    expect(validatePublishedSiteSnapshot(snapshot).valid).toBe(true);
  });

  it('same fixture can be imported from package index', () => {
    const site = createProductSiteFixture();
    expect(site.id).toBe('site-1');
  });
});
