import type { QualityGateContext, QualityGateResult, QualityIssue } from './quality-gate.types';

export const checkMobileReadability = (ctx: QualityGateContext): QualityGateResult => {
  const issues: QualityIssue[] = [];
  const severity = ctx.options.strict ? 'blocking' as const : 'warning' as const;
  for (const [pageId, doc] of Object.entries(ctx.site.pages)) {
    for (const node of Object.values(doc.pages[0]?.nodesById ?? {})) {
      if (node.type === 'text' && node.height < 14) {
        issues.push({ severity, code: 'MOBILE_FONT_TOO_SMALL', message: 'Text node likely too small on mobile.', pageId, nodeId: node.id });
      }
      if (node.type === 'button' && (node.height < 36 || node.width < 88)) {
        issues.push({ severity, code: 'MOBILE_TAP_TARGET_TOO_SMALL', message: 'Button tap target too small for mobile.', pageId, nodeId: node.id });
      }
    }
  }
  const blockingCount = issues.filter((i) => i.severity === 'blocking').length;
  const warningCount = issues.filter((i) => i.severity === 'warning').length;
  return { ok: blockingCount === 0, issues, blockingCount, warningCount, infoCount: 0 };
};
