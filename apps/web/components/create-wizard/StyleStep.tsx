import type { CreateWizardFormState } from './create-wizard.types';
import { getStyleOptionsForProductType } from './product-forms/product-form-utils';
export function StyleStep({ state, onChange }: { state: CreateWizardFormState; onChange: (style: string) => void }) {
  return <div>{getStyleOptionsForProductType(state.productType).map((style) => <button key={style} onClick={() => onChange(style)} aria-pressed={state.stylePresetId === style}>{style}</button>)}</div>;
}
