import type { SceneDocument } from './scene-document';

export interface Schema<T> { name: string; parse(value: unknown): T; }
export const sceneDocumentSchema: Schema<SceneDocument> = { name: 'SceneDocument', parse: (value) => value as SceneDocument };
