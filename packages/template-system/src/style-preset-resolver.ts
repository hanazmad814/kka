import { createValidationIssue, type ValidationResult, validResult } from '../../core/src/index';
import type { ResolvedStylePreset, StylePreset, StylePresetTokens } from './types';

const tokenResolver = {
  color: (tokens: StylePresetTokens, token: keyof StylePresetTokens['colors']): string => tokens.colors[token],
  font: (tokens: StylePresetTokens, kind: 'heading' | 'body'): string => kind === 'heading' ? tokens.typography.headingFont : tokens.typography.bodyFont,
  spacing: (tokens: StylePresetTokens, step: number): string => {
    const mult = tokens.spacing.steps[step] ?? tokens.spacing.steps[0] ?? 0;
    return `${tokens.spacing.unit * mult}px`;
  }
};

export const resolveStylePreset = (preset: StylePreset): ResolvedStylePreset => ({
  id: preset.id,
  productType: preset.productType,
  designSystem: {
    colors: {
      primary: tokenResolver.color(preset.tokens, 'primary'),
      secondary: tokenResolver.color(preset.tokens, 'secondary'),
      background: tokenResolver.color(preset.tokens, 'background'),
      text: tokenResolver.color(preset.tokens, 'text')
    },
    typography: {
      fontFamily: tokenResolver.font(preset.tokens, 'body'),
      baseSize: preset.tokens.typography.baseSize,
      scale: preset.tokens.typography.scale
    },
    spacing: { unit: preset.tokens.spacing.unit, steps: preset.tokens.spacing.steps },
    radius: { sm: preset.tokens.radius.sm, md: preset.tokens.radius.md, lg: preset.tokens.radius.lg },
    shadows: { sm: preset.tokens.shadows.sm, md: preset.tokens.shadows.md, lg: preset.tokens.shadows.lg },
    motion: { fastMs: preset.tokens.motion.fastMs, normalMs: preset.tokens.motion.normalMs, slowMs: preset.tokens.motion.slowMs },
    breakpoints: { mobile: 375, tablet: 768, desktop: 1280 }
  }
});

export const validateStyleTokenReferences = (preset: StylePreset): ValidationResult => {
  const issues = [];
  const { colors, radius, shadows, button, card, image } = preset.tokens;
  const has = <T extends object>(obj: T, key: keyof T): boolean => Object.prototype.hasOwnProperty.call(obj, key);
  if (!has(colors, button.bgColor)) issues.push(createValidationIssue({ code: 'TOKEN_REF_INVALID', message: 'button.bgColor invalid reference.', path: 'tokens.button.bgColor', severity: 'error' }));
  if (!has(colors, button.textColor)) issues.push(createValidationIssue({ code: 'TOKEN_REF_INVALID', message: 'button.textColor invalid reference.', path: 'tokens.button.textColor', severity: 'error' }));
  if (!has(radius, button.radius)) issues.push(createValidationIssue({ code: 'TOKEN_REF_INVALID', message: 'button.radius invalid reference.', path: 'tokens.button.radius', severity: 'error' }));
  if (!has(shadows, button.shadow)) issues.push(createValidationIssue({ code: 'TOKEN_REF_INVALID', message: 'button.shadow invalid reference.', path: 'tokens.button.shadow', severity: 'error' }));
  if (!has(colors, card.bgColor)) issues.push(createValidationIssue({ code: 'TOKEN_REF_INVALID', message: 'card.bgColor invalid reference.', path: 'tokens.card.bgColor', severity: 'error' }));
  if (!has(radius, card.radius)) issues.push(createValidationIssue({ code: 'TOKEN_REF_INVALID', message: 'card.radius invalid reference.', path: 'tokens.card.radius', severity: 'error' }));
  if (!has(shadows, card.shadow)) issues.push(createValidationIssue({ code: 'TOKEN_REF_INVALID', message: 'card.shadow invalid reference.', path: 'tokens.card.shadow', severity: 'error' }));
  if (!has(radius, image.radius)) issues.push(createValidationIssue({ code: 'TOKEN_REF_INVALID', message: 'image.radius invalid reference.', path: 'tokens.image.radius', severity: 'error' }));
  if (!has(shadows, image.shadow)) issues.push(createValidationIssue({ code: 'TOKEN_REF_INVALID', message: 'image.shadow invalid reference.', path: 'tokens.image.shadow', severity: 'error' }));
  if (!has(colors, image.overlayColor)) issues.push(createValidationIssue({ code: 'TOKEN_REF_INVALID', message: 'image.overlayColor invalid reference.', path: 'tokens.image.overlayColor', severity: 'error' }));
  return issues.length ? { valid: false, issues } : validResult();
};

export { tokenResolver };
