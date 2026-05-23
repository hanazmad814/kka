import { describe, expect, it } from 'vitest';
import { createStylePresetFixture, stylePresetRegistry, validateStylePreset } from '../src';

describe('template-system foundation', () => {
  it('valid StylePreset passes', () => {
    expect(validateStylePreset(createStylePresetFixture()).valid).toBe(true);
  });

  it('StylePreset missing required design tokens fails', () => {
    const preset = createStylePresetFixture();
    preset.tokens.colors.primary = '';
    expect(validateStylePreset(preset).valid).toBe(false);
  });

  it('registry rejects duplicate ids', () => {
    const preset = createStylePresetFixture();
    expect(() => stylePresetRegistry.load([preset, { ...preset }])).toThrow();
  });
});
