import { draftRepositorySingleton } from '../../../../../../../packages/site-core/src/storage';
import { publishedSnapshotRepositorySingleton, publishDraft } from '../../../../../../../packages/site-core/src/publish';

export async function POST(_req: Request, ctx: { params: Promise<{ draftId: string }> }): Promise<Response> {
  const { draftId } = await ctx.params;
  try {
    const result = await publishDraft(draftId, { drafts: draftRepositorySingleton, snapshots: publishedSnapshotRepositorySingleton, baseUrl: '' });
    if (result.ok === false) {
      const status = result.error.code === 'draft_not_found' ? 404 : result.error.code === 'blocking_quality_issues' ? 400 : 400;
      return new Response(JSON.stringify(result), { status, headers: { 'content-type': 'application/json' } });
    }
    return new Response(JSON.stringify(result), { status: 200, headers: { 'content-type': 'application/json' } });
  } catch {
    return new Response(JSON.stringify({ ok: false, error: { code: 'publish_failed', message: 'Failed to publish draft.' } }), { status: 500, headers: { 'content-type': 'application/json' } });
  }
}
