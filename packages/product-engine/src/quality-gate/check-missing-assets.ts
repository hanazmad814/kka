import type { SceneNode } from '../../../core/src';
import type { QualityGateContext, QualityGateResult, QualityIssue } from './quality-gate.types';

export const checkMissingAssets = (ctx: QualityGateContext): QualityGateResult => {
  const issues: QualityIssue[] = [];
  for (const [pageId, doc] of Object.entries(ctx.site.pages)) {
    const assets = new Set(doc.assets.map((asset) => asset.url));
    for (const node of Object.values(doc.pages[0]?.nodesById ?? {})) {
      if (node.type === 'image') {
        const src = (node as SceneNode & { src?: string; required?: boolean }).src;
        const required = (node as SceneNode & { required?: boolean }).required ?? true;
        if (!src) {
          issues.push({ severity: required ? 'blocking' : 'warning', code: 'MISSING_IMAGE_SRC', message: 'Image node missing src.', pageId, nodeId: node.id });
        } else if (!assets.has(src)) {
          issues.push({ severity: 'blocking', code: 'MISSING_REQUIRED_ASSET', message: `Missing required asset: ${src}`, pageId, nodeId: node.id });
        }
      }
    }
  }
  const blockingCount = issues.filter((i) => i.severity === 'blocking').length;
  const warningCount = issues.filter((i) => i.severity === 'warning').length;
  return { ok: blockingCount === 0, issues, blockingCount, warningCount, infoCount: 0 };
};
