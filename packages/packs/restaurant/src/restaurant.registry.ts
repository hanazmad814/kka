import { createRestaurantSiteRecipe } from './restaurant.site-recipe';
import { restaurantPageRecipes } from './restaurant.page-recipes';
import { restaurantBlockDefinitions } from './restaurant.blocks';
import { restaurantBlockVariants } from './restaurant.block-variants';
import { restaurantStylePresets } from './restaurant.style-presets';
import type { RestaurantPackRegistry } from './restaurant.types';

export const createRestaurantPackRegistry = (scope: 'one_page' | 'mini_site_3_pages' | 'standard_site_5_pages' = 'one_page'): RestaurantPackRegistry => ({
  siteRecipe: createRestaurantSiteRecipe(scope),
  pageRecipes: restaurantPageRecipes,
  blockDefinitions: restaurantBlockDefinitions,
  blockVariants: [...restaurantBlockVariants],
  stylePresets: [...restaurantStylePresets],
  compatibilityRules: [
    { id: 'no-images-reject-image-heavy', description: 'no images => reject image-heavy' },
    { id: 'menu-gt-50-reject-sparse', description: 'menu > 50 => reject sparse menu' },
    { id: 'one-page-reject-multipage', description: 'one page rejects multipage nav' },
    { id: 'address-require-map', description: 'address => map/contact' },
    { id: 'phone-require-cta', description: 'phone => call/reservation cta' }
  ]
});
