import type { ProductType } from '../../../../../packages/core/src';
import type { ProductDraft, UpdateDraftRequest } from '../../../../../packages/site-core/src/drafts';
export interface ProductEditValidationError { path: string; message: string; }
export interface ProductEditValidationResult { ok: boolean; errors: ProductEditValidationError[]; }
export interface ProductEditPanelProps<TFormState> { value: TFormState; onChange: (next: TFormState) => void; errors?: ProductEditValidationError[]; }
export interface ProductEditPanelDefinition<TFormState = unknown> {
  productTypes: ProductType[]; label: string; description?: string;
  draftToForm: (draft: ProductDraft) => TFormState;
  validate: (state: TFormState) => ProductEditValidationResult;
  toUpdateRequest: (state: TFormState) => UpdateDraftRequest;
  Component: (props: ProductEditPanelProps<TFormState>) => unknown;
}
