import type { QualityGateContext, QualityGateResult } from './quality-gate.types';

export const checkRoutes = (ctx: QualityGateContext): QualityGateResult => {
  const seen = new Set<string>();
  const issues = [] as QualityGateResult['issues'];
  for (const ref of ctx.site.siteMap.pages) {
    if (seen.has(ref.path)) {
      issues.push({ severity: 'blocking', code: 'DUPLICATE_ROUTE', message: `Duplicate route path: ${ref.path}`, targetId: ref.id });
    }
    seen.add(ref.path);
    if (!ctx.site.pages[ref.id]) {
      issues.push({ severity: 'blocking', code: 'ROUTE_UNKNOWN_PAGE', message: `Route points to missing page: ${ref.id}`, targetId: ref.id });
    }
  }
  return { ok: issues.length === 0, issues, blockingCount: issues.length, warningCount: 0, infoCount: 0 };
};
