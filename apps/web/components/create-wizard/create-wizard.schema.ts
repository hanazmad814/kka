import type { CreateWizardFormState } from './create-wizard.types';
import { validateProductForm } from './product-forms/product-form-registry';
export const validateWizardState = (state: CreateWizardFormState): { valid: boolean; fieldErrors: Record<string, string> } => {
  const fieldErrors: Record<string, string> = {};
  if (!state.productType) fieldErrors.productType = 'Product type is required.';
  if (!state.scope) fieldErrors.scope = 'Scope is required.';
  if (!state.stylePresetId) fieldErrors.stylePresetId = 'Style is required.';
  const result = validateProductForm(state.productType, state.formState);
  result.errors.forEach((e) => { fieldErrors[e.path] = e.message; });
  return { valid: Object.keys(fieldErrors).length === 0, fieldErrors };
};
