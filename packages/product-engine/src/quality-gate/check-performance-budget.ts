import type { QualityGateContext, QualityGateResult } from './quality-gate.types';

export const checkPerformanceBudget = (ctx: QualityGateContext): QualityGateResult => {
  const issues = [] as QualityGateResult['issues'];
  const budget = ctx.options.performanceBudget ?? {};
  if (budget.maxPages !== undefined && Object.keys(ctx.site.pages).length > budget.maxPages) {
    issues.push({ severity: 'warning', code: 'PERF_MAX_PAGES_EXCEEDED', message: 'Performance budget maxPages exceeded.' });
  }
  const totalAssets = Object.values(ctx.site.pages).reduce((sum, doc) => sum + doc.assets.length, 0);
  if (budget.maxAssets !== undefined && totalAssets > budget.maxAssets) {
    issues.push({ severity: 'warning', code: 'PERF_MAX_ASSETS_EXCEEDED', message: 'Performance budget maxAssets exceeded.' });
  }
  if (budget.maxNodesPerPage !== undefined) {
    for (const [pageId, doc] of Object.entries(ctx.site.pages)) {
      const nodeCount = Object.keys(doc.pages[0]?.nodesById ?? {}).length;
      if (nodeCount > budget.maxNodesPerPage) {
        issues.push({ severity: 'warning', code: 'PERF_MAX_NODES_EXCEEDED', message: 'Performance budget maxNodesPerPage exceeded.', pageId });
      }
    }
  }
  return { ok: true, issues, blockingCount: 0, warningCount: issues.length, infoCount: 0 };
};
