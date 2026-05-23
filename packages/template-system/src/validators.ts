import { combineValidationResults, createValidationIssue, type ValidationResult, validResult } from '../../core/src/index';
import type { BlockVariant, LayoutVariant, SeedTemplate, StylePreset } from './types';
import { validateStyleTokenReferences } from './style-preset-resolver';

export const validateSeedTemplate = (template: SeedTemplate): ValidationResult => {
  const issues = [];
  if (!template.id) issues.push(createValidationIssue({ code: 'SEED_TEMPLATE_ID_REQUIRED', message: 'SeedTemplate id is required.', path: 'id', severity: 'error' }));
  if (!template.recipe?.recipeId) issues.push(createValidationIssue({ code: 'SEED_TEMPLATE_RECIPE_REQUIRED', message: 'SeedTemplate recipe.recipeId is required.', path: 'recipe.recipeId', severity: 'error' }));
  return issues.length ? { valid: false, issues } : validResult();
};

export const validateBlockVariant = (variant: BlockVariant): ValidationResult => {
  const issues = [];
  if (!variant.id) issues.push(createValidationIssue({ code: 'BLOCK_VARIANT_ID_REQUIRED', message: 'BlockVariant id is required.', path: 'id', severity: 'error' }));
  if (!variant.blockId) issues.push(createValidationIssue({ code: 'BLOCK_VARIANT_BLOCK_ID_REQUIRED', message: 'BlockVariant blockId is required.', path: 'blockId', severity: 'error' }));
  return issues.length ? { valid: false, issues } : validResult();
};

export const validateLayoutVariant = (variant: LayoutVariant): ValidationResult => {
  const issues = [];
  if (!variant.id) issues.push(createValidationIssue({ code: 'LAYOUT_VARIANT_ID_REQUIRED', message: 'LayoutVariant id is required.', path: 'id', severity: 'error' }));
  if (variant.blockOrder.length === 0) issues.push(createValidationIssue({ code: 'LAYOUT_VARIANT_BLOCK_ORDER_REQUIRED', message: 'LayoutVariant blockOrder is required.', path: 'blockOrder', severity: 'error' }));
  return issues.length ? { valid: false, issues } : validResult();
};

export const validateStylePreset = (preset: StylePreset): ValidationResult => {
  const issues = [];
  if (!preset.id) issues.push(createValidationIssue({ code: 'STYLE_PRESET_ID_REQUIRED', message: 'StylePreset id is required.', path: 'id', severity: 'error' }));
  if (!preset.tokens.colors.primary) issues.push(createValidationIssue({ code: 'STYLE_PRESET_COLORS_PRIMARY_REQUIRED', message: 'StylePreset primary color token is required.', path: 'tokens.colors.primary', severity: 'error' }));
  if (!preset.tokens.typography.bodyFont) issues.push(createValidationIssue({ code: 'STYLE_PRESET_FONT_REQUIRED', message: 'StylePreset typography bodyFont is required.', path: 'tokens.typography.bodyFont', severity: 'error' }));
  if (!preset.tokens.spacing.steps.length) issues.push(createValidationIssue({ code: 'STYLE_PRESET_SPACING_REQUIRED', message: 'StylePreset spacing steps are required.', path: 'tokens.spacing.steps', severity: 'error' }));
  return combineValidationResults(issues.length ? { valid: false, issues } : validResult(), validateStyleTokenReferences(preset));
};
