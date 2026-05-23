import { draftRepositorySingleton } from '../../../../../../../packages/site-core/src/storage';
import { runDraftQualityCheck } from '../../../../../../../packages/site-core/src/drafts';

export async function GET(_req: Request, ctx: { params: Promise<{ draftId: string }> }): Promise<Response> {
  const { draftId } = await ctx.params;
  const result = await runDraftQualityCheck(draftId, draftRepositorySingleton);
  const status = !result.ok && 'error' in result && result.error.code === 'draft_not_found' ? 404 : result.ok ? 200 : 400;
  return new Response(JSON.stringify(result), { status, headers: { 'content-type': 'application/json' } });
}

export const POST = GET;
