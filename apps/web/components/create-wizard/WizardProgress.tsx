import type { CreateWizardStep } from './create-wizard.types';

const steps: CreateWizardStep[] = ['product-type', 'scope', 'data', 'style', 'generate'];

export function WizardProgress({ step }: { step: CreateWizardStep }) {
  const current = steps.indexOf(step);
  return <div>{steps.map((s, i) => <span key={s} style={{ marginRight: 8, fontWeight: i <= current ? 'bold' : 'normal' }}>{i + 1}. {s}</span>)}</div>;
}
