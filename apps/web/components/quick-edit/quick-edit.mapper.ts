import type { ProductDraft } from '../../../../packages/site-core/src/drafts';
import { draftToProductEditForm, productEditFormToUpdateRequest } from './product-panels/product-edit-panel-registry';
export function draftToQuickEditForm(draft: ProductDraft): unknown { return draftToProductEditForm(draft) ?? {}; }
export function quickEditFormToUpdateRequest(productType: ProductDraft['productType'], form: unknown) { return productEditFormToUpdateRequest(productType, form) ?? { dataPatch: {} }; }
