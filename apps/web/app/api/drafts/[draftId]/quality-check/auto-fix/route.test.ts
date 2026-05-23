import { describe, expect, it } from 'vitest';
import { POST } from './route';
import { draftRepositorySingleton } from '../../../../../../../../packages/site-core/src/storage';
import { createProductSiteFixture } from '../../../../../../../../packages/site-core/src/fixtures';

describe('quality-check auto-fix route', () => {
  it('returns 404 when draft not found', async () => {
    const res = await POST(new Request('http://localhost/api/drafts/missing/quality-check/auto-fix', { method: 'POST', body: '{}' }), { params: Promise.resolve({ draftId: 'missing' }) });
    expect(res.status).toBe(404);
  });

  it('returns auto-fix response for valid draft', async () => {
    const d = await draftRepositorySingleton.createDraft({ siteId: 'qq2', productType: 'business', status: 'draft', site: createProductSiteFixture(), source: { type: 'manual' } });
    const res = await POST(new Request(`http://localhost/api/drafts/${d.id}/quality-check/auto-fix`, { method: 'POST', body: JSON.stringify({ fixAllSafe: true }) }), { params: Promise.resolve({ draftId: d.id }) });
    const json = await res.json() as { ok: boolean; fixedIssues?: string[] };
    expect(res.status).toBe(200);
    expect(json.ok).toBe(true);
    expect(Array.isArray(json.fixedIssues)).toBe(true);
  });
});
