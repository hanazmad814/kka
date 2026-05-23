import { describe, expect, it } from 'vitest';
import { DraftVersionService } from '../draft-version-service';
import { InMemoryDraftVersionRepository, InMemoryDraftRepository } from '../../storage';
import { createProductSiteFixture } from '../../fixtures';

describe('draft version service', () => {
  it('creates initial version and rollback creates rollback version', async () => {
    const drafts = new InMemoryDraftRepository();
    const versions = new InMemoryDraftVersionRepository();
    const service = new DraftVersionService(versions, drafts);
    const draft = await drafts.createDraft({ siteId: 's1', productType: 'business', status: 'draft', site: createProductSiteFixture(), source: { type: 'manual' } });
    const v1 = await service.createInitialVersionForDraft(draft);
    const updated = await drafts.updateDraft(draft.id, { site: { ...draft.site, dataModel: { ...draft.site.dataModel, fields: { ...draft.site.dataModel.fields, brandName: 'Changed' } } } });
    await service.createVersionForDraftUpdate({ draftAfter: updated, source: 'quick_edit', summary: 'Updated draft' });
    const rolled = await service.rollbackDraftToVersion({ draftId: draft.id, versionId: v1.id });
    expect(rolled.rollbackVersion.source).toBe('rollback');
    expect(rolled.rollbackVersion.meta.rollbackFromVersionId).toBe(v1.id);
  });
});
