import { describe, expect, it } from 'vitest';
import { GET } from './route';
import { draftRepositorySingleton } from '../../../../../../../packages/site-core/src/storage';
import { createProductSiteFixture } from '../../../../../../../packages/site-core/src/fixtures';

describe('quality-check route', () => {
  it('returns 404 when draft not found', async () => {
    const res = await GET(new Request('http://localhost/api/drafts/missing/quality-check'), { params: Promise.resolve({ draftId: 'missing' }) });
    expect(res.status).toBe(404);
  });

  it('returns quality response for valid draft', async () => {
    const d = await draftRepositorySingleton.createDraft({ siteId: 'qq', productType: 'business', status: 'draft', site: createProductSiteFixture(), source: { type: 'manual' } });
    const res = await GET(new Request(`http://localhost/api/drafts/${d.id}/quality-check`), { params: Promise.resolve({ draftId: d.id }) });
    const json = await res.json() as { ok: boolean; result?: { blockingCount: number } };
    expect(res.status).toBe(200);
    expect(json.ok).toBe(true);
    expect(typeof json.result?.blockingCount).toBe('number');
  });
});
