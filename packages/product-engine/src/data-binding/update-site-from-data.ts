import type { ProductSite } from '../../../site-core/src/types';
import type { UpdateDraftRequest } from '../../../site-core/src/drafts';
import { updateBusinessSiteFromDataPatch, updateRestaurantSiteFromDataPatch, updateWeddingSiteFromDataPatch } from './product-data-updaters';

export function updateSiteFromDataPatch(site: ProductSite, patch: UpdateDraftRequest): ProductSite {
  const dataPatch = patch.dataPatch ?? {};
  let next: ProductSite;
  if (site.productType === 'restaurant') next = updateRestaurantSiteFromDataPatch(site, dataPatch);
  else if (site.productType === 'business') next = updateBusinessSiteFromDataPatch(site, dataPatch);
  else if (site.productType === 'wedding') next = updateWeddingSiteFromDataPatch(site, dataPatch);
  else next = { ...structuredClone(site), dataModel: { ...site.dataModel, fields: { ...site.dataModel.fields, ...dataPatch } } };
  if (patch.stylePresetId) next = { ...next, dataModel: { ...next.dataModel, fields: { ...next.dataModel.fields, stylePresetId: patch.stylePresetId } } };
  return next;
}
