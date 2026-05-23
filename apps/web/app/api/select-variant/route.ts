import { runQualityGate } from '../../../../../packages/product-engine/src/quality-gate';
import { validateProductSite } from '../../../../../packages/site-core/src/validators';
import { draftRepositorySingleton, draftVersionRepositorySingleton } from '../../../../../packages/site-core/src/storage';
import { DraftVersionService } from '../../../../../packages/site-core/src/drafts';
import type { SelectVariantRequest, SelectVariantResponse, SelectVariantErrorResponse } from '../../../../../packages/site-core/src/drafts';

const json = (body: SelectVariantResponse | SelectVariantErrorResponse, status: number): Response =>
  new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json' } });

export async function POST(req: Request): Promise<Response> {
  try {
    const body = await req.json() as Partial<SelectVariantRequest>;
    if (!body?.variantId || !body.site) return json({ ok: false, error: { code: 'bad_request', message: 'variantId and site are required.' } }, 400);
    if (body.quality?.blockingCount && body.quality.blockingCount > 0) return json({ ok: false, error: { code: 'blocking_quality_issues', message: 'Client reported blocking quality issues.' } }, 400);

    const siteValidation = validateProductSite(body.site);
    if (!siteValidation.valid) return json({ ok: false, error: { code: 'invalid_site', message: 'ProductSite validation failed.' } }, 400);

    const quality = runQualityGate(body.site, { mode: 'preview' });
    if (quality.blockingCount > 0) return json({ ok: false, error: { code: 'blocking_quality_issues', message: 'Blocking quality issues found.' } }, 400);

    const draft = await draftRepositorySingleton.createDraft({
      siteId: body.site.id,
      productType: body.site.productType,
      status: 'draft',
      site: structuredClone(body.site),
      source: {
        type: 'generated_variant',
        variantId: body.variantId,
        genome: body.genome,
        score: body.score,
        quality,
        inputSummary: body.inputSummary
      }
    });

    const versionService = new DraftVersionService(draftVersionRepositorySingleton, draftRepositorySingleton);
    await versionService.createInitialVersionForDraft(draft);

    return json({ ok: true, draft: { id: draft.id, productType: draft.productType, status: draft.status, createdAt: draft.meta.createdAt, updatedAt: draft.meta.updatedAt }, redirectTo: `/editor/quick/${draft.id}` }, 200);
  } catch {
    return json({ ok: false, error: { code: 'draft_create_failed', message: 'Failed to create draft.' } }, 500);
  }
}
