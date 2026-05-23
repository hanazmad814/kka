import { describe, expect, it } from 'vitest';
import { createBlockDefinitionFixture, createSiteRecipeFixture, RecipeRegistry, validateBlockDefinition, validatePageRecipe, validateSiteRecipe } from '../src';

describe('product-engine recipe foundation', () => {
  it('valid SiteRecipe passes', () => {
    expect(validateSiteRecipe(createSiteRecipeFixture()).valid).toBe(true);
  });

  it('SiteRecipe with no requiredPages fails', () => {
    const recipe = createSiteRecipeFixture();
    recipe.requiredPages = [];
    expect(validateSiteRecipe(recipe).valid).toBe(false);
  });

  it('PageRecipe with no blocks fails', () => {
    const recipe = createSiteRecipeFixture();
    recipe.pages[0].blocks = [];
    expect(validatePageRecipe(recipe.pages[0]).valid).toBe(false);
  });

  it('BlockDefinition without defaultProps fails', () => {
    const block = createBlockDefinitionFixture();
    // @ts-expect-error runtime invalid test
    block.defaultProps = undefined;
    expect(validateBlockDefinition(block).valid).toBe(false);
  });

  it('BlockDefinition without validator fails', () => {
    const block = createBlockDefinitionFixture();
    // @ts-expect-error runtime invalid test
    block.validator = undefined;
    expect(validateBlockDefinition(block).valid).toBe(false);
  });

  it('Registry rejects duplicate ids', () => {
    const recipe = createSiteRecipeFixture();
    expect(() => new RecipeRegistry([recipe, { ...recipe }])).toThrow();
  });

  it('Registry lookup by id works', () => {
    const recipe = createSiteRecipeFixture();
    const registry = new RecipeRegistry([recipe]);
    expect(registry.getById(recipe.id)?.id).toBe(recipe.id);
  });

  it('Registry filter by productType works', () => {
    const business = createSiteRecipeFixture();
    const wedding = { ...createSiteRecipeFixture(), id: 'wedding-basic', productType: 'wedding' as const };
    const registry = new RecipeRegistry([business, wedding]);
    expect(registry.filterByProductType('business')).toHaveLength(1);
  });
});
