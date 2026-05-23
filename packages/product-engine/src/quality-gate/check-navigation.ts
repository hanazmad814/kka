import type { QualityGateContext, QualityGateResult } from './quality-gate.types';

export const checkNavigation = (ctx: QualityGateContext): QualityGateResult => {
  const pageIds = new Set(Object.keys(ctx.site.pages));
  const issues = ctx.site.navigation.items
    .filter((item) => !pageIds.has(item.pageId))
    .map((item) => ({ severity: 'blocking' as const, code: 'NAV_UNKNOWN_PAGE', message: `Navigation points to unknown page ${item.pageId}.`, targetId: item.id }));
  return { ok: issues.length === 0, issues, blockingCount: issues.length, warningCount: 0, infoCount: 0 };
};
