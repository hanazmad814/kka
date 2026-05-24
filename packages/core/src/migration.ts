import type { SceneDocument } from './scene-document';

export interface SceneMigrationResult {
  migrated: SceneDocument;
  fromVersion: string;
  toVersion: string;
  changed: boolean;
}

export interface SceneDocumentRepository {
  getById(id: string): Promise<SceneDocument | null>;
  save(document: SceneDocument): Promise<SceneDocument>;
}

export const migrateSceneDocument = (document: SceneDocument, targetVersion: string): SceneMigrationResult => {
  if (document.schemaVersion === targetVersion) {
    return { migrated: document, fromVersion: document.schemaVersion, toVersion: targetVersion, changed: false };
  }
  return {
    migrated: { ...document, schemaVersion: targetVersion, metadata: { ...document.metadata, updatedAtIso: new Date().toISOString() } },
    fromVersion: document.schemaVersion,
    toVersion: targetVersion,
    changed: true
  };
};

export const migrateAndSaveSceneDocument = async (
  repository: SceneDocumentRepository,
  documentId: string,
  targetVersion: string
): Promise<SceneMigrationResult> => {
  const existing = await repository.getById(documentId);
  if (!existing) throw new Error(`SceneDocument not found: ${documentId}`);
  const result = migrateSceneDocument(existing, targetVersion);
  if (result.changed) {
    await repository.save(result.migrated);
  }
  return result;
};
