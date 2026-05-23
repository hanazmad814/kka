import { AssetService, LocalAssetStorage, assetRepositorySingleton } from '../../../../../../packages/site-core/src/assets';

export async function POST(req: Request): Promise<Response> {
  try {
    const form = await req.formData();
    const file = form.get('file');
    if (!(file instanceof File)) return new Response(JSON.stringify({ ok: false, error: { code: 'missing_file', message: 'file is required' } }), { status: 400, headers: { 'content-type': 'application/json' } });
    const bytes = new Uint8Array(await file.arrayBuffer());
    const service = new AssetService(assetRepositorySingleton, new LocalAssetStorage());
    const asset = await service.uploadImage({ bytes, filename: file.name, mimeType: file.type, draftId: String(form.get('draftId') ?? '') || undefined, productType: String(form.get('productType') ?? '') || undefined, alt: String(form.get('alt') ?? '') || undefined, caption: String(form.get('caption') ?? '') || undefined });
    return new Response(JSON.stringify({ ok: true, asset }), { status: 200, headers: { 'content-type': 'application/json' } });
  } catch (e) {
    const code = e instanceof Error ? e.message : 'upload_failed';
    const status = code === 'unsupported_file_type' || code === 'file_too_large' ? 400 : 500;
    return new Response(JSON.stringify({ ok: false, error: { code, message: 'Upload failed' } }), { status, headers: { 'content-type': 'application/json' } });
  }
}
