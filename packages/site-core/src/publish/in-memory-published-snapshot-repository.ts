import type { CreatePublishedSnapshotInput, PublishedSnapshotRepository } from './published-snapshot-repository.types';
import type { PublishedSiteSnapshot } from './published-site-snapshot.types';

export class InMemoryPublishedSnapshotRepository implements PublishedSnapshotRepository {
  private readonly items = new Map<string, PublishedSiteSnapshot>();

  async createSnapshot(input: CreatePublishedSnapshotInput): Promise<PublishedSiteSnapshot> {
    const id = `snapshot-${crypto.randomUUID()}`;
    const snapshot: PublishedSiteSnapshot = { ...structuredClone(input), id };
    this.items.set(id, snapshot);
    return structuredClone(snapshot);
  }

  async getSnapshotById(id: string): Promise<PublishedSiteSnapshot | null> {
    const found = this.items.get(id);
    return found ? structuredClone(found) : null;
  }

  async getLatestSnapshotForDraft(draftId: string): Promise<PublishedSiteSnapshot | null> {
    const rows = Array.from(this.items.values()).filter((x) => x.draftId === draftId).sort((a, b) => b.version - a.version);
    return rows[0] ? structuredClone(rows[0]) : null;
  }

  async listSnapshotsForDraft(draftId: string): Promise<PublishedSiteSnapshot[]> {
    return Array.from(this.items.values()).filter((x) => x.draftId === draftId).map((x) => structuredClone(x));
  }
}

const globalKey = '__in_memory_published_snapshot_repository__';
const g = globalThis as unknown as Record<string, InMemoryPublishedSnapshotRepository | undefined>;
export const publishedSnapshotRepositorySingleton = g[globalKey] ?? (g[globalKey] = new InMemoryPublishedSnapshotRepository());
