import type { ProductCategory, ProductType } from '../../core/src/index';
import type { SiteDesignSystem } from '../../site-core/src/types';

export interface TemplateRecipe {
  id: string;
  recipeId: string;
  productCategory: ProductCategory;
  requiredSections: string[];
  qualityBaselineScore: number;
}

export interface SeedTemplate {
  id: string;
  slug: string;
  productType: ProductType;
  recipe: TemplateRecipe;
  isProductionReady: boolean;
}

export interface BlockVariant {
  id: string;
  productType: ProductType;
  blockId: string;
  props: Record<string, unknown>;
}

export interface LayoutVariant {
  id: string;
  productType: ProductType;
  pageId: string;
  blockOrder: string[];
}

export interface StylePreset {
  id: string;
  productType: ProductType;
  tokens: unknown;
}

export interface ResolvedStylePreset {
  id: string;
  productType: ProductType;
  designSystem: SiteDesignSystem;
}

export interface TemplateRecord {
  id: string;
  slug: string;
  productCategory: ProductCategory;
  productType: ProductType;
  isActive: boolean;
  createdAtIso: string;
  updatedAtIso: string;
}

export interface TemplateRepository {
  listByCategory(category: ProductCategory): Promise<TemplateRecord[]>;
  getBySlug(slug: string): Promise<TemplateRecord | null>;
  save(record: TemplateRecord): Promise<TemplateRecord>;
}
