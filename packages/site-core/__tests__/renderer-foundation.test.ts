import { describe, expect, it } from 'vitest';
import { createProductSiteFixture } from '../src/fixtures';
import { PreviewRenderer, PublicRenderer, SiteRenderer, renderProductSite } from '../src/renderer';

describe('site-core renderer foundation', () => {
  it('render valid ProductSite fixture', () => {
    const html = renderProductSite(createProductSiteFixture(), 'public');
    expect(html).toContain('data-site-id="site-1"');
  });

  it('PublicRenderer has no editor UI markers', () => {
    const html = PublicRenderer.render(createProductSiteFixture());
    expect(html).not.toContain('data-editor-control');
    expect(html).not.toContain('data-preview-wrapper');
  });

  it('PreviewRenderer wraps separately from PublicRenderer', () => {
    const html = PreviewRenderer.render(createProductSiteFixture());
    expect(html).toContain('data-preview-wrapper="true"');
  });

  it('SiteRenderer contract renders site/page', () => {
    const site = createProductSiteFixture();
    const siteHtml = SiteRenderer.renderSite(site, { mode: 'public' });
    const pageHtml = SiteRenderer.renderPage(site, site.siteMap.pages[0], 'preview');
    expect(siteHtml).toContain('data-site-id="site-1"');
    expect(pageHtml).toContain(`data-page-id="${site.siteMap.pages[0].id}"`);
  });
});
