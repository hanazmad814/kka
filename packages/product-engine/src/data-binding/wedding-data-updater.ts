import type { ProductSite } from '../../../site-core/src/types';
export const updateWeddingSiteFromDataPatch = (site: ProductSite, patch: Record<string, unknown>): ProductSite => ({ ...structuredClone(site), dataModel: { ...site.dataModel, fields: { ...site.dataModel.fields, ...patch } } });
