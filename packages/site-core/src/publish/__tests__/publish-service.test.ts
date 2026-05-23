import { describe, expect, it } from 'vitest';
import { publishDraft } from '../publish-service';
import { InMemoryPublishedSnapshotRepository } from '../in-memory-published-snapshot-repository';
import { InMemoryDraftRepository } from '../../storage/in-memory-draft-repository';
import { createProductSiteFixture } from '../../fixtures';

describe('publish service', () => {
  it('publishes valid draft and creates immutable snapshot', async () => {
    const drafts = new InMemoryDraftRepository();
    const snapshots = new InMemoryPublishedSnapshotRepository();
    const d = await drafts.createDraft({ siteId: 's1', productType: 'business', status: 'draft', site: createProductSiteFixture(), source: { type: 'manual' } });
    const result = await publishDraft(d.id, { drafts, snapshots });
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    const saved = await snapshots.getSnapshotById(result.snapshot.id);
    expect(saved?.version).toBe(1);

    await drafts.updateDraft(d.id, { site: { ...d.site, dataModel: { ...d.site.dataModel, fields: { ...d.site.dataModel.fields, brandName: 'Changed' } } } });
    const saved2 = await snapshots.getSnapshotById(result.snapshot.id);
    expect(saved2?.site.dataModel.fields.brandName).not.toBe('Changed');
  });

  it('returns not found for unknown draft', async () => {
    const result = await publishDraft('missing', { drafts: new InMemoryDraftRepository(), snapshots: new InMemoryPublishedSnapshotRepository() });
    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.error.code).toBe('draft_not_found');
  });
});
