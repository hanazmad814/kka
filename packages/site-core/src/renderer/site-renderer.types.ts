import type { RenderMode } from '../../../core/src/renderer';
import type { ProductSite, SitePageRef } from '../types';

export interface SiteRenderOptions {
  mode: RenderMode;
  pageId?: string;
}

export interface SiteRendererContract {
  renderSite(site: ProductSite, options: SiteRenderOptions): string;
  renderPage(site: ProductSite, page: SitePageRef, mode: RenderMode): string;
}
