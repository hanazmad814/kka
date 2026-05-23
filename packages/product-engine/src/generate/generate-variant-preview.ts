import { PreviewRenderer, type ProductSite } from '../../../site-core/src';
export const generateVariantPreview = (site: ProductSite): string => PreviewRenderer.render(site);
