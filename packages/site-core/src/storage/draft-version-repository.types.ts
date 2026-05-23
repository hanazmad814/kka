import type { CreateDraftVersionInput, DraftVersionListItem, ProductDraftVersion } from '../drafts';

export interface DraftVersionRepository {
  createVersion(input: CreateDraftVersionInput): Promise<ProductDraftVersion>;
  listVersions(draftId: string): Promise<DraftVersionListItem[]>;
  getVersionById(draftId: string, versionId: string): Promise<ProductDraftVersion | null>;
  getLatestVersion(draftId: string): Promise<ProductDraftVersion | null>;
}
