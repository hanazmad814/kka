import type { ProductSite } from '../../../site-core/src/types';
import type { AutoFixIssuesRequest } from './auto-fix.types';
import { runQualityGate } from './quality-gate';
import { autoFixIssue } from './auto-fix-issue';
import { mapQualityIssueToPresentation } from './issue-presenter';

const SAFE_CODES = new Set(['missing_seo_title', 'missing_seo_description', 'missing_cta_label', 'duplicate_route']);

export function autoFixQualityIssuesSite(site: ProductSite, request: AutoFixIssuesRequest) {
  const before = runQualityGate(site, { mode: 'publish', strict: true });
  const selected = before.issues.filter((issue) => {
    const code = issue.code.toLowerCase();
    if (!SAFE_CODES.has(code)) return false;
    if (request.fixAllSafe) return true;
    if (request.codes?.map((x) => x.toLowerCase()).includes(code)) return true;
    const id = `${issue.code}:${issue.pageId ?? ''}:${issue.nodeId ?? ''}`;
    return request.issueIds?.includes(id) ?? false;
  });

  let next = structuredClone(site);
  const fixedIssues: string[] = [];
  for (const issue of selected) {
    next = autoFixIssue(next, issue);
    fixedIssues.push(`${issue.code}:${issue.pageId ?? ''}:${issue.nodeId ?? ''}`);
  }
  const remainingQuality = runQualityGate(next, { mode: 'publish', strict: true });
  const presentation = remainingQuality.issues.map((i) => mapQualityIssueToPresentation(i, next));
  return { site: next, fixedIssues, remainingQuality, presentation };
}
