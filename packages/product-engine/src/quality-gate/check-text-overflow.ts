import type { QualityGateContext, QualityGateResult, QualityIssue } from './quality-gate.types';

export const checkTextOverflow = (ctx: QualityGateContext): QualityGateResult => {
  const issues: QualityIssue[] = [];
  for (const [pageId, doc] of Object.entries(ctx.site.pages)) {
    for (const node of Object.values(doc.pages[0]?.nodesById ?? {})) {
      if (node.type === 'text') {
        const text = (node as { text: string }).text;
        const capacity = Math.max(1, Math.floor((node.width * node.height) / 120));
        if (text.length > capacity) {
          issues.push({ severity: 'warning', code: 'TEXT_OVERFLOW', message: 'Text appears too long for node bounds.', pageId, nodeId: node.id });
        }
      }
    }
  }
  return { ok: true, issues, blockingCount: 0, warningCount: issues.length, infoCount: 0 };
};
