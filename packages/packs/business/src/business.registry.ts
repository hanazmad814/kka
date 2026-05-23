import { createBusinessSiteRecipe } from './business.site-recipe';
import { businessPageRecipes } from './business.page-recipes';
import { businessBlockDefinitions } from './business.blocks';
import { businessBlockVariants } from './business.block-variants';
import { businessStylePresets } from './business.style-presets';
import { businessCompatibilityRules } from './business.compatibility-rules';
import type { BusinessPackRegistry, BusinessScope } from './business.types';
export const createBusinessPackRegistry = (scope: BusinessScope = 'one_page'): BusinessPackRegistry => ({
  siteRecipe: createBusinessSiteRecipe(scope), pageRecipes: businessPageRecipes, blockDefinitions: businessBlockDefinitions, blockVariants: [...businessBlockVariants], stylePresets: [...businessStylePresets], compatibilityRules: [...businessCompatibilityRules]
});
