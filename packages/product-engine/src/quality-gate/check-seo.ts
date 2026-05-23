import type { QualityGateContext, QualityGateResult } from './quality-gate.types';

export const checkSEO = (ctx: QualityGateContext): QualityGateResult => {
  if (ctx.options.mode !== 'publish') return { ok: true, issues: [], blockingCount: 0, warningCount: 0, infoCount: 0 };
  const title = ctx.site.dataModel.fields.seoTitle;
  const description = ctx.site.dataModel.fields.seoDescription;
  const issues = [] as QualityGateResult['issues'];
  if (!title) issues.push({ severity: 'warning', code: 'SEO_TITLE_MISSING', message: 'SEO title missing.' });
  if (!description) issues.push({ severity: 'warning', code: 'SEO_DESCRIPTION_MISSING', message: 'SEO description missing.' });
  return { ok: true, issues, blockingCount: 0, warningCount: issues.length, infoCount: 0 };
};
