import type { QualityGateContext, QualityGateResult } from './quality-gate.types';

export const checkEditorLeak = (ctx: QualityGateContext): QualityGateResult => {
  if (ctx.options.mode !== 'publish') return { ok: true, issues: [], blockingCount: 0, warningCount: 0, infoCount: 0 };
  const issues = [] as QualityGateResult['issues'];
  for (const [pageId, doc] of Object.entries(ctx.site.pages)) {
    for (const node of Object.values(doc.pages[0]?.nodesById ?? {})) {
      const payload = JSON.stringify(node);
      if (payload.includes('data-editor-control') || payload.includes('editorOnly')) {
        issues.push({ severity: 'blocking', code: 'EDITOR_LEAK', message: 'Editor control marker leaked into publish mode.', pageId, nodeId: node.id });
      }
    }
  }
  return { ok: issues.length === 0, issues, blockingCount: issues.length, warningCount: 0, infoCount: 0 };
};
