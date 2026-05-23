import { describe, expect, it } from 'vitest';
import { validateProductSite } from '../../../site-core/src';
import { runQualityGate } from '../../../product-engine/src/quality-gate';
import { generateBestVariants } from '../../../product-engine/src/generate';
import {
  applyRestaurantCompatibility,
  createRestaurantPackRegistry,
  createRestaurantSiteRecipe,
  restaurantSampleData,
  validateRestaurantInput
} from '../src';

const toProductInput = (r: (typeof restaurantSampleData)[keyof typeof restaurantSampleData]) => ({
  productType: 'restaurant' as const,
  scope: r.scope === 'one_page' ? 'landing' as const : 'full-site' as const,
  stylePresetId: r.stylePresetId,
  data: { ...r.data, restaurantScope: r.scope }
});

describe('restaurant pack', () => {
  it('restaurant pack registry loads', () => {
    const reg = createRestaurantPackRegistry('one_page');
    expect(reg.blockDefinitions.length).toBeGreaterThan(0);
  });

  it('restaurant site recipe validates', () => {
    const recipe = createRestaurantSiteRecipe('mini_site_3_pages');
    expect(recipe.pages.map((p) => p.id)).toEqual(['home', 'menu', 'contact']);
  });

  it('one-page restaurant input creates valid ProductSite', () => {
    const result = generateBestVariants(toProductInput(restaurantSampleData.minimal));
    expect(result.variants.length).toBeGreaterThanOrEqual(3);
    expect(validateProductSite(result.variants[0].site).valid).toBe(true);
  });

  it('standard 5-page restaurant input creates home/menu/gallery/reservation/contact', () => {
    const site = generateBestVariants(toProductInput(restaurantSampleData.rich), { maxVariants: 1 }).variants[0].site;
    const pageIds = new Set(site.siteMap.pages.map((p) => p.id));
    ['home', 'menu', 'gallery', 'reservation', 'contact'].forEach((id) => expect(pageIds.has(id)).toBe(true));
  });

  it('menu with 60 items uses dense/category-friendly layout', () => {
    const candidates = [{ id: 'a', tags: ['dense-menu'] }, { id: 'b', tags: ['sparse-menu'] }];
    const out = applyRestaurantCompatibility(restaurantSampleData.menu60, candidates);
    expect(out.some((c) => c.tags.includes('sparse-menu'))).toBe(false);
  });

  it('no-image input does not use image-heavy layout', () => {
    const candidates = [{ id: 'a', tags: ['image-heavy'] }, { id: 'b', tags: ['standard'] }];
    const out = applyRestaurantCompatibility(restaurantSampleData.noImages, candidates);
    expect(out.map((c) => c.id)).toEqual(['b']);
  });

  it('address input includes contact/map page or block', () => {
    const site = generateBestVariants(toProductInput(restaurantSampleData.rich), { maxVariants: 1 }).variants[0].site;
    expect(site.siteMap.pages.some((p) => p.id === 'contact' || p.id === 'reservation')).toBe(true);
  });

  it('generateBestVariants returns 3–6 variants', () => {
    const result = generateBestVariants(toProductInput(restaurantSampleData.minimal));
    expect(result.variants.length).toBeGreaterThanOrEqual(3);
    expect(result.variants.length).toBeLessThanOrEqual(6);
  });

  it('all variants validateProductSite OK', () => {
    const result = generateBestVariants(toProductInput(restaurantSampleData.minimal));
    expect(result.variants.every((v) => validateProductSite(v.site).valid)).toBe(true);
  });

  it('all variants pass Quality Gate without blocking issues', () => {
    const result = generateBestVariants(toProductInput(restaurantSampleData.minimal));
    expect(result.variants.every((v) => runQualityGate(v.site).blockingCount === 0)).toBe(true);
  });

  it('same input returns same variant ids/genomes', () => {
    const a = generateBestVariants(toProductInput(restaurantSampleData.minimal));
    const b = generateBestVariants(toProductInput(restaurantSampleData.minimal));
    expect(a.variants.map((v) => v.id)).toEqual(b.variants.map((v) => v.id));
    expect(a.variants.map((v) => v.genome.id)).toEqual(b.variants.map((v) => v.genome.id));
  });

  it('different style returns different variant ids/genomes', () => {
    const base = toProductInput(restaurantSampleData.minimal);
    const a = generateBestVariants(base);
    const b = generateBestVariants({ ...base, stylePresetId: 'warm' });
    expect(a.variants.map((v) => v.id).join(',')).not.toBe(b.variants.map((v) => v.id).join(','));
  });

  it('restaurant input validator works', () => {
    expect(validateRestaurantInput(restaurantSampleData.minimal).valid).toBe(true);
  });
});
