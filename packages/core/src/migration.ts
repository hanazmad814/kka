import type { SceneDocument } from './scene-document';

export interface SceneMigrationResult {
  migrated: SceneDocument;
  fromVersion: string;
  toVersion: string;
  changed: boolean;
}

export const migrateSceneDocument = (document: SceneDocument, targetVersion: string): SceneMigrationResult => {
  if (document.schemaVersion === targetVersion) {
    return { migrated: document, fromVersion: document.schemaVersion, toVersion: targetVersion, changed: false };
  }
  return {
    migrated: { ...document, schemaVersion: targetVersion },
    fromVersion: document.schemaVersion,
    toVersion: targetVersion,
    changed: true
  };
};
