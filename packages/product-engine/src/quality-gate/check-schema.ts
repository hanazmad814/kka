import { validateProductSite } from '../../../site-core/src';
import type { QualityGateContext, QualityGateResult } from './quality-gate.types';
import { createQualityIssue } from './quality-gate';

export const checkSchema = (ctx: QualityGateContext): QualityGateResult => {
  const result = validateProductSite(ctx.site);
  const issues = result.valid ? [] : result.issues.map((issue) => createQualityIssue({ severity: 'blocking', code: `SCHEMA_${issue.code}`, message: issue.message, details: { path: issue.path } }));
  return { ok: issues.length === 0, issues, blockingCount: issues.length, warningCount: 0, infoCount: 0 };
};
