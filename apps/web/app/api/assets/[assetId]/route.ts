import { assetRepositorySingleton } from '../../../../../../packages/site-core/src/assets';
export async function GET(_req: Request, ctx: { params: Promise<{ assetId: string }> }): Promise<Response> {
  const { assetId } = await ctx.params;
  const asset = await assetRepositorySingleton.getAssetById(assetId);
  if (!asset) return new Response(JSON.stringify({ ok: false, error: { code: 'not_found', message: 'Asset not found' } }), { status: 404, headers: { 'content-type': 'application/json' } });
  return new Response(JSON.stringify({ ok: true, asset }), { status: 200, headers: { 'content-type': 'application/json' } });
}
export async function PATCH(req: Request, ctx: { params: Promise<{ assetId: string }> }): Promise<Response> {
  const { assetId } = await ctx.params;
  const body = await req.json() as { alt?: string; caption?: string };
  try {
    const asset = await assetRepositorySingleton.updateAsset(assetId, { alt: body.alt, caption: body.caption });
    return new Response(JSON.stringify({ ok: true, asset }), { status: 200, headers: { 'content-type': 'application/json' } });
  } catch {
    return new Response(JSON.stringify({ ok: false, error: { code: 'not_found', message: 'Asset not found' } }), { status: 404, headers: { 'content-type': 'application/json' } });
  }
}
