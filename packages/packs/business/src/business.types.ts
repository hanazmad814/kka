import type { SiteRecipe, PageRecipe, BlockDefinition } from '../../../product-engine/src/recipes';

export type BusinessProductType = 'business_landing' | 'business_website';
export type BusinessScope = 'one_page' | 'mini_site_3_pages' | 'standard_site_5_pages';

export interface BusinessServiceInput { id: string; name: string; description?: string; priceHint?: string; icon?: string; }
export interface BusinessPricingPlanInput { id: string; name: string; price: string; description?: string; features: string[]; highlighted?: boolean; }
export interface BusinessTestimonialInput { id: string; quote: string; authorName?: string; authorTitle?: string; }
export interface BusinessFAQInput { id: string; question: string; answer: string; }

export interface BusinessInputData {
  brandName: string;
  tagline?: string;
  description?: string;
  industry?: string;
  offer?: { headline?: string; description?: string; primaryCta?: string; secondaryCta?: string; };
  services: BusinessServiceInput[];
  pricingPlans?: BusinessPricingPlanInput[];
  testimonials?: BusinessTestimonialInput[];
  faqs?: BusinessFAQInput[];
  contact?: { email?: string; phone?: string; address?: string; bookingUrl?: string; };
  socialLinks?: Array<{ label: string; url: string }>;
  assets?: { logoUrl?: string; heroImageUrl?: string; galleryImageUrls?: string[]; };
}

export interface BusinessInput {
  productType: BusinessProductType;
  scope: BusinessScope;
  stylePresetId: string;
  data: BusinessInputData;
}

export interface BusinessPackRegistry {
  siteRecipe: SiteRecipe;
  pageRecipes: Record<string, PageRecipe>;
  blockDefinitions: BlockDefinition[];
  blockVariants: Array<{ id: string; blockId: string; layout: 'dense' | 'sparse' | 'standard' | 'compact'; imageHeavy?: boolean; tags?: readonly string[] }>;
  stylePresets: Array<{ id: string; mood: string }>;
  compatibilityRules: Array<{ id: string; description: string }>;
}
