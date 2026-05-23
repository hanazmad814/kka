import type { BusinessInput } from './business.types';
export const businessCompatibilityRules = [
  { id: 'business-landing-requires-core', description: 'business_landing requires BusinessHeroBlock + CTASectionBlock' }
];
export const applyBusinessCompatibility = (input: BusinessInput, candidates: Array<{ id: string; tags: string[] }>) => candidates.filter((c) => {
  if (input.scope === 'one_page' && c.tags.includes('multi-page')) return false;
  if (!input.data.assets?.heroImageUrl && c.tags.includes('image-heavy')) return false;
  if ((input.data.services?.length ?? 0) > 6 && c.tags.includes('sparse')) return false;
  if (!input.data.pricingPlans?.length && c.tags.includes('pricing-table')) return false;
  return true;
});
