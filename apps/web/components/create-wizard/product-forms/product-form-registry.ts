import type { CreateWizardProductType, ProductScope } from '../create-wizard.types';
import type { ProductFormDefinition } from './product-form.types';
import { restaurantFormDefinition } from './restaurant';
import { businessFormDefinition } from './business';
import { weddingFormDefinition } from './wedding';

const defs = [restaurantFormDefinition, businessFormDefinition, weddingFormDefinition] as Array<ProductFormDefinition<any>>;
export const getProductFormDefinition = (productType: CreateWizardProductType): ProductFormDefinition | null => defs.find((d) => d.productTypes.includes(productType)) ?? null;
export const getSupportedProductTypes = (): CreateWizardProductType[] => ['restaurant_site','restaurant_menu','business_landing','business_website','wedding_invitation'];
export const getScopeOptionsForProductType = (productType: CreateWizardProductType): Array<{ id: ProductScope; label: string; description: string; enabled: boolean; pageSummary: string }> => {
  if (productType === 'restaurant_site') return [{id:'one_page',label:'One page',description:'Single-page site',enabled:true,pageSummary:'home/menu/contact'},{id:'mini_site_3_pages',label:'Mini site',description:'3 pages',enabled:true,pageSummary:'home/menu/contact'},{id:'standard_site_5_pages',label:'Standard',description:'5 pages',enabled:true,pageSummary:'home/menu/gallery/reservation/contact'}];
  if (productType === 'restaurant_menu') return [{id:'one_page',label:'One page',description:'Single-page menu',enabled:true,pageSummary:'menu'},{id:'qr_menu',label:'QR Menu',description:'QR optimized',enabled:true,pageSummary:'menu'},{id:'pdf_menu',label:'PDF Menu',description:'Coming soon',enabled:false,pageSummary:'menu'}];
  if (productType === 'business_landing') return [{id:'one_page',label:'Landing',description:'One page',enabled:true,pageSummary:'landing'}];
  if (productType === 'business_website') return [{id:'mini_site_3_pages',label:'Mini site',description:'3 pages',enabled:true,pageSummary:'home/services/contact'},{id:'standard_site_5_pages',label:'Standard',description:'5 pages',enabled:true,pageSummary:'home/services/pricing/about/contact'}];
  return [{id:'one_page',label:'One page',description:'Single invitation',enabled:true,pageSummary:'invitation'},{id:'mini_site_3_pages',label:'Mini site',description:'3 pages',enabled:true,pageSummary:'home/story-gallery/rsvp-location'},{id:'standard_site_5_pages',label:'Standard',description:'5 pages',enabled:true,pageSummary:'home/story/gallery/rsvp/location'}];
};
export const validateProductForm = (productType: CreateWizardProductType, state: unknown) => getProductFormDefinition(productType)?.validate(state as never) ?? { ok: false, errors: [{ path: 'productType', message: 'Unsupported product type' }] };
export const productFormToProductInput = (productType: CreateWizardProductType, scope: ProductScope, stylePresetId: string, state: unknown) => getProductFormDefinition(productType)?.toProductInput({ productType, scope, stylePresetId, formState: state as never });
