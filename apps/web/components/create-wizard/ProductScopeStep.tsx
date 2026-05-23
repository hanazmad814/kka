import type { CreateWizardFormState, ProductScope } from './create-wizard.types';
import { getScopeOptionsForProductType } from './product-forms/product-form-registry';
export function ProductScopeStep({ state, onChange }: { state: CreateWizardFormState; onChange: (scope: ProductScope) => void }) {
  const options = getScopeOptionsForProductType(state.productType);
  return <div>{options.map((opt) => <button key={opt.id} disabled={!opt.enabled} onClick={() => onChange(opt.id)} aria-pressed={state.scope === opt.id}>{opt.label} - {opt.pageSummary}</button>)}</div>;
}
