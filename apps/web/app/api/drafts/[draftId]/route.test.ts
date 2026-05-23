import { describe, expect, it } from 'vitest';
import { GET, PATCH } from './route';
import { draftRepositorySingleton } from '../../../../../../packages/site-core/src/storage';
import { createProductSiteFixture } from '../../../../../../packages/site-core/src/fixtures';

describe('drafts/[draftId] route', () => {
  it('GET unknown draft returns 404', async () => {
    const res = await GET(new Request('http://localhost/api/drafts/nope'), { params: Promise.resolve({ draftId: 'nope' }) });
    expect(res.status).toBe(404);
  });

  it('GET existing draft returns draft', async () => {
    const draft = await draftRepositorySingleton.createDraft({ siteId: 's1', productType: 'business', status: 'draft', site: createProductSiteFixture(), source: { type: 'manual' } });
    const res = await GET(new Request(`http://localhost/api/drafts/${draft.id}`), { params: Promise.resolve({ draftId: draft.id }) });
    const json = await res.json() as { ok: boolean; draft: { id: string } };
    expect(res.status).toBe(200);
    expect(json.ok).toBe(true);
    expect(json.draft.id).toBe(draft.id);
  });

  it('PATCH unknown draft returns 404', async () => {
    const res = await PATCH(new Request('http://localhost/api/drafts/nope', { method: 'PATCH', body: JSON.stringify({ dataPatch: { brandName: 'X' } }) }), { params: Promise.resolve({ draftId: 'nope' }) });
    expect(res.status).toBe(404);
  });

  it('PATCH invalid body returns 400', async () => {
    const draft = await draftRepositorySingleton.createDraft({ siteId: 's2', productType: 'business', status: 'draft', site: createProductSiteFixture(), source: { type: 'manual' } });
    const res = await PATCH(new Request(`http://localhost/api/drafts/${draft.id}`, { method: 'PATCH', body: JSON.stringify({ dataPatch: { brandName: '   ' } }) }), { params: Promise.resolve({ draftId: draft.id }) });
    expect(res.status).toBe(400);
  });

  it('PATCH valid update returns updated draft', async () => {
    const draft = await draftRepositorySingleton.createDraft({ siteId: 's3', productType: 'business', status: 'draft', site: createProductSiteFixture(), source: { type: 'manual' } });
    const res = await PATCH(new Request(`http://localhost/api/drafts/${draft.id}`, { method: 'PATCH', body: JSON.stringify({ dataPatch: { brandName: 'Updated Brand', menuItems: [{ id: '1', name: 'Pho' }] } }) }), { params: Promise.resolve({ draftId: draft.id }) });
    const json = await res.json() as { ok: boolean; draft: { site: { dataModel: { fields: Record<string, unknown> } } } };
    expect(res.status).toBe(200);
    expect(json.ok).toBe(true);
    expect(json.draft.site.dataModel.fields.brandName).toBe('Updated Brand');
  });
});


it('PATCH business update works', async () => {
  const draft = await draftRepositorySingleton.createDraft({ siteId: 's4', productType: 'business', status: 'draft', site: { ...createProductSiteFixture(), productType: 'business', dataModel: { ...createProductSiteFixture().dataModel, fields: { brandName: 'B', services: [{ id: 's1', name: 'Svc' }], businessScope: 'one_page' } } }, source: { type: 'manual' } });
  const res = await PATCH(new Request(`http://localhost/api/drafts/${draft.id}`, { method: 'PATCH', body: JSON.stringify({ dataPatch: { brandName: 'B2' } }) }), { params: Promise.resolve({ draftId: draft.id }) });
  expect(res.status).toBe(200);
});

it('PATCH wedding invalid update returns 400', async () => {
  const draft = await draftRepositorySingleton.createDraft({ siteId: 's5', productType: 'wedding', status: 'draft', site: { ...createProductSiteFixture(), productType: 'wedding', dataModel: { ...createProductSiteFixture().dataModel, fields: { couple: { brideName: 'A', groomName: 'B' }, event: { date: '2026-01-01', venueName: 'Hall' }, weddingScope: 'one_page' } } }, source: { type: 'manual' } });
  const res = await PATCH(new Request(`http://localhost/api/drafts/${draft.id}`, { method: 'PATCH', body: JSON.stringify({ dataPatch: { couple: { brideName: '', groomName: '' } } }) }), { params: Promise.resolve({ draftId: draft.id }) });
  expect(res.status).toBe(400);
});
