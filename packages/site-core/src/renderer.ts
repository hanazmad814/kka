import { createRendererContext, renderSceneDocument, type RenderMode } from '../../core/src/renderer';
import type { ProductSite, SitePageRef } from './types';

export const renderSitePage = (site: ProductSite, page: SitePageRef, mode: RenderMode): string => {
  const scene = site.pages[page.id];
  if (!scene) {
    return `<article data-page-id="${page.id}" data-missing-page="true"></article>`;
  }

  const context = createRendererContext(mode, site.designSystem);
  const body = renderSceneDocument(scene, context);
  const warnings = context.warnings.map((warning) => `<li>${warning}</li>`).join('');
  return `<article data-page-id="${page.id}">${body}${warnings ? `<ul data-render-warnings="true">${warnings}</ul>` : ''}</article>`;
};

export const renderProductSite = (site: ProductSite, mode: RenderMode): string => {
  const pages = site.siteMap.pages.map((page) => renderSitePage(site, page, mode)).join('');
  return `<div data-site-id="${site.id}" data-render-mode="${mode}">${pages}</div>`;
};

export const PublicRenderer = {
  render: (site: ProductSite): string => renderProductSite(site, 'public')
};

export const PreviewRenderer = {
  render: (site: ProductSite): string => `<div data-preview-wrapper="true">${renderProductSite(site, 'preview')}</div>`
};
