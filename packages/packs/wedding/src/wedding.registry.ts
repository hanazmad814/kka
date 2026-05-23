import { createWeddingSiteRecipe } from './wedding.site-recipe';
import { weddingPageRecipes } from './wedding.page-recipes';
import { weddingBlockDefinitions } from './wedding.blocks';
import { weddingBlockVariants } from './wedding.block-variants';
import { weddingStylePresets } from './wedding.style-presets';
import { weddingCompatibilityRules } from './wedding.compatibility-rules';
import type { WeddingPackRegistry, WeddingScope } from './wedding.types';
export const createWeddingPackRegistry = (scope: WeddingScope = 'one_page'): WeddingPackRegistry => ({ siteRecipe:createWeddingSiteRecipe(scope), pageRecipes:weddingPageRecipes, blockDefinitions:weddingBlockDefinitions, blockVariants:[...weddingBlockVariants], stylePresets:[...weddingStylePresets], compatibilityRules:[...weddingCompatibilityRules] });
