import type { SiteRecipe, PageRecipe, BlockDefinition, BlockPlan } from '../../../product-engine/src/recipes';

export type RestaurantProductType = 'restaurant_site' | 'restaurant_menu';
export type RestaurantScope = 'one_page' | 'mini_site_3_pages' | 'standard_site_5_pages';

export interface RestaurantInput {
  productType: RestaurantProductType;
  scope: RestaurantScope;
  stylePresetId: string;
  data: {
    name: string;
    menuItems: Array<{ name: string; price: string; category: string }>;
    images?: string[];
    address?: string;
    phone?: string;
  };
}

export interface RestaurantPackRegistry {
  siteRecipe: SiteRecipe;
  pageRecipes: Record<string, PageRecipe>;
  blockDefinitions: BlockDefinition[];
  blockVariants: Array<{ id: string; blockId: string; layout: 'dense' | 'sparse' | 'standard'; imageHeavy?: boolean }>;
  stylePresets: Array<{ id: string; mood: string }>;
  compatibilityRules: Array<{ id: string; description: string }>;
}

export type { SiteRecipe, PageRecipe, BlockDefinition, BlockPlan };
