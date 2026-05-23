import type { ProductEditPanelDefinition, ProductEditValidationError } from '../product-edit-panel.types';
import type { ProductDraft } from '../../../../../../packages/site-core/src/drafts';

type Service = { id: string; name: string; description?: string; priceHint?: string; icon?: string };
type Pricing = { id: string; name: string; price: string; description?: string; features?: string[]; highlighted?: boolean };
type FAQ = { id: string; question: string; answer: string };

export interface BusinessEditFormState {
  brandName: string; tagline?: string; description?: string; industry?: string;
  offer?: { headline?: string; description?: string; primaryCta?: string; secondaryCta?: string };
  services: Service[]; pricingPlans?: Pricing[]; testimonials?: Array<{ id: string; quote: string; authorName?: string; authorTitle?: string }>;
  faqs?: FAQ[]; contact?: { email?: string; phone?: string; address?: string; bookingUrl?: string };
}

const getFields = (d: ProductDraft) => (d.site?.dataModel?.fields ?? {}) as Record<string, unknown>;
const urlOk = (v?: string) => !v || /^https?:\/\//.test(v);
const emailOk = (v?: string) => !v || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

export const businessEditPanel: ProductEditPanelDefinition<BusinessEditFormState> = {
  productTypes: ['business'], label: 'Business',
  draftToForm: (d) => { const f = getFields(d); return { brandName: String(f.brandName ?? ''), tagline: String(f.tagline ?? ''), description: String(f.description ?? ''), industry: String(f.industry ?? ''), offer: (f.offer as BusinessEditFormState['offer']) ?? {}, services: Array.isArray(f.services) ? (f.services as Service[]) : [], pricingPlans: Array.isArray(f.pricingPlans) ? (f.pricingPlans as Pricing[]) : [], testimonials: Array.isArray(f.testimonials) ? (f.testimonials as BusinessEditFormState['testimonials']) : [], faqs: Array.isArray(f.faqs) ? (f.faqs as FAQ[]) : [], contact: (f.contact as BusinessEditFormState['contact']) ?? {} }; },
  validate: (s) => {
    const e: ProductEditValidationError[] = [];
    if (!s.brandName.trim()) e.push({ path: 'brandName', message: 'Brand name required' });
    if ((!s.services.length) && !(s.offer?.headline || s.offer?.description)) e.push({ path: 'services', message: 'Service or offer required' });
    s.services.forEach((x, i) => !x.name?.trim() && e.push({ path: `services.${i}.name`, message: 'Service name required' }));
    s.pricingPlans?.forEach((x, i) => { if (!x.name?.trim()) e.push({ path: `pricingPlans.${i}.name`, message: 'Pricing name required' }); if (!x.price?.trim()) e.push({ path: `pricingPlans.${i}.price`, message: 'Pricing price required' }); });
    s.faqs?.forEach((x, i) => (!x.question?.trim() || !x.answer?.trim()) && e.push({ path: `faqs.${i}`, message: 'FAQ question/answer required' }));
    if (!emailOk(s.contact?.email)) e.push({ path: 'contact.email', message: 'Invalid email' });
    if (!urlOk(s.contact?.bookingUrl)) e.push({ path: 'contact.bookingUrl', message: 'Invalid URL' });
    return { ok: e.length === 0, errors: e };
  },
  toUpdateRequest: (s) => ({ dataPatch: { brandName: s.brandName, tagline: s.tagline, description: s.description, industry: s.industry, offer: s.offer, services: s.services, pricingPlans: s.pricingPlans, testimonials: s.testimonials, faqs: s.faqs, contact: s.contact } }),
  Component: () => null
};
