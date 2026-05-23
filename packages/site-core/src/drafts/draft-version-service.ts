import { validateProductSite } from '../validators';
import { runQualityGate } from '../../../product-engine/src/quality-gate';
import type { ProductDraft } from './draft.types';
import type { CreateDraftVersionInput, DraftVersionListItem, DraftVersionSource, ProductDraftVersion } from './draft-version.types';
import type { DraftVersionRepository } from '../storage/draft-version-repository.types';
import type { DraftRepository } from '../storage/draft-repository.types';

export class DraftVersionService {
  constructor(private versions: DraftVersionRepository, private drafts: DraftRepository) {}

  async createInitialVersionForDraft(draft: ProductDraft): Promise<ProductDraftVersion> {
    return this.versions.createVersion({ draftId: draft.id, site: draft.site, source: 'created', summary: 'Initial generated version', quality: draft.source.quality });
  }
  async createVersionForDraftUpdate(input: { draftAfter: ProductDraft; source: DraftVersionSource; summary?: string }): Promise<ProductDraftVersion> {
    return this.versions.createVersion({ draftId: input.draftAfter.id, site: input.draftAfter.site, source: input.source, summary: input.summary, quality: input.draftAfter.source.quality });
  }
  listDraftVersions(draftId: string): Promise<DraftVersionListItem[]> { return this.versions.listVersions(draftId); }
  getDraftVersion(draftId: string, versionId: string): Promise<ProductDraftVersion | null> { return this.versions.getVersionById(draftId, versionId); }

  async rollbackDraftToVersion(input: { draftId: string; versionId: string }): Promise<{ draft: ProductDraft; rollbackVersion: ProductDraftVersion }> {
    const draft = await this.drafts.getDraftById(input.draftId); if (!draft) throw new Error('draft_not_found');
    const target = await this.versions.getVersionById(input.draftId, input.versionId); if (!target) throw new Error('version_not_found');
    const site = structuredClone(target.site);
    const valid = validateProductSite(site); if (!valid.valid) throw new Error('invalid_version_site');
    const quality = runQualityGate(site, { mode: 'preview' }); if (quality.blockingCount > 0) throw new Error('blocking_quality_issues');
    const updated = await this.drafts.updateDraft(draft.id, { site, source: { ...draft.source, quality } });
    const rollbackVersion = await this.versions.createVersion({ draftId: updated.id, site: updated.site, source: 'rollback', summary: `Rolled back to version ${target.versionNumber}`, rollbackFromVersionId: target.id, quality });
    return { draft: updated, rollbackVersion };
  }
}
