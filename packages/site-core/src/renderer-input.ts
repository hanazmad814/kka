import { createValidationIssue, type ValidationResult, validResult } from '../../core/src/index';
import type { ProductSite } from './types';

export interface PublicRenderInput {
  site: ProductSite;
  pageId: string;
}

export const validatePublicRenderInput = (input: PublicRenderInput): ValidationResult => {
  const issues = [];
  if (!input.site) issues.push(createValidationIssue({ code: 'PUBLIC_RENDER_SITE_REQUIRED', message: 'PublicRenderInput.site is required.', path: 'site', severity: 'error' }));
  if (!input.pageId) issues.push(createValidationIssue({ code: 'PUBLIC_RENDER_PAGE_ID_REQUIRED', message: 'PublicRenderInput.pageId is required.', path: 'pageId', severity: 'error' }));
  return issues.length === 0 ? validResult() : { valid: false, issues };
};
