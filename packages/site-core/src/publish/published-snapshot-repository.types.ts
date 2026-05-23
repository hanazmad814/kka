import type { PublishedSiteSnapshot } from './published-site-snapshot.types';

export type CreatePublishedSnapshotInput = Omit<PublishedSiteSnapshot, 'id'>;

export interface PublishedSnapshotRepository {
  createSnapshot(input: CreatePublishedSnapshotInput): Promise<PublishedSiteSnapshot>;
  getSnapshotById(id: string): Promise<PublishedSiteSnapshot | null>;
  getLatestSnapshotForDraft(draftId: string): Promise<PublishedSiteSnapshot | null>;
  listSnapshotsForDraft(draftId: string): Promise<PublishedSiteSnapshot[]>;
}
