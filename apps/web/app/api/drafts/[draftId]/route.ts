import { draftRepositorySingleton, draftVersionRepositorySingleton } from '../../../../../../packages/site-core/src/storage';
import { DraftVersionService } from '../../../../../../packages/site-core/src/drafts';
import { validateProductSite } from '../../../../../../packages/site-core/src/validators';
import { runQualityGate } from '../../../../../../packages/product-engine/src/quality-gate';
import { updateSiteFromDataPatch } from '../../../../../../packages/product-engine/src/data-binding/update-site-from-data';
import { validateDraftUpdateRequest } from '../../../../../../packages/site-core/src/drafts';
import { validateBusinessInput } from '../../../../../../packages/packs/business/src';
import { validateWeddingInput } from '../../../../../../packages/packs/wedding/src';
import { validateRestaurantInput } from '../../../../../../packages/packs/restaurant/src';
import type { UpdateDraftRequest, UpdateDraftResponse, UpdateDraftErrorResponse } from '../../../../../../packages/site-core/src/drafts';

const json = (body: UpdateDraftResponse | UpdateDraftErrorResponse | { ok: true; draft: unknown }, status: number): Response =>
  new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json' } });

export async function GET(_req: Request, ctx: { params: Promise<{ draftId: string }> }): Promise<Response> {
  const { draftId } = await ctx.params;
  const draft = await draftRepositorySingleton.getDraftById(draftId);
  if (!draft) {
    return new Response(JSON.stringify({ ok: false, error: { code: 'draft_not_found', message: 'Draft not found.' } }), { status: 404, headers: { 'content-type': 'application/json' } });
  }
  return new Response(JSON.stringify({ ok: true, draft }), { status: 200, headers: { 'content-type': 'application/json' } });
}

export async function PATCH(req: Request, ctx: { params: Promise<{ draftId: string }> }): Promise<Response> {
  const { draftId } = await ctx.params;
  const existing = await draftRepositorySingleton.getDraftById(draftId);
  if (!existing) return json({ ok: false, error: { code: 'draft_not_found', message: 'Draft not found.' } }, 404);

  let body: unknown;
  try { body = await req.json(); } catch { return json({ ok: false, error: { code: 'bad_request', message: 'Invalid JSON body.' } }, 400); }

  const patch = body as UpdateDraftRequest;
  const validation = validateDraftUpdateRequest(patch);
  if (!validation.valid) return json({ ok: false, error: { code: validation.code ?? 'invalid_update', message: validation.message ?? 'Invalid update payload.' } }, 400);

  if (patch.dataPatch && typeof patch.dataPatch === 'object') {
    if (existing.productType === 'restaurant') {
      const v = validateRestaurantInput({ productType: 'restaurant_site', scope: 'one_page', stylePresetId: String(patch.stylePresetId ?? 'minimal'), data: { name: String((patch.dataPatch as Record<string, unknown>).brandName ?? existing.site.dataModel.fields.brandName ?? ''), menuItems: Array.isArray((patch.dataPatch as Record<string, unknown>).menuItems) ? ((patch.dataPatch as Record<string, unknown>).menuItems as Array<Record<string, unknown>>).map((m)=>({ name:String(m.name ?? ''), price:'', category:'' })) : [{ name: 'x', price:'', category:'' }] } });
      if (!v.valid) return json({ ok: false, error: { code: 'invalid_update', message: v.issues[0] ?? 'Invalid restaurant update.' } }, 400);
    }
    if (existing.productType === 'business') {
      const merged = { ...(existing.site.dataModel.fields as Record<string, unknown>), ...(patch.dataPatch as Record<string, unknown>) };
      const v = validateBusinessInput({ productType: (merged.businessScope === 'one_page' ? 'business_landing' : 'business_website') as never, scope: (merged.businessScope as never) ?? 'one_page', stylePresetId: String(patch.stylePresetId ?? 'minimal'), data: merged as never });
      if (!v.valid) return json({ ok: false, error: { code: 'invalid_update', message: v.issues[0] ?? 'Invalid business update.' } }, 400);
    }
    if (existing.productType === 'wedding') {
      const merged = { ...(existing.site.dataModel.fields as Record<string, unknown>), ...(patch.dataPatch as Record<string, unknown>) };
      const v = validateWeddingInput({ productType: 'wedding_invitation', scope: (merged.weddingScope as never) ?? 'one_page', stylePresetId: String(patch.stylePresetId ?? 'minimal'), data: merged as never });
      if (!v.valid) return json({ ok: false, error: { code: 'invalid_update', message: v.issues[0] ?? 'Invalid wedding update.' } }, 400);
    }
  }

  const updatedSite = updateSiteFromDataPatch(existing.site, patch);
  const siteValidation = validateProductSite(updatedSite);
  if (!siteValidation.valid) return json({ ok: false, error: { code: 'invalid_site_after_update', message: 'Updated site failed schema validation.' } }, 400);

  const quality = runQualityGate(updatedSite, { mode: 'preview' });
  if (quality.blockingCount > 0) return json({ ok: false, error: { code: 'blocking_quality_issues', message: 'Updated site has blocking quality issues.' } }, 400);

  try {
    const updated = await draftRepositorySingleton.updateDraft(draftId, {
      site: updatedSite,
      source: {
        ...existing.source,
        quality,
        inputSummary: {
          ...(existing.source.inputSummary ?? {}),
          ...(patch.stylePresetId ? { stylePresetId: patch.stylePresetId } : {})
        }
      }
    });
    const versionService = new DraftVersionService(draftVersionRepositorySingleton, draftRepositorySingleton);
    await versionService.createVersionForDraftUpdate({ draftAfter: updated, source: 'quick_edit', summary: `Updated ${existing.productType} content` });
    return json({ ok: true, draft: updated }, 200);
  } catch {
    return json({ ok: false, error: { code: 'draft_update_failed', message: 'Failed to update draft.' } }, 500);
  }
}
