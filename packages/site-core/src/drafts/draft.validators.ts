import type { ProductDraft } from './draft.types';

export const validateProductDraft = (draft: ProductDraft): { valid: boolean; issues: string[] } => {
  const issues: string[] = [];
  if (!draft.id) issues.push('id required');
  if (!draft.site) issues.push('site required');
  if (!['draft', 'archived'].includes(draft.status)) issues.push('invalid status');
  if (draft.source.type === 'generated_variant' && !draft.source.variantId) issues.push('variantId required for generated_variant');
  return { valid: issues.length === 0, issues };
};
