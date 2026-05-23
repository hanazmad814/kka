import { describe, expect, it } from 'vitest';
import { POST } from './route';
import { createProductSiteFixture } from '../../../../../packages/site-core/src/fixtures';

describe('select-variant route', () => {
  it('invalid body returns 400', async () => {
    const res = await POST(new Request('http://localhost/api/select-variant', { method: 'POST', body: JSON.stringify({}) }));
    expect(res.status).toBe(400);
  });
  it('valid body returns ok true', async () => {
    const site = createProductSiteFixture();
    const res = await POST(new Request('http://localhost/api/select-variant', { method: 'POST', body: JSON.stringify({ variantId: 'v1', site }) }));
    const json = await res.json() as { ok: boolean; draft: { id: string } };
    expect(res.status).toBe(200);
    expect(json.ok).toBe(true);
    expect(json.draft.id).toContain('draft-');
  });
});
