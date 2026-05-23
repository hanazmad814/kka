import { describe, expect, it } from 'vitest';
import { validateSceneDocument } from '../../core/src';
import { validateProductSite } from '../../site-core/src';
import { createSiteRecipeFixture, RecipeRegistry } from '../src/recipes';
import { assemblePreview, assembleSite, type ProductInput } from '../src/assembly';

const createInput = (): ProductInput => ({
  productType: 'business',
  scope: 'landing',
  stylePresetId: 'minimal',
  data: { businessName: 'Acme Co' }
});

describe('assembly foundation', () => {
  it('assemble simple business landing input returns valid ProductSite', () => {
    const site = assembleSite(createInput(), new RecipeRegistry([createSiteRecipeFixture()]));
    expect(validateProductSite(site).valid).toBe(true);
  });

  it('siteMap page ids exist in pages record', () => {
    const site = assembleSite(createInput(), new RecipeRegistry([createSiteRecipeFixture()]));
    for (const page of site.siteMap.pages) expect(site.pages[page.id]).toBeDefined();
  });

  it('navigation points to valid pages', () => {
    const site = assembleSite(createInput(), new RecipeRegistry([createSiteRecipeFixture()]));
    const pageIds = new Set(Object.keys(site.pages));
    for (const item of site.navigation.items) expect(pageIds.has(item.pageId)).toBe(true);
  });

  it('designSystem is complete', () => {
    const site = assembleSite(createInput(), new RecipeRegistry([createSiteRecipeFixture()]));
    expect(site.designSystem.colors.primary).toBeTypeOf('string');
    expect(site.designSystem.typography.fontFamily).toBeTypeOf('string');
    expect(site.designSystem.spacing.steps.length).toBeGreaterThan(0);
  });

  it('assembled SceneDocuments validate', () => {
    const site = assembleSite(createInput(), new RecipeRegistry([createSiteRecipeFixture()]));
    for (const doc of Object.values(site.pages)) expect(validateSceneDocument(doc).valid).toBe(true);
  });

  it('preview assembly does not crash', () => {
    const html = assemblePreview(createInput(), new RecipeRegistry([createSiteRecipeFixture()]));
    expect(html).toContain('data-preview-wrapper="true"');
  });
});
