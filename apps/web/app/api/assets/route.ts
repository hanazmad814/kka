import { assetRepositorySingleton } from '../../../../../packages/site-core/src/assets';
export async function GET(req: Request): Promise<Response> {
  const { searchParams } = new URL(req.url);
  const draftId = searchParams.get('draftId') ?? undefined;
  const productType = searchParams.get('productType') ?? undefined;
  const assets = await assetRepositorySingleton.listAssets({ draftId, productType: productType as never });
  return new Response(JSON.stringify({ ok: true, assets }), { status: 200, headers: { 'content-type': 'application/json' } });
}
