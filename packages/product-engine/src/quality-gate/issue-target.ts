import type { QualityIssue } from './quality-gate.types';
import type { QualityIssuePresentation } from './issue-resolution.types';

export function inferIssueTarget(issue: QualityIssue): QualityIssuePresentation['goToFix'] {
  const code = issue.code.toLowerCase();
  if (code.includes('seo')) return { panel: 'seo', pageId: issue.pageId, nodeId: issue.nodeId };
  if (code.includes('nav') || code.includes('route')) return { panel: 'pages', pageId: issue.pageId };
  if (code.includes('menu')) return { panel: 'menu', pageId: issue.pageId, nodeId: issue.nodeId };
  if (code.includes('phone') || code.includes('address') || code.includes('hours') || code.includes('contact')) return { panel: 'contact' };
  if (code.includes('style') || code.includes('contrast')) return { panel: 'style', nodeId: issue.nodeId };
  return { panel: 'unknown', pageId: issue.pageId, nodeId: issue.nodeId };
}
