import { runQualityGate } from '../../../product-engine/src/quality-gate';
import { validateProductSite } from '../validators';
import type { ProductSite } from '../types';
import type { ProductDraft } from '../drafts';
import type { PublishedAsset, PublishedRoute } from './published-route.types';
import type { PublishDraftErrorResponse, PublishDraftResponse } from './published-site-snapshot.types';
import type { DraftRepository } from '../storage/draft-repository.types';
import type { PublishedSnapshotRepository } from './published-snapshot-repository.types';

export function buildPublishedRoutes(site: ProductSite): PublishedRoute[] {
  const seen = new Set<string>();
  return site.siteMap.pages.map((p, idx) => {
    const base = idx === 0 ? '/' : (p.path || `/${p.id}`).startsWith('/') ? (p.path || `/${p.id}`) : `/${p.path}`;
    let path = base;
    let n = 1;
    while (seen.has(path)) { path = `${base}-${n++}`; }
    seen.add(path);
    return { path, pageId: p.id, title: p.title };
  });
}

export function collectPublishedAssets(site: ProductSite): PublishedAsset[] {
  const bySrc = new Map<string, PublishedAsset>();
  const add = (src: string, type: PublishedAsset['type'], id?: string) => {
    if (!src) return;
    const key = id ?? src;
    if (!bySrc.has(key)) bySrc.set(key, { id: key, src, type });
  };

  const scan = (v: unknown) => {
    if (!v) return;
    if (typeof v === 'object') {
      const obj = v as Record<string, unknown>;
      if (typeof obj.src === 'string') add(obj.src, 'image', typeof obj.assetId === 'string' ? obj.assetId : undefined);
      if (typeof obj.heroImageUrl === 'string') add(obj.heroImageUrl, 'image');
      if (typeof obj.logoUrl === 'string') add(obj.logoUrl, 'image');
      if (Array.isArray(obj.galleryImageUrls)) obj.galleryImageUrls.forEach((x)=>typeof x==='string'&&add(x,'image'));
      if (Array.isArray(obj.gallery)) obj.gallery.forEach((g)=>scan(g));
      Object.values(obj).forEach((x)=>{ if (x && typeof x === 'object') scan(x); });
    }
  };
  scan(site.dataModel.fields);

  for (const page of Object.values(site.pages)) {
    for (const asset of (page.assets ?? [])) add(asset.url, 'other', asset.id);
    for (const scenePage of page.pages ?? []) {
      for (const node of Object.values(scenePage.nodesById ?? {})) {
        const n = node as unknown as Record<string, unknown>;
        if (typeof n.src === 'string') add(n.src, 'image', typeof n.id === 'string' ? n.id : undefined);
      }
    }
  }
  return Array.from(bySrc.values());
}

export async function publishDraft(
  draftId: string,
  deps: { drafts: DraftRepository; snapshots: PublishedSnapshotRepository; baseUrl?: string }
): Promise<PublishDraftResponse | PublishDraftErrorResponse> {
  const draft = await deps.drafts.getDraftById(draftId);
  if (!draft) return { ok: false, error: { code: 'draft_not_found', message: 'Draft not found.' } };
  if (draft.status !== 'draft') return { ok: false, error: { code: 'invalid_draft', message: 'Draft status is not publishable.' } };

  const siteValidation = validateProductSite(draft.site);
  if (!siteValidation.valid) return { ok: false, error: { code: 'invalid_draft', message: 'Draft site is invalid.' } };

  const quality = runQualityGate(draft.site, { mode: 'publish', strict: true });
  if (quality.blockingCount > 0) return { ok: false, error: { code: 'blocking_quality_issues', message: 'Blocking quality issues prevent publish.', issues: quality.issues } };

  const latest = await deps.snapshots.getLatestSnapshotForDraft(draft.id);
  const version = (latest?.version ?? 0) + 1;
  const now = Date.now();
  const snapshot = await deps.snapshots.createSnapshot({
    siteId: draft.siteId,
    draftId: draft.id,
    productType: draft.productType,
    version,
    site: structuredClone(draft.site),
    routes: buildPublishedRoutes(draft.site),
    assets: collectPublishedAssets(draft.site),
    quality,
    meta: { createdAt: now, publishedAt: now, sourceDraftUpdatedAt: draft.meta.updatedAt }
  });

  const baseUrl = deps.baseUrl ?? '';
  return { ok: true, snapshot: { id: snapshot.id, draftId: snapshot.draftId, version: snapshot.version, publicUrl: `${baseUrl}/p/${snapshot.id}`, publishedAt: snapshot.meta.publishedAt } };
}
