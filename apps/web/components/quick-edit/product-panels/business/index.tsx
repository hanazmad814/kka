import type { ProductEditPanelDefinition, ProductEditValidationError, ProductEditPanelProps } from '../product-edit-panel.types';
import type { ProductDraft } from '../../../../../../packages/site-core/src/drafts';

type Service = { id: string; title: string; description?: string; icon?: string };
type Pricing = { id: string; name: string; price: string; features?: string[]; highlighted?: boolean };
type FAQ = { id: string; question: string; answer: string };

export interface BusinessEditFormState {
  businessName: string; tagline?: string; industry?: string; heroTitle?: string; heroSubtitle?: string;
  services: Service[]; benefits: string[]; pricingPlans: Pricing[]; faqs: FAQ[];
  contact?: { phone?: string; email?: string; address?: string; leadFormCta?: string };
}
const getFields = (d: ProductDraft) => (d.site?.dataModel?.fields ?? {}) as Record<string, unknown>;
function BusinessForm({ value, onChange, errors = [] }: ProductEditPanelProps<BusinessEditFormState>) {
  const set = <K extends keyof BusinessEditFormState>(k: K, v: BusinessEditFormState[K]) => onChange({ ...value, [k]: v });
  return <div>
    <input placeholder='Business name' value={value.businessName} onChange={(e)=>set('businessName', e.target.value)} />
    <input placeholder='Hero title' value={value.heroTitle ?? ''} onChange={(e)=>set('heroTitle', e.target.value)} />
    {value.services.map((s, i)=><div key={s.id || i}><input placeholder='Service title' value={s.title} onChange={(e)=>set('services', value.services.map((x,idx)=>idx===i?{...x,title:e.target.value}:x))} /><button onClick={()=>set('services', value.services.filter((_,idx)=>idx!==i))}>Remove</button></div>)}
    <button onClick={()=>set('services', [...value.services, { id: `s_${Date.now()}`, title: '' }])}>Add service</button>
    {errors.map((e, i)=><p key={i} role='alert'>{e.message}</p>)}
  </div>;
}

export const businessEditPanel: ProductEditPanelDefinition<BusinessEditFormState> = {
  productTypes: ['business'], label: 'Business',
  draftToForm: (d) => { const f = getFields(d); return { businessName: String(f.businessName ?? f.brandName ?? ''), tagline: String(f.tagline ?? ''), industry: String(f.industry ?? ''), heroTitle: String((f.offer as { headline?: string } | undefined)?.headline ?? f.heroTitle ?? ''), heroSubtitle: String((f.offer as { description?: string } | undefined)?.description ?? f.heroSubtitle ?? ''), services: Array.isArray(f.services) ? (f.services as Service[]).map((x)=>({ id: x.id, title: (x as { title?: string; name?: string }).title ?? (x as { name?: string }).name ?? '', description: x.description, icon: x.icon })) : [], benefits: Array.isArray(f.benefits) ? (f.benefits as string[]) : [], pricingPlans: Array.isArray(f.pricingPlans) ? (f.pricingPlans as Pricing[]) : [], faqs: Array.isArray(f.faqs) ? (f.faqs as FAQ[]) : [], contact: (f.contact as BusinessEditFormState['contact']) ?? {} }; },
  validate: (s) => { const e: ProductEditValidationError[] = []; if (!s.businessName.trim()) e.push({ path: 'businessName', message: 'Business name required' }); s.services.forEach((x, i) => !x.title?.trim() && e.push({ path: `services.${i}.title`, message: 'Service title required' })); return { ok: e.length === 0, errors: e }; },
  toUpdateRequest: (s) => ({ dataPatch: { businessName: s.businessName, brandName: s.businessName, tagline: s.tagline, industry: s.industry, heroTitle: s.heroTitle, heroSubtitle: s.heroSubtitle, offer: { headline: s.heroTitle, description: s.heroSubtitle }, services: s.services, benefits: s.benefits, pricingPlans: s.pricingPlans, faqs: s.faqs, contact: s.contact } }),
  Component: BusinessForm
};
