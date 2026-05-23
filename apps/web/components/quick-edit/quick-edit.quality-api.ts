import type { AutoFixIssuesRequest, QualityIssuePresentation } from '../../../../packages/product-engine/src/quality-gate';
import type { AutoFixIssuesResponse, DraftQualityCheckResponse } from '../../../../packages/site-core/src/drafts';

export async function runQualityCheck(draftId: string): Promise<DraftQualityCheckResponse> {
  const res = await fetch(`/api/drafts/${draftId}/quality-check`, { method: 'GET' });
  const json = await res.json() as DraftQualityCheckResponse | { ok: false; error: { message: string } };
  if (!res.ok || !('ok' in json) || !json.ok) throw new Error('error' in json ? json.error.message : 'Quality check failed');
  return json;
}

export async function autoFixIssues(draftId: string, request: AutoFixIssuesRequest): Promise<AutoFixIssuesResponse> {
  const res = await fetch(`/api/drafts/${draftId}/quality-check/auto-fix`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(request) });
  const json = await res.json() as AutoFixIssuesResponse | { ok: false; error: { message: string } };
  if (!res.ok || !('ok' in json) || !json.ok) throw new Error('error' in json ? json.error.message : 'Auto-fix failed');
  return json;
}

export function filterPresentedIssues(issues: QualityIssuePresentation[], filter: 'all' | 'blocking' | 'warning' | 'info' | 'autofixable') {
  if (filter === 'all') return issues;
  if (filter === 'autofixable') return issues.filter((x) => x.autoFixable);
  return issues.filter((x) => x.severity === filter);
}
