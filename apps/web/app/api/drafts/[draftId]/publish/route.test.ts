import { describe, expect, it } from 'vitest';
import { POST } from './route';
import { draftRepositorySingleton } from '../../../../../../../packages/site-core/src/storage';
import { createProductSiteFixture } from '../../../../../../../packages/site-core/src/fixtures';

describe('publish route', () => {
  it('returns 404 for unknown draft', async () => {
    const res = await POST(new Request('http://localhost/api/drafts/nope/publish', { method: 'POST' }), { params: Promise.resolve({ draftId: 'nope' }) });
    expect(res.status).toBe(404);
  });

  it('publishes valid draft', async () => {
    const draft = await draftRepositorySingleton.createDraft({ siteId: 'p1', productType: 'business', status: 'draft', site: createProductSiteFixture(), source: { type: 'manual' } });
    const res = await POST(new Request(`http://localhost/api/drafts/${draft.id}/publish`, { method: 'POST' }), { params: Promise.resolve({ draftId: draft.id }) });
    const json = await res.json() as { ok: boolean; snapshot?: { id: string; publicUrl: string } };
    expect(res.status).toBe(200);
    expect(json.ok).toBe(true);
    expect(json.snapshot?.id).toContain('snapshot-');
  });
});
