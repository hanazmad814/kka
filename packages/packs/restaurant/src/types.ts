import type { ProductType } from '../../../core/src/index';

export interface RestaurantPackDefinition {
  id: string;
  productType: ProductType;
  recipeIds: string[];
}
