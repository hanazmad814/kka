import { describe, expect, it } from 'vitest';
import { createSceneDocumentFixture } from '../../core/src/scene-document';
import { createRendererContext, renderSceneDocument } from '../../core/src/renderer';
import {
  defaultStylePresets,
  resolveStylePreset,
  tokenResolver,
  validateStylePreset
} from '../src';

describe('style preset system', () => {
  it('each default style preset validates', () => {
    for (const preset of defaultStylePresets) {
      expect(validateStylePreset(preset).valid).toBe(true);
    }
  });

  it('resolving preset returns complete SiteDesignSystem', () => {
    const resolved = resolveStylePreset(defaultStylePresets[0]);
    expect(resolved.designSystem.colors.primary).toBeTypeOf('string');
    expect(resolved.designSystem.typography.fontFamily).toBeTypeOf('string');
    expect(resolved.designSystem.spacing.steps.length).toBeGreaterThan(0);
    expect(resolved.designSystem.radius.md).toBeGreaterThan(0);
    expect(resolved.designSystem.shadows.md).toBeTypeOf('string');
    expect(resolved.designSystem.motion.normalMs).toBeGreaterThan(0);
  });

  it('invalid token reference fails', () => {
    const preset = structuredClone(defaultStylePresets[0]);
    preset.tokens.button.bgColor = 'ghost' as never;
    expect(validateStylePreset(preset).valid).toBe(false);
  });

  it('token resolver resolves color/font/spacing', () => {
    const tokens = defaultStylePresets[0].tokens;
    expect(tokenResolver.color(tokens, 'primary')).toBeTypeOf('string');
    expect(tokenResolver.font(tokens, 'body')).toBeTypeOf('string');
    expect(tokenResolver.spacing(tokens, 1)).toBe('8px');
  });

  it('renderer can render fixture with resolved style preset', () => {
    const resolved = resolveStylePreset(defaultStylePresets[0]);
    const context = createRendererContext('preview', resolved.designSystem);
    const html = renderSceneDocument(createSceneDocumentFixture(), context);
    expect(html).toContain('Hello');
  });
});
