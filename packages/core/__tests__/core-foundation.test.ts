import { describe, expect, it } from 'vitest';
import {
  createDeterministicId,
  createPrefixedId,
  createSceneDocumentFixture,
  migrateSceneDocument,
  sceneDocumentSchema,
  validateSceneAsset,
  validateSceneDocument,
  validateSceneNode
} from '../src/index';

describe('core foundation', () => {
  it('valid SceneDocument passes', () => {
    const doc = createSceneDocumentFixture();
    expect(validateSceneDocument(doc).valid).toBe(true);
    expect(sceneDocumentSchema.parse(doc)).toEqual(doc);
  });

  it('invalid SceneNode fails', () => {
    const result = validateSceneNode({ id: '', type: 'text', x: Number.NaN, y: 0, width: 10, height: 10, text: 'x' });
    expect(result.valid).toBe(false);
  });

  it('invalid asset is rejected', () => {
    const result = validateSceneAsset({ id: '', type: 'image', url: '', mimeType: '' });
    expect(result.valid).toBe(false);
  });

  it('supports deterministic/prefixed ids and migration', () => {
    const id1 = createDeterministicId('scene', 'hero-banner');
    const id2 = createDeterministicId('scene', 'hero-banner');
    expect(id1).toBe(id2);
    expect(createPrefixedId('Draft', 'Home Page')).toBe('draft_home-page');

    const doc = createSceneDocumentFixture();
    const migrated = migrateSceneDocument(doc, '2.0.0');
    expect(migrated.changed).toBe(true);
    expect(migrated.migrated.schemaVersion).toBe('2.0.0');
  });
});
