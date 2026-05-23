import type { ProductType } from '../../core/src/index';
import type { BlockVariant, LayoutVariant, SeedTemplate, StylePreset } from './types';
import { validateBlockVariant, validateLayoutVariant, validateSeedTemplate, validateStylePreset } from './validators';

class ValidatedRegistry<T extends { id: string; productType: ProductType }> {
  private readonly items = new Map<string, T>();
  constructor(private readonly validator: (item: T) => { valid: boolean }) {}

  load(entries: T[]): void {
    for (const entry of entries) {
      if (this.items.has(entry.id)) throw new Error(`Duplicate id: ${entry.id}`);
      if (!this.validator(entry).valid) throw new Error(`Invalid entry: ${entry.id}`);
      this.items.set(entry.id, entry);
    }
  }

  getById(id: string): T | undefined { return this.items.get(id); }
  filterByProductType(productType: ProductType): T[] { return Array.from(this.items.values()).filter((item) => item.productType === productType); }
}

class SeedTemplateRegistry {
  private readonly items = new Map<string, SeedTemplate>();
  load(entries: SeedTemplate[]): void {
    for (const entry of entries) {
      if (this.items.has(entry.id)) throw new Error(`Duplicate id: ${entry.id}`);
      if (!validateSeedTemplate(entry).valid) throw new Error(`Invalid entry: ${entry.id}`);
      this.items.set(entry.id, entry);
    }
  }
  getById(id: string): SeedTemplate | undefined { return this.items.get(id); }
  filterByProductType(productType: ProductType): SeedTemplate[] { return Array.from(this.items.values()).filter((item) => item.productType === productType); }
}

export const seedTemplateRegistry = new SeedTemplateRegistry();
export const blockVariantRegistry = new ValidatedRegistry<BlockVariant>(validateBlockVariant);
export const layoutVariantRegistry = new ValidatedRegistry<LayoutVariant>(validateLayoutVariant);
export const stylePresetRegistry = new ValidatedRegistry<StylePreset>(validateStylePreset);
