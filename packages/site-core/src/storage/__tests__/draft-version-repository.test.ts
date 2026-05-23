import { describe, expect, it } from 'vitest';
import { InMemoryDraftVersionRepository } from '../in-memory-draft-version-repository';
import { createProductSiteFixture } from '../../fixtures';

describe('draft version repository', () => {
  it('creates and lists versions with incrementing numbers', async () => {
    const repo = new InMemoryDraftVersionRepository();
    await repo.createVersion({ draftId: 'd1', site: createProductSiteFixture(), source: 'created' });
    await repo.createVersion({ draftId: 'd1', site: createProductSiteFixture(), source: 'quick_edit' });
    const list = await repo.listVersions('d1');
    expect(list.map((x) => x.versionNumber)).toEqual([1, 2]);
    const latest = await repo.getLatestVersion('d1');
    expect(latest?.versionNumber).toBe(2);
  });
});
