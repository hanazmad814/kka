import type { CreateWizardFormState } from './create-wizard.types';
export function GenerateStep({ state, onGenerate, loading }: { state: CreateWizardFormState; onGenerate: () => void; loading: boolean }) {
  const data = state.formState as Record<string, unknown>;
  const summary = state.productType.startsWith('restaurant') ? { brandName: data.brandName, menuItemCount: Array.isArray(data.menuItems) ? data.menuItems.length : 0 } : state.productType.startsWith('business') ? { brandName: data.brandName, serviceCount: Array.isArray(data.services) ? data.services.length : 0 } : { couple: `${String(data.brideName ?? '')} & ${String(data.groomName ?? '')}`, date: data.date, venue: data.venueName };
  return <div><pre>{JSON.stringify({ productType: state.productType, scope: state.scope, stylePresetId: state.stylePresetId, ...summary }, null, 2)}</pre><button onClick={onGenerate} disabled={loading}>{loading ? 'Generating...' : 'Generate variants'}</button></div>;
}
