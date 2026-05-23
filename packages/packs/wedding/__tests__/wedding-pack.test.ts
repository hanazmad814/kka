import { describe, expect, it } from 'vitest';
import { validateProductSite } from '../../../site-core/src';
import { runQualityGate } from '../../../product-engine/src/quality-gate';
import { generateBestVariants } from '../../../product-engine/src/generate';
import { applyWeddingCompatibility, createWeddingPackRegistry, createWeddingSiteRecipe, validateWeddingInput, weddingBlockVariants, weddingPageRecipes, weddingSampleData } from '../src';
const toProductInput = (r: (typeof weddingSampleData)[keyof typeof weddingSampleData]) => ({ productType:'wedding' as const, scope:r.scope === 'one_page' ? 'landing' as const : 'full-site' as const, stylePresetId:r.stylePresetId, data:{...r.data, weddingScope:r.scope} });
describe('wedding pack', () => {
  it('registry loads', () => expect(createWeddingPackRegistry().blockDefinitions.length).toBeGreaterThan(0));
  it('site recipe validates', () => expect(createWeddingSiteRecipe('mini_site_3_pages').pages.map((p)=>p.id)).toEqual(['home','story-gallery','rsvp-location']));
  it('validator required fields', () => {
    expect(validateWeddingInput({ ...weddingSampleData.minimalWedding, data:{...weddingSampleData.minimalWedding.data, couple:{...weddingSampleData.minimalWedding.data.couple, brideName:''}} }).valid).toBe(false);
    expect(validateWeddingInput({ ...weddingSampleData.minimalWedding, data:{...weddingSampleData.minimalWedding.data, couple:{...weddingSampleData.minimalWedding.data.couple, groomName:''}} }).valid).toBe(false);
    expect(validateWeddingInput({ ...weddingSampleData.minimalWedding, data:{...weddingSampleData.minimalWedding.data, event:{...weddingSampleData.minimalWedding.data.event, date:''}} }).valid).toBe(false);
    expect(validateWeddingInput({ ...weddingSampleData.minimalWedding, data:{...weddingSampleData.minimalWedding.data, event:{...weddingSampleData.minimalWedding.data.event, venueName:''}} }).valid).toBe(false);
    expect(validateWeddingInput(weddingSampleData.minimalWedding).valid).toBe(true);
    expect(validateWeddingInput(weddingSampleData.rsvpContactOnlyWedding).valid).toBe(true);
    expect(validateWeddingInput({ ...weddingSampleData.richWedding, data:{...weddingSampleData.richWedding.data, gallery:[{id:'g1',src:''}] } }).valid).toBe(false);
  });
  it('minimal one-page generates 3-6 variants', () => { const r = generateBestVariants(toProductInput(weddingSampleData.minimalWedding)); expect(r.variants.length).toBeGreaterThanOrEqual(3); expect(r.variants.length).toBeLessThanOrEqual(6); });
  it('standard site has required pages', () => { const site=generateBestVariants(toProductInput(weddingSampleData.standardWeddingSite),{maxVariants:1}).variants[0].site; expect(site.siteMap.pages.map((p)=>p.id)).toEqual(['home','story','gallery','rsvp','location']); });
  it('compatibility rules cover no-image/gallery/rsvp/map constraints', () => {
    const noImageOut = applyWeddingCompatibility(weddingSampleData.noImageWedding,[{id:'a',tags:['image-heavy']},{id:'c',tags:['minimal']}]);
    expect(noImageOut.map((x)=>x.id)).toEqual(['c']);
    const noGalleryOut = applyWeddingCompatibility(weddingSampleData.minimalWedding,[{id:'g',blockId:'SmartGalleryBlock',tags:['grid']},{id:'m',tags:['minimal']}]);
    expect(noGalleryOut.map((x)=>x.id)).toEqual(['m']);
    const rsvpDisabledOut = applyWeddingCompatibility(weddingSampleData.minimalWedding,[{id:'r',blockId:'RSVPBlock',tags:['simple_form']},{id:'f',blockId:'FooterBlock',tags:['minimal']}]);
    expect(rsvpDisabledOut.map((x)=>x.id)).toEqual(['f']);
    const rsvpContactOnlyOut = applyWeddingCompatibility(weddingSampleData.rsvpContactOnlyWedding,[{id:'x',blockId:'RSVPBlock',tags:['button_to_external_form']},{id:'y',blockId:'RSVPBlock',tags:['contact_only']}]);
    expect(rsvpContactOnlyOut.map((x)=>x.id)).toEqual(['y']);
    const noMapOut = applyWeddingCompatibility(weddingSampleData.noMapWedding,[{id:'m1',tags:['map_embed']},{id:'m2',tags:['address_card']}]);
    expect(noMapOut.map((x)=>x.id)).toEqual(['m2']);
  });
  it('deterministic and style-sensitive', () => {
    const a = generateBestVariants(toProductInput(weddingSampleData.minimalWedding));
    const b = generateBestVariants(toProductInput(weddingSampleData.minimalWedding));
    const c = generateBestVariants({ ...toProductInput(weddingSampleData.minimalWedding), stylePresetId: 'luxury' });
    expect(a.variants.map((v)=>v.id)).toEqual(b.variants.map((v)=>v.id));
    expect(a.variants.map((v)=>v.id).join(',')).not.toBe(c.variants.map((v)=>v.id).join(','));
  });
  it('wedding variant catalog contains required families', () => {
    expect(weddingBlockVariants.some((v)=>v.tags?.includes('floral_frame'))).toBe(true);
    expect(weddingBlockVariants.some((v)=>v.tags?.includes('contact_only'))).toBe(true);
    expect(weddingBlockVariants.some((v)=>v.tags?.includes('address_card'))).toBe(true);
    expect(Object.values(weddingPageRecipes).every((p)=>p.blocks.length>0)).toBe(true);
  });
  it('all variants validate/no blocking issues', () => {
    const r = generateBestVariants(toProductInput(weddingSampleData.richWedding));
    expect(r.variants.every((v)=>validateProductSite(v.site).valid)).toBe(true);
    expect(r.variants.every((v)=>runQualityGate(v.site).blockingCount===0)).toBe(true);
  });
});
