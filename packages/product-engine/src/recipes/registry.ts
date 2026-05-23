import type { ProductType } from '../../../core/src/index';
import type { SiteRecipe } from './types';
import { validateSiteRecipe } from './validators';

export class RecipeRegistry {
  private readonly items = new Map<string, SiteRecipe>();

  constructor(entries: SiteRecipe[] = []) {
    this.load(entries);
  }

  load(entries: SiteRecipe[]): void {
    for (const recipe of entries) {
      if (this.items.has(recipe.id)) throw new Error(`Duplicate recipe id: ${recipe.id}`);
      const result = validateSiteRecipe(recipe);
      if (!result.valid) throw new Error(`Invalid recipe ${recipe.id}`);
      this.items.set(recipe.id, recipe);
    }
  }

  getById(id: string): SiteRecipe | undefined {
    return this.items.get(id);
  }

  filterByProductType(productType: ProductType): SiteRecipe[] {
    return Array.from(this.items.values()).filter((recipe) => recipe.productType === productType);
  }
}
