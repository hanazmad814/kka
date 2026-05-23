import { describe, expect, it } from 'vitest';
import type { ProductInput } from '../src/assembly';
import type { DesignGenome } from '../src/genome';
import { CompatibilityRegistry, defaultCompatibilityRules, filterCompatibleGenomes } from '../src/compatibility';

const baseInput: ProductInput = { productType: 'business', scope: 'landing', stylePresetId: 'minimal', data: {} };
const baseGenome: DesignGenome = {
  id: 'g1', seed: 's1', productType: 'business', recipeId: 'recipe-1', stylePresetId: 'minimal', layoutVariantId: 'layout-1', blockVariantIds: ['block-1']
};

const baseMetadata = {
  layoutTagsById: { 'layout-1': ['mobile-supported'], 'layout-image': ['image-heavy'], 'layout-sparse': ['sparse-menu'], 'layout-short': ['short-copy-only'] },
  blockTagsById: { 'block-1': ['hero'], 'block-grid': ['product-grid'] },
  styleTagsById: { minimal: ['neutral'], luxury: ['neon'] },
  pageCountByRecipeId: { 'recipe-1': 1, 'recipe-2': 2 }
};

describe('compatibility foundation', () => {
  it('no-image input rejects image-heavy genome', () => {
    const input = { ...baseInput, data: { noImageInput: true } };
    const genome = { ...baseGenome, layoutVariantId: 'layout-image' };
    const filtered = filterCompatibleGenomes([genome], input, new CompatibilityRegistry(defaultCompatibilityRules), baseMetadata);
    expect(filtered).toHaveLength(0);
  });

  it('luxury style rejects neon palette', () => {
    const genome = { ...baseGenome, stylePresetId: 'luxury' };
    const filtered = filterCompatibleGenomes([genome], baseInput, new CompatibilityRegistry(defaultCompatibilityRules), baseMetadata);
    expect(filtered).toHaveLength(0);
  });

  it('menu 60 items rejects sparse layout', () => {
    const input: ProductInput = { productType: 'restaurant', scope: 'landing', stylePresetId: 'warm', data: { menuItemCount: 60 } };
    const genome: DesignGenome = { ...baseGenome, productType: 'restaurant', layoutVariantId: 'layout-sparse' };
    const filtered = filterCompatibleGenomes([genome], input, new CompatibilityRegistry(defaultCompatibilityRules), baseMetadata);
    expect(filtered).toHaveLength(0);
  });

  it('one-page rejects multi-page nav', () => {
    const genome = { ...baseGenome, recipeId: 'recipe-2' };
    const filtered = filterCompatibleGenomes([genome], baseInput, new CompatibilityRegistry(defaultCompatibilityRules), baseMetadata);
    expect(filtered).toHaveLength(0);
  });

  it('warning-only rule does not block', () => {
    const registry = new CompatibilityRegistry([{ id: 'warn-only', description: 'warn', evaluate: () => ({ ruleId: 'warn-only', pass: false, severity: 'warning', reason: 'warn' }) }]);
    const filtered = filterCompatibleGenomes([baseGenome], baseInput, registry, baseMetadata);
    expect(filtered).toHaveLength(1);
  });

  it('duplicate rule ids fail registry validation', () => {
    expect(() => new CompatibilityRegistry([
      { id: 'dup', description: 'a', evaluate: () => ({ ruleId: 'dup', pass: true, severity: 'error', reason: 'ok' }) },
      { id: 'dup', description: 'b', evaluate: () => ({ ruleId: 'dup', pass: true, severity: 'error', reason: 'ok' }) }
    ])).toThrow();
  });

  it('filterCompatibleGenomes returns only compatible candidates', () => {
    const good = { ...baseGenome, id: 'good' };
    const bad = { ...baseGenome, id: 'bad', layoutVariantId: 'layout-image' };
    const input = { ...baseInput, data: { noImageInput: true } };
    const filtered = filterCompatibleGenomes([good, bad], input, new CompatibilityRegistry(defaultCompatibilityRules), baseMetadata);
    expect(filtered.map((item) => item.id)).toEqual(['good']);
  });
});
