import { DraftVersionService } from '../../../../../../../packages/site-core/src/drafts';
import { draftRepositorySingleton, draftVersionRepositorySingleton } from '../../../../../../../packages/site-core/src/storage';

export async function POST(req: Request, ctx: { params: Promise<{ draftId: string }> }): Promise<Response> {
  const { draftId } = await ctx.params;
  let body: { versionId?: string } = {};
  try { body = await req.json() as { versionId?: string }; } catch {
    return new Response(JSON.stringify({ ok: false, error: { code: 'bad_request', message: 'Invalid JSON body.' } }), { status: 400, headers: { 'content-type': 'application/json' } });
  }
  if (!body.versionId) return new Response(JSON.stringify({ ok: false, error: { code: 'bad_request', message: 'versionId is required.' } }), { status: 400, headers: { 'content-type': 'application/json' } });

  const service = new DraftVersionService(draftVersionRepositorySingleton, draftRepositorySingleton);
  try {
    const result = await service.rollbackDraftToVersion({ draftId, versionId: body.versionId });
    return new Response(JSON.stringify({ ok: true, draft: result.draft, rollbackVersion: result.rollbackVersion }), { status: 200, headers: { 'content-type': 'application/json' } });
  } catch (e) {
    const code = e instanceof Error ? e.message : 'rollback_failed';
    const status = code === 'draft_not_found' || code === 'version_not_found' ? 404 : 400;
    return new Response(JSON.stringify({ ok: false, error: { code, message: 'Rollback failed.' } }), { status, headers: { 'content-type': 'application/json' } });
  }
}
