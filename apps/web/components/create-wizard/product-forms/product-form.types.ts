import type { ProductInput } from '../../../../../packages/product-engine/src/generate';
import type { ComponentType } from 'react';
import type { CreateWizardProductType, ProductScope } from '../create-wizard.types';
export interface ProductFormValidationError { path: string; message: string; }
export interface ProductFormValidationResult { ok: boolean; errors: ProductFormValidationError[]; }
export interface ProductFormComponentProps<TFormState> { value: TFormState; onChange: (next: TFormState) => void; errors?: ProductFormValidationError[]; }
export interface ProductFormDefinition<TFormState = unknown> {
  productTypes: CreateWizardProductType[]; label: string; description?: string;
  getDefaultState: () => TFormState; getSampleState: () => TFormState;
  validate: (state: TFormState) => ProductFormValidationResult;
  toProductInput: (ctx: { productType: CreateWizardProductType; scope: ProductScope; stylePresetId: string; formState: TFormState; }) => ProductInput;
  Component: ComponentType<ProductFormComponentProps<TFormState>>;
}
