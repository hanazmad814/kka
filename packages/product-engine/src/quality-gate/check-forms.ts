import type { QualityGateContext, QualityGateResult } from './quality-gate.types';

export const checkForms = (ctx: QualityGateContext): QualityGateResult => {
  const issues = [] as QualityGateResult['issues'];
  for (const [pageId, doc] of Object.entries(ctx.site.pages)) {
    for (const node of Object.values(doc.pages[0]?.nodesById ?? {})) {
      if (node.type === 'form' && ctx.options.mode === 'publish') {
        const formNode = node as typeof node & { action?: string; handler?: string };
        if (!formNode.action && !formNode.handler) {
          issues.push({ severity: 'blocking', code: 'FORM_HANDLER_MISSING', message: 'Publish form missing action/handler.', pageId, nodeId: node.id });
        }
      }
      if (!['text','image','shape','button','group','frame','product-block','form','embed','collection','icon','video','audio'].includes(node.type)) {
        issues.push({ severity: 'warning', code: 'UNKNOWN_NODE_TYPE', message: `Unsupported node type: ${node.type}`, pageId, nodeId: node.id });
      }
    }
  }
  const blockingCount = issues.filter((i) => i.severity === 'blocking').length;
  const warningCount = issues.filter((i) => i.severity === 'warning').length;
  return { ok: blockingCount === 0, issues, blockingCount, warningCount, infoCount: 0 };
};
