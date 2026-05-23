import { describe, expect, it } from 'vitest';
import { createProductSiteFixture } from '../../fixtures';
import { InMemoryDraftRepository } from '../in-memory-draft-repository';

describe('draft repository', () => {
  it('createDraft stores draft', async () => {
    const repo = new InMemoryDraftRepository();
    const created = await repo.createDraft({ siteId: 's1', productType: 'business', status: 'draft', site: createProductSiteFixture(), source: { type: 'manual' } });
    expect(created.id).toContain('draft-');
  });
  it('getDraftById returns created draft', async () => {
    const repo = new InMemoryDraftRepository();
    const created = await repo.createDraft({ siteId: 's1', productType: 'business', status: 'draft', site: createProductSiteFixture(), source: { type: 'manual' } });
    const found = await repo.getDraftById(created.id);
    expect(found?.id).toBe(created.id);
  });
  it('updateDraft updates updatedAt', async () => {
    const repo = new InMemoryDraftRepository();
    const created = await repo.createDraft({ siteId: 's1', productType: 'business', status: 'draft', site: createProductSiteFixture(), source: { type: 'manual' } });
    const updated = await repo.updateDraft(created.id, { status: 'archived' });
    expect(updated.meta.updatedAt).toBeGreaterThanOrEqual(created.meta.updatedAt);
  });
  it('unknown draft returns null', async () => {
    const repo = new InMemoryDraftRepository();
    expect(await repo.getDraftById('nope')).toBeNull();
  });
});
