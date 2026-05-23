import type { DraftVersionListItem, ProductDraftVersion } from './version-history.types';
import type { ProductDraft } from '../../../../../packages/site-core/src/drafts';

export async function listDraftVersions(draftId: string): Promise<DraftVersionListItem[]> {
  const res = await fetch(`/api/drafts/${draftId}/versions`); const json = await res.json() as { ok: boolean; versions?: DraftVersionListItem[] };
  if (!res.ok || !json.ok) throw new Error('Failed to load versions'); return json.versions ?? [];
}
export async function getDraftVersion(draftId: string, versionId: string): Promise<ProductDraftVersion> {
  const res = await fetch(`/api/drafts/${draftId}/versions/${versionId}`); const json = await res.json() as { ok: boolean; version?: ProductDraftVersion };
  if (!res.ok || !json.ok || !json.version) throw new Error('Failed to load version'); return json.version;
}
export async function rollbackDraft(draftId: string, versionId: string): Promise<{ draft: ProductDraft }> {
  const res = await fetch(`/api/drafts/${draftId}/rollback`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ versionId }) });
  const json = await res.json() as { ok: boolean; draft?: ProductDraft; error?: { message?: string } };
  if (!res.ok || !json.ok || !json.draft) throw new Error(json.error?.message ?? 'Rollback failed');
  return { draft: json.draft };
}
