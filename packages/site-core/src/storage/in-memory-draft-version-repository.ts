import type { DraftVersionRepository } from './draft-version-repository.types';
import type { CreateDraftVersionInput, DraftVersionListItem, ProductDraftVersion } from '../drafts';

export class InMemoryDraftVersionRepository implements DraftVersionRepository {
  private readonly items = new Map<string, ProductDraftVersion[]>();

  async createVersion(input: CreateDraftVersionInput): Promise<ProductDraftVersion> {
    const list = this.items.get(input.draftId) ?? [];
    const nextNumber = list.length + 1;
    const now = Date.now();
    const version: ProductDraftVersion = {
      id: `ver-${crypto.randomUUID()}`,
      draftId: input.draftId,
      versionNumber: nextNumber,
      site: structuredClone(input.site),
      source: input.source,
      summary: input.summary,
      meta: { createdAt: now, draftUpdatedAt: now, rollbackFromVersionId: input.rollbackFromVersionId },
      quality: input.quality
    };
    this.items.set(input.draftId, [...list, version]);
    return structuredClone(version);
  }

  async listVersions(draftId: string): Promise<DraftVersionListItem[]> {
    const list = this.items.get(draftId) ?? [];
    return list.map((v) => ({
      id: v.id, draftId: v.draftId, versionNumber: v.versionNumber, source: v.source, summary: v.summary,
      createdAt: v.meta.createdAt, rollbackFromVersionId: v.meta.rollbackFromVersionId,
      qualitySummary: v.quality ? { blockingCount: v.quality.blockingCount, warningCount: v.quality.warningCount, infoCount: v.quality.infoCount } : undefined
    }));
  }

  async getVersionById(draftId: string, versionId: string): Promise<ProductDraftVersion | null> {
    const list = this.items.get(draftId) ?? [];
    const found = list.find((v) => v.id === versionId);
    return found ? structuredClone(found) : null;
  }

  async getLatestVersion(draftId: string): Promise<ProductDraftVersion | null> {
    const list = this.items.get(draftId) ?? [];
    const found = list[list.length - 1];
    return found ? structuredClone(found) : null;
  }
}

const globalKey = '__in_memory_draft_version_repository__';
const g = globalThis as unknown as Record<string, InMemoryDraftVersionRepository | undefined>;
export const draftVersionRepositorySingleton = g[globalKey] ?? (g[globalKey] = new InMemoryDraftVersionRepository());
