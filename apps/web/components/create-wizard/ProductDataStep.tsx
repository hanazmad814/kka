import type { ComponentType } from 'react';
import type { CreateWizardFormState } from './create-wizard.types';
import { getProductFormDefinition } from './product-forms/product-form-registry';
import type { ProductFormComponentProps, ProductFormValidationError } from './product-forms/product-form.types';
export function ProductDataStep({ state, onChange, errors }: { state: CreateWizardFormState; onChange: (next: CreateWizardFormState) => void; errors?: ProductFormValidationError[] }) {
  const def = getProductFormDefinition(state.productType); if (!def) return <p>Unsupported product</p>;
  const Component = def.Component as ComponentType<ProductFormComponentProps<unknown>>;
  return <div>
    <button onClick={() => onChange({ ...state, formState: def.getSampleState() })}>Use sample data</button>
    <Component value={state.formState} onChange={(next: unknown) => onChange({ ...state, formState: next })} errors={errors} />
  </div>;
}
