import { createSceneDocumentFixture } from '../../core/src/index';
import type { ProductSite, SiteDesignSystem } from './types';

export const createDefaultDesignSystemFixture = (): SiteDesignSystem => ({
  colors: { primary: '#111111', secondary: '#666666', background: '#ffffff', text: '#111111' },
  typography: { fontFamily: 'Inter', baseSize: 16, scale: 1.25 },
  spacing: { unit: 4, steps: [1, 2, 3, 4, 6, 8] },
  radius: { sm: 4, md: 8, lg: 16 },
  shadows: { sm: '0 1px 2px rgba(0,0,0,0.08)', md: '0 4px 8px rgba(0,0,0,0.12)', lg: '0 8px 24px rgba(0,0,0,0.16)' },
  motion: { fastMs: 100, normalMs: 200, slowMs: 300 },
  breakpoints: { mobile: 375, tablet: 768, desktop: 1280 }
});

export const createProductSiteFixture = (): ProductSite => {
  const homeDoc = createSceneDocumentFixture();
  return {
    id: 'site-1',
    productType: 'business',
    schemaVersion: '1.0.0',
    siteMap: { pages: [{ id: 'home', path: '/', title: 'Home' }] },
    navigation: { items: [{ id: 'nav-home', label: 'Home', pageId: 'home' }] },
    designSystem: createDefaultDesignSystemFixture(),
    pages: { home: homeDoc },
    dataModel: { id: 'data-1', schemaVersion: '1.0.0', fields: {} },
    publishConfig: { allowDraftPublish: false, channel: 'production' }
  };
};
