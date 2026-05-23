import type { ProductDraft } from '../../../site-core/src/drafts';
import type { ProductSite } from '../../../site-core/src/types';
import type { QualityIssue } from './quality-gate.types';
import type { QualityIssuePresentation } from './issue-resolution.types';
import { inferIssueTarget } from './issue-target';

const fixableCodes = new Set(['missing_seo_title', 'missing_seo_description', 'missing_cta_label', 'duplicate_route']);

export function mapQualityIssueToPresentation(issue: QualityIssue, _site: ProductSite, _draft?: ProductDraft): QualityIssuePresentation {
  const code = issue.code.toLowerCase();
  const pretty: Record<string, { title: string; message: string }> = {
    missing_seo_title: { title: 'Missing page title', message: 'This page needs a title before publishing. We can use your brand name as a safe default.' },
    missing_seo_description: { title: 'Missing page description', message: 'This page needs a description. We can use your current brand description as a fallback.' },
    text_overflow: { title: 'Text may overflow', message: 'Some text may be too long for its section, especially on mobile.' },
    missing_required_asset: { title: 'Missing required asset', message: 'A required image or media file is missing.' }
  };
  const matched = pretty[code] ?? { title: issue.code.replace(/_/g, ' '), message: issue.message };
  const autoFixable = issue.autoFixable === true || fixableCodes.has(code);
  return {
    id: `${issue.code}:${issue.pageId ?? ''}:${issue.nodeId ?? ''}`,
    severity: issue.severity,
    code: issue.code,
    title: matched.title,
    message: matched.message,
    pageId: issue.pageId,
    nodeId: issue.nodeId,
    autoFixable,
    fixLabel: autoFixable ? 'Auto Fix' : undefined,
    goToFix: inferIssueTarget(issue)
  };
}
