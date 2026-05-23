import { draftVersionRepositorySingleton } from '../../../../../../../packages/site-core/src/storage';

export async function GET(_req: Request, ctx: { params: Promise<{ draftId: string }> }): Promise<Response> {
  const { draftId } = await ctx.params;
  const versions = await draftVersionRepositorySingleton.listVersions(draftId);
  return new Response(JSON.stringify({ ok: true, versions }), { status: 200, headers: { 'content-type': 'application/json' } });
}
