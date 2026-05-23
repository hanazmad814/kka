import { draftRepositorySingleton, draftVersionRepositorySingleton } from '../../../../../../../../packages/site-core/src/storage';
import { DraftVersionService } from '../../../../../../../../packages/site-core/src/drafts';
import { autoFixDraftIssues } from '../../../../../../../../packages/site-core/src/drafts';
import type { AutoFixIssuesRequest } from '../../../../../../../../packages/product-engine/src/quality-gate';

export async function POST(req: Request, ctx: { params: Promise<{ draftId: string }> }): Promise<Response> {
  const { draftId } = await ctx.params;
  let body: AutoFixIssuesRequest = { fixAllSafe: true };
  try { body = await req.json() as AutoFixIssuesRequest; } catch {}
  const result = await autoFixDraftIssues(draftId, body, draftRepositorySingleton);
  if (result.ok) {
    const fresh = await draftRepositorySingleton.getDraftById(draftId);
    if (fresh) {
      const versionService = new DraftVersionService(draftVersionRepositorySingleton, draftRepositorySingleton);
      await versionService.createVersionForDraftUpdate({ draftAfter: fresh, source: 'auto_fix', summary: 'Applied safe quality fixes' });
    }
  }
  const status = !result.ok && 'error' in result && result.error.code === 'draft_not_found' ? 404 : result.ok ? 200 : 400;
  return new Response(JSON.stringify(result), { status, headers: { 'content-type': 'application/json' } });
}
