import type { MediaAsset } from './asset-types';
export async function uploadAsset(file: File, ctx?: { draftId?: string; productType?: string }): Promise<MediaAsset> {
  const fd = new FormData(); fd.set('file', file); if (ctx?.draftId) fd.set('draftId', ctx.draftId); if (ctx?.productType) fd.set('productType', ctx.productType);
  const res = await fetch('/api/assets/upload', { method: 'POST', body: fd }); const j = await res.json() as { ok: boolean; asset?: MediaAsset; error?: { message: string } };
  if (!res.ok || !j.ok || !j.asset) throw new Error(j.error?.message ?? 'Upload failed'); return j.asset;
}
export async function listAssets(params?: { draftId?: string; productType?: string }): Promise<MediaAsset[]> {
  const qp = new URLSearchParams(); if (params?.draftId) qp.set('draftId', params.draftId); if (params?.productType) qp.set('productType', params.productType);
  const res = await fetch(`/api/assets?${qp.toString()}`); const j = await res.json() as { ok: boolean; assets?: MediaAsset[] };
  if (!res.ok || !j.ok) throw new Error('Load assets failed'); return j.assets ?? [];
}
