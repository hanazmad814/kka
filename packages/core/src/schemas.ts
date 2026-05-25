import type { SceneDocument } from './scene-document';
import { validateSceneDocument } from './scene-document';

export interface Schema<T> {
  name: string;
  parse(value: unknown): T;
}

export const sceneDocumentSchema: Schema<SceneDocument> = {
  name: 'SceneDocument',
  parse: (value) => {
    const doc = value as SceneDocument;
    const result = validateSceneDocument(doc);
    if (!result.valid) {
      throw new Error(`Invalid SceneDocument: ${result.issues[0]?.code ?? 'UNKNOWN'}`);
    }
    return doc;
  }
};
