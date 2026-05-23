import { describe, expect, it } from 'vitest';
import { validateProductSite } from '../../../site-core/src';
import { runQualityGate } from '../../../product-engine/src/quality-gate';
import { generateBestVariants } from '../../../product-engine/src/generate';
import {
  applyBusinessCompatibility,
  businessBlockDefinitions,
  businessBlockVariants,
  businessPageRecipes,
  businessSampleData,
  createBusinessPackRegistry,
  createBusinessSiteRecipe,
  validateBusinessInput
} from '../src';

const toProductInput = (r: (typeof businessSampleData)[keyof typeof businessSampleData]) => ({
  productType: 'business' as const,
  scope: r.scope === 'one_page' ? 'landing' as const : 'full-site' as const,
  stylePresetId: r.stylePresetId,
  data: { ...r.data, businessScope: r.scope }
});

describe('business pack', () => {
  it('registry loads', () => expect(createBusinessPackRegistry('one_page').blockDefinitions.length).toBeGreaterThan(0));
  it('site recipe validates required pages', () => expect(createBusinessSiteRecipe('mini_site_3_pages').pages.map((p) => p.id)).toEqual(['home', 'services', 'contact']));
  it('site recipe standard pages', () => expect(createBusinessSiteRecipe('standard_site_5_pages').pages.map((p) => p.id)).toEqual(['home', 'services', 'pricing', 'about', 'contact']));
  it('block definitions and variants cover required ids', () => {
    expect(businessBlockDefinitions.some((b) => b.id === 'BusinessHeroBlock')).toBe(true);
    expect(businessBlockDefinitions.some((b) => b.id === 'CTASectionBlock')).toBe(true);
    expect(businessBlockVariants.some((b) => b.id === 'hero-conversion-focused')).toBe(true);
  });
  it('validator rejects missing brandName', () => expect(validateBusinessInput({ ...businessSampleData.minimalBusinessLanding, data: { ...businessSampleData.minimalBusinessLanding.data, brandName: '' } }).valid).toBe(false));
  it('validator rejects no services and no offer', () => expect(validateBusinessInput({ ...businessSampleData.minimalBusinessLanding, data: { ...businessSampleData.minimalBusinessLanding.data, services: [], offer: {} } }).valid).toBe(false));
  it('validator accepts valid minimal', () => expect(validateBusinessInput(businessSampleData.minimalBusinessLanding).valid).toBe(true));
  it('validator rejects invalid pricing and faq', () => {
    const invalid = {
      ...businessSampleData.richBusinessLanding,
      data: {
        ...businessSampleData.richBusinessLanding.data,
        pricingPlans: [{ id: 'p1', name: '', price: '', features: [] }],
        faqs: [{ id: 'f1', question: '', answer: '' }]
      }
    };
    expect(validateBusinessInput(invalid).valid).toBe(false);
  });
  it('minimal landing generates 3-6 variants', () => { const r = generateBestVariants(toProductInput(businessSampleData.minimalBusinessLanding)); expect(r.variants.length).toBeGreaterThanOrEqual(3); expect(r.variants.length).toBeLessThanOrEqual(6); });
  it('standard website has required pages', () => { const site = generateBestVariants(toProductInput(businessSampleData.standardBusinessWebsite), { maxVariants: 1 }).variants[0].site; expect(site.siteMap.pages.map((p) => p.id)).toEqual(['home', 'services', 'pricing', 'about', 'contact']); });
  it('business landing includes CTA block in recipe', () => {
    expect(businessPageRecipes.landing.blocks.some((b) => b.blockId === 'CTASectionBlock')).toBe(true);
  });
  it('all variants validate with no blocking quality issues', () => { const r = generateBestVariants(toProductInput(businessSampleData.richBusinessLanding)); expect(r.variants.every((v) => validateProductSite(v.site).valid)).toBe(true); expect(r.variants.every((v) => runQualityGate(v.site).blockingCount === 0)).toBe(true); });
  it('deterministic ids same input and style-sensitive ids for different style', () => {
    const a = generateBestVariants(toProductInput(businessSampleData.minimalBusinessLanding));
    const b = generateBestVariants(toProductInput(businessSampleData.minimalBusinessLanding));
    expect(a.variants.map((v) => v.genome.id)).toEqual(b.variants.map((v) => v.genome.id));
    const modern = { ...toProductInput(businessSampleData.minimalBusinessLanding), stylePresetId: 'modern' as const };
    const c = generateBestVariants(modern);
    expect(a.variants.map((v) => v.genome.id)).not.toEqual(c.variants.map((v) => v.genome.id));
  });
  it('compatibility removes image-heavy for no-image input', () => {
    const out = applyBusinessCompatibility(businessSampleData.noImageBusiness, [{ id: 'a', tags: ['image-heavy'] }, { id: 'b', tags: ['minimal_typography'] }]);
    expect(out.map((x) => x.id)).toEqual(['b']);
  });
  it('compatibility prefers compact service layout when service-heavy', () => {
    const out = applyBusinessCompatibility(businessSampleData.serviceHeavyBusiness, [{ id: 'sparse', tags: ['sparse'] }, { id: 'compact', tags: ['compact_grid'] }]);
    expect(out.map((x) => x.id)).toEqual(['compact']);
  });
  it('compatibility removes full pricing table for no-pricing input', () => {
    const out = applyBusinessCompatibility(businessSampleData.noPricingBusiness, [{ id: 'pricing', tags: ['pricing-table'] }, { id: 'services', tags: ['card_grid'] }]);
    expect(out.map((x) => x.id)).toEqual(['services']);
  });
  it('page recipes contain at least one block', () => {
    Object.values(businessPageRecipes).forEach((p) => expect(p.blocks.length).toBeGreaterThan(0));
  });
});
