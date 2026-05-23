import { describe, expect, it } from 'vitest';
import { createSceneDocumentFixture, validateSceneDocument, validateSceneNode } from '../src/index';

describe('core foundation', () => {
  it('valid SceneDocument passes', () => {
    const doc = createSceneDocumentFixture();
    expect(validateSceneDocument(doc).valid).toBe(true);
  });

  it('invalid SceneNode fails', () => {
    const result = validateSceneNode({ id: '', type: 'text', x: Number.NaN, y: 0, width: 10, height: 10, text: 'x' });
    expect(result.valid).toBe(false);
  });
});
