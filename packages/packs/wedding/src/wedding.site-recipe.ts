import type { SiteRecipe } from '../../../product-engine/src/recipes';
import type { WeddingScope } from './wedding.types';
import { weddingPageRecipes } from './wedding.page-recipes';
export const createWeddingSiteRecipe = (scope: WeddingScope): SiteRecipe => {
  const pages = scope === 'one_page' ? [weddingPageRecipes.invitation] : scope === 'mini_site_3_pages' ? [weddingPageRecipes.home, weddingPageRecipes['story-gallery'], weddingPageRecipes['rsvp-location']] : [weddingPageRecipes.home, weddingPageRecipes.story, weddingPageRecipes.gallery, weddingPageRecipes.rsvp, weddingPageRecipes.location];
  return { id: `wedding-${scope}`, productType: 'wedding', requiredPages: pages.map((p)=>p.id), pages, inputFields:[{id:'brideName',label:'Bride Name',type:'text',required:true},{id:'groomName',label:'Groom Name',type:'text',required:true}], publishTargets:['production','staging'] };
};
