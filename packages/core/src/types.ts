export type ProductType = 'restaurant' | 'business' | 'wedding' | (string & {});

export interface ProductDataModel {
  id: string;
  schemaVersion: string;
  productType?: ProductType;
  fields: Record<string, unknown>;
}

export interface SeededRandom {
  readonly seed: string;
  next(): number;
  nextInt(maxExclusive: number): number;
}

export type { ValidationIssue, ValidationResult } from './validation';
export type {
  BaseSceneNode, TextNode, ImageNode, ShapeNode, ButtonNode, GroupNode, FrameNode,
  ProductBlockNode, FormNode, EmbedNode, CollectionNode, IconNode, VideoNode, AudioNode, SceneNode
} from './scene-node';
export type { SceneAsset, ScenePage, SceneDocument } from './scene-document';

import type { SceneDocument } from './scene-document';
export interface PublishedSiteSnapshot {
  id: string;
  createdAtIso: string;
  productType: ProductType;
  scene: SceneDocument;
  data: ProductDataModel;
}
