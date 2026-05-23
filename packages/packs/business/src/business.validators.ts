import type { BusinessInput } from './business.types';
const urlOk = (value?: string) => !value || /^https?:\/\//.test(value);
const emailOk = (value?: string) => !value || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
export const validateBusinessInput = (input: BusinessInput): { valid: boolean; issues: string[] } => {
  const issues: string[] = [];
  if (!input.data.brandName?.trim()) issues.push('brandName required');
  const hasOffer = !!(input.data.offer?.headline || input.data.offer?.description);
  if ((!input.data.services || input.data.services.length === 0) && !hasOffer) issues.push('at least one service or offer required');
  input.data.services?.forEach((s, i) => { if (!s.name?.trim()) issues.push(`service[${i}].name required`); });
  input.data.pricingPlans?.forEach((p, i) => { if (!p.name?.trim()) issues.push(`pricingPlans[${i}].name required`); if (!p.price?.trim()) issues.push(`pricingPlans[${i}].price required`); });
  input.data.testimonials?.forEach((t, i) => { if (!t.quote?.trim()) issues.push(`testimonials[${i}].quote required`); });
  input.data.faqs?.forEach((f, i) => { if (!f.question?.trim() || !f.answer?.trim()) issues.push(`faqs[${i}] question/answer required`); });
  if (!emailOk(input.data.contact?.email)) issues.push('invalid contact.email');
  if (!urlOk(input.data.contact?.bookingUrl)) issues.push('invalid contact.bookingUrl');
  input.data.socialLinks?.forEach((s, i) => { if (!urlOk(s.url)) issues.push(`socialLinks[${i}].url invalid`); });
  return { valid: issues.length === 0, issues };
};
