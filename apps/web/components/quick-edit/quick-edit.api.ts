import type { ProductDraft, UpdateDraftRequest } from '../../../../packages/site-core/src/drafts';

export async function patchDraft(draftId: string, patch: UpdateDraftRequest): Promise<ProductDraft> {
  const res = await fetch(`/api/drafts/${draftId}`, { method: 'PATCH', headers: { 'content-type': 'application/json' }, body: JSON.stringify(patch) });
  const json = await res.json() as { ok: boolean; draft?: ProductDraft; error?: { message: string } };
  if (!res.ok || !json.ok || !json.draft) throw new Error(json.error?.message ?? 'Failed to save draft');
  return json.draft;
}

export async function publishDraft(draftId: string): Promise<{ id: string; version: number; publicUrl: string; publishedAt: number }> {
  const res = await fetch(`/api/drafts/${draftId}/publish`, { method: 'POST' });
  const json = await res.json() as { ok: boolean; snapshot?: { id: string; version: number; publicUrl: string; publishedAt: number }; error?: { message: string } };
  if (!res.ok || !json.ok || !json.snapshot) throw new Error(json.error?.message ?? 'Failed to publish draft');
  return json.snapshot;
}
