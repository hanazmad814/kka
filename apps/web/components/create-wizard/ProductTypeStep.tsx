import type { CreateWizardFormState, CreateWizardProductType } from './create-wizard.types';
const cards: Array<{ id: CreateWizardProductType | string; title: string; description: string; available: boolean }> = [
  { id: 'restaurant_site', title: 'Restaurant Website', description: 'Website for restaurant', available: true },
  { id: 'restaurant_menu', title: 'Restaurant Menu', description: 'Digital menu', available: true },
  { id: 'business_landing', title: 'Business Landing', description: 'Conversion landing', available: true },
  { id: 'business_website', title: 'Business Website', description: '3-5 pages site', available: true },
  { id: 'wedding_invitation', title: 'Wedding Invitation', description: 'Invitation website', available: true },
  { id: 'event_page', title: 'Event Page', description: 'Coming soon', available: false }
];
export function ProductTypeStep({ state, onChange }: { state: CreateWizardFormState; onChange: (next: CreateWizardProductType) => void }) {
  return <div>{cards.map((c)=><button key={c.id} disabled={!c.available} onClick={()=>c.available&&onChange(c.id as CreateWizardProductType)} aria-pressed={state.productType===c.id}><strong>{c.title}</strong> {c.description} ({c.available?'available':'upcoming'}) [{c.id}]</button>)}</div>;
}
