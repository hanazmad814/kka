import { productFormToProductInput } from './product-forms/product-form-registry';
import type { CreateWizardFormState } from './create-wizard.types';
export const toProductInput = (state: CreateWizardFormState) => {
  const input = productFormToProductInput(state.productType, state.scope, state.stylePresetId, state.formState);
  if (!input) throw new Error('Unsupported product type');
  return input;
};
