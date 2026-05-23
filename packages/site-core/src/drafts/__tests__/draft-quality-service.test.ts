import { describe, expect, it } from 'vitest';
import { InMemoryDraftRepository } from '../../storage/in-memory-draft-repository';
import { createProductSiteFixture } from '../../fixtures';
import { autoFixDraftIssues, runDraftQualityCheck } from '../draft-quality-service';

describe('draft quality service', () => {
  it('returns not found for unknown draft', async () => {
    const drafts = new InMemoryDraftRepository();
    const result = await runDraftQualityCheck('missing', drafts);
    expect(result.ok).toBe(false);
  });

  it('returns quality result for valid draft', async () => {
    const drafts = new InMemoryDraftRepository();
    const d = await drafts.createDraft({ siteId: 'x', productType: 'business', status: 'draft', site: createProductSiteFixture(), source: { type: 'manual' } });
    const result = await runDraftQualityCheck(d.id, drafts);
    expect(result.ok).toBe(true);
  });

  it('auto-fix runs safely', async () => {
    const drafts = new InMemoryDraftRepository();
    const d = await drafts.createDraft({ siteId: 'x2', productType: 'business', status: 'draft', site: createProductSiteFixture(), source: { type: 'manual' } });
    const result = await autoFixDraftIssues(d.id, { fixAllSafe: true }, drafts);
    expect(result.ok).toBe(true);
  });
});
