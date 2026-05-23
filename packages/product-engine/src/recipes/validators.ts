import { createValidationIssue, type ValidationResult, validResult } from '../../../core/src/index';
import type { BlockDefinition, PageRecipe, SiteRecipe } from './types';

export const validateBlockDefinition = (block: BlockDefinition): ValidationResult => {
  const issues = [];
  if (!block.id) issues.push(createValidationIssue({ code: 'BLOCK_ID_REQUIRED', message: 'BlockDefinition id is required.', path: 'id', severity: 'error' }));
  if (!block.defaultProps || typeof block.defaultProps !== 'object') issues.push(createValidationIssue({ code: 'BLOCK_DEFAULT_PROPS_REQUIRED', message: 'BlockDefinition defaultProps is required.', path: 'defaultProps', severity: 'error' }));
  if (typeof block.validator !== 'function') issues.push(createValidationIssue({ code: 'BLOCK_VALIDATOR_REQUIRED', message: 'BlockDefinition validator must be function.', path: 'validator', severity: 'error' }));
  return issues.length ? { valid: false, issues } : validResult();
};

export const validatePageRecipe = (page: PageRecipe): ValidationResult => {
  const issues = [];
  if (!page.id) issues.push(createValidationIssue({ code: 'PAGE_ID_REQUIRED', message: 'PageRecipe id is required.', path: 'id', severity: 'error' }));
  if (page.blocks.length === 0) issues.push(createValidationIssue({ code: 'PAGE_BLOCKS_REQUIRED', message: 'PageRecipe must contain at least one block.', path: 'blocks', severity: 'error' }));
  return issues.length ? { valid: false, issues } : validResult();
};

export const validateSiteRecipe = (recipe: SiteRecipe): ValidationResult => {
  const issues = [];
  if (!recipe.id) issues.push(createValidationIssue({ code: 'RECIPE_ID_REQUIRED', message: 'SiteRecipe id is required.', path: 'id', severity: 'error' }));
  if (recipe.requiredPages.length === 0) issues.push(createValidationIssue({ code: 'RECIPE_REQUIRED_PAGES_REQUIRED', message: 'SiteRecipe requiredPages must not be empty.', path: 'requiredPages', severity: 'error' }));
  for (const page of recipe.pages) {
    const pageResult = validatePageRecipe(page);
    issues.push(...pageResult.issues.map((issue) => ({ ...issue, path: `pages.${page.id}.${issue.path}` })));
  }
  return issues.length ? { valid: false, issues } : validResult();
};
