import type { SiteRecipe } from '../../../product-engine/src/recipes';
import type { BusinessScope } from './business.types';
import { businessPageRecipes } from './business.page-recipes';
export const createBusinessSiteRecipe = (scope: BusinessScope): SiteRecipe => {
  const pages = scope === 'one_page' ? [businessPageRecipes.landing] : scope === 'mini_site_3_pages' ? [businessPageRecipes.home, businessPageRecipes.services, businessPageRecipes.contact] : [businessPageRecipes.home, businessPageRecipes.services, businessPageRecipes.pricing, businessPageRecipes.about, businessPageRecipes.contact];
  return { id: `business-${scope}`, productType: 'business', requiredPages: pages.map((p) => p.id), pages, inputFields: [{ id: 'brandName', label: 'Brand Name', type: 'text', required: true }], publishTargets: ['production', 'staging'] };
};
