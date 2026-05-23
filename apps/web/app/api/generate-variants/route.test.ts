import { describe, expect, it } from 'vitest';
import { POST } from './route';

describe('generate-variants route', () => {
  it('accepts business_landing input', async () => {
    const req = new Request('http://localhost/api/generate-variants', { method: 'POST', body: JSON.stringify({ productType: 'business', scope: 'landing', stylePresetId: 'minimal', data: { businessScope: 'one_page', brandName: 'Acme', services: [{ id: 's1', name: 'x' }] } }) });
    const res = await POST(req);
    expect(res.status).toBe(200);
  });

  it('accepts business_website input', async () => {
    const req = new Request('http://localhost/api/generate-variants', { method: 'POST', body: JSON.stringify({ productType: 'business', scope: 'full-site', stylePresetId: 'modern', data: { businessScope: 'mini_site_3_pages', brandName: 'Acme', services: [{ id: 's1', name: 'x' }] } }) });
    const res = await POST(req);
    expect(res.status).toBe(200);
  });

  it('accepts wedding_invitation input', async () => {
    const req = new Request('http://localhost/api/generate-variants', { method: 'POST', body: JSON.stringify({ productType: 'wedding', scope: 'landing', stylePresetId: 'classic', data: { weddingScope: 'one_page', couple: { brideName: 'A', groomName: 'B' }, event: { date: '2026-01-01', venueName: 'Hall' } } }) });
    const res = await POST(req);
    expect(res.status).toBe(200);
  });

  it('invalid scope/productType combination returns 400', async () => {
    const req = new Request('http://localhost/api/generate-variants', { method: 'POST', body: JSON.stringify({ productType: 'business', scope: 'landing', stylePresetId: 'minimal', data: { businessScope: 'standard_site_5_pages', brandName: 'Acme', services: [{ id: 's1', name: 'x' }] } }) });
    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  it('invalid product data returns 400', async () => {
    const req = new Request('http://localhost/api/generate-variants', { method: 'POST', body: JSON.stringify({ productType: 'wedding', scope: 'landing', stylePresetId: 'classic', data: { weddingScope: 'one_page', couple: { brideName: '', groomName: '' }, event: { date: '', venueName: '' } } }) });
    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  it('invalid product type returns 400', async () => {
    const req = new Request('http://localhost/api/generate-variants', { method: 'POST', body: JSON.stringify({ productType: 'unknown', scope: 'landing', stylePresetId: 'minimal', data: {} }) });
    const res = await POST(req);
    expect(res.status).toBe(400);
  });
});
