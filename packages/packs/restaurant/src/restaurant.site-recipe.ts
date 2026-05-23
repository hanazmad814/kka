import type { SiteRecipe } from '../../../product-engine/src/recipes';
import { restaurantPageRecipes } from './restaurant.page-recipes';

export const createRestaurantSiteRecipe = (scope: 'one_page' | 'mini_site_3_pages' | 'standard_site_5_pages'): SiteRecipe => {
  const pages = scope === 'one_page'
    ? [restaurantPageRecipes['home-menu']]
    : scope === 'mini_site_3_pages'
      ? [restaurantPageRecipes.home, restaurantPageRecipes.menu, restaurantPageRecipes.contact]
      : [restaurantPageRecipes.home, restaurantPageRecipes.menu, restaurantPageRecipes.gallery, restaurantPageRecipes.reservation, restaurantPageRecipes.contact];

  return {
    id: `restaurant-${scope}`,
    productType: 'restaurant',
    requiredPages: pages.map((p) => p.id),
    pages,
    inputFields: [{ id: 'name', label: 'Name', type: 'text', required: true }],
    publishTargets: ['production']
  };
};
