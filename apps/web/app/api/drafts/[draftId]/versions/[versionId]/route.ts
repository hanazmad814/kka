import { draftVersionRepositorySingleton } from '../../../../../../../../packages/site-core/src/storage';

export async function GET(_req: Request, ctx: { params: Promise<{ draftId: string; versionId: string }> }): Promise<Response> {
  const { draftId, versionId } = await ctx.params;
  const version = await draftVersionRepositorySingleton.getVersionById(draftId, versionId);
  if (!version) return new Response(JSON.stringify({ ok: false, error: { code: 'version_not_found', message: 'Version not found.' } }), { status: 404, headers: { 'content-type': 'application/json' } });
  return new Response(JSON.stringify({ ok: true, version }), { status: 200, headers: { 'content-type': 'application/json' } });
}
