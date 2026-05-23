import { validateProductSite } from '../validators';
import type { DraftRepository } from '../storage/draft-repository.types';
import type { AutoFixIssuesRequest } from '../../../product-engine/src/quality-gate';
import { autoFixQualityIssuesSite, mapQualityIssueToPresentation, runQualityGate } from '../../../product-engine/src/quality-gate';
import type { AutoFixIssuesResponse, DraftQualityCheckErrorResponse, DraftQualityCheckResponse } from './draft-quality.types';

export async function runDraftQualityCheck(draftId: string, drafts: DraftRepository): Promise<DraftQualityCheckResponse | DraftQualityCheckErrorResponse> {
  const draft = await drafts.getDraftById(draftId);
  if (!draft) return { ok: false, error: { code: 'draft_not_found', message: 'Draft not found.' } };
  const siteValidation = validateProductSite(draft.site);
  if (!siteValidation.valid) return { ok: false, error: { code: 'invalid_draft', message: 'Draft site is invalid.' } };
  const result = runQualityGate(draft.site, { mode: 'publish', strict: true });
  const presentation = result.issues.map((i) => mapQualityIssueToPresentation(i, draft.site, draft));
  return { ok: true, draftId, checkedAt: Date.now(), result, presentation };
}

export async function autoFixDraftIssues(draftId: string, request: AutoFixIssuesRequest, drafts: DraftRepository): Promise<AutoFixIssuesResponse | DraftQualityCheckErrorResponse> {
  const draft = await drafts.getDraftById(draftId);
  if (!draft) return { ok: false, error: { code: 'draft_not_found', message: 'Draft not found.' } };
  const fixed = autoFixQualityIssuesSite(draft.site, request);
  const validation = validateProductSite(fixed.site);
  if (!validation.valid) return { ok: false, error: { code: 'invalid_site_after_fix', message: 'Auto-fix produced an invalid site.' } };
  if (fixed.remainingQuality.blockingCount > runQualityGate(draft.site, { mode: 'publish', strict: true }).blockingCount) {
    return { ok: false, error: { code: 'blocking_quality_issues', message: 'Auto-fix introduced blocking issues.' } };
  }
  const updated = await drafts.updateDraft(draftId, { site: fixed.site });
  return { ok: true, draft: updated, fixedIssues: fixed.fixedIssues, remainingQuality: fixed.remainingQuality, presentation: fixed.presentation };
}
