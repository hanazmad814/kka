export type CreateWizardStep = 'product-type' | 'scope' | 'data' | 'style' | 'generate';
export type CreateWizardProductType = 'restaurant_site' | 'restaurant_menu' | 'business_landing' | 'business_website' | 'wedding_invitation';
export type ProductScope = 'one_page' | 'mini_site_3_pages' | 'standard_site_5_pages' | 'qr_menu' | 'pdf_menu';

export interface CreateWizardFormState {
  productType: CreateWizardProductType;
  scope: ProductScope;
  stylePresetId: string;
  formState: unknown;
}

export interface RestaurantMenuItemInput {
  id: string;
  name: string;
  description?: string;
  price?: string;
  category?: string;
  imageUrl?: string;
}
