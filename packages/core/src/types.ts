export type ProductCategory =
  | 'wedding-invitation'
  | 'business-showcase'
  | 'restaurant-food'
  | 'ecommerce-catalog'
  | 'event-campaign'
  | 'marketing-conversion'
  | 'social-creator'
  | 'forms-utility'
  | 'print-digital-design';

export type ProductType =
  | 'restaurant'
  | 'business'
  | 'wedding'
  | 'event'
  | 'ecommerce'
  | 'marketing'
  | 'creator'
  | 'forms'
  | 'print'
  | (string & {});

export interface ProductDataModel {
  id: string;
  schemaVersion: string;
  productType?: ProductType;
  productCategory?: ProductCategory;
  fields: Record<string, unknown>;
}

export interface SeededRandom {
  readonly seed: string;
  next(): number;
  nextInt(maxExclusive: number): number;
}

export type GenerationPipelineStep =
  | 'INPUT_DATA'
  | 'GENERATE_VARIANTS'
  | 'SELECT_BEST_DESIGN'
  | 'QUICK_EDIT'
  | 'QUALITY_CHECK'
  | 'PUBLISH';

export interface OutcomeFirstPipelineState {
  draftId: string;
  steps: GenerationPipelineStep[];
  currentStep: GenerationPipelineStep;
  qualityScore?: number;
  publishReady: boolean;
}

export type { ValidationIssue, ValidationResult } from './validation';
export type {
  BaseSceneNode,
  TextNode,
  ImageNode,
  ShapeNode,
  ButtonNode,
  GroupNode,
  FrameNode,
  ProductBlockNode,
  FormNode,
  EmbedNode,
  CollectionNode,
  IconNode,
  VideoNode,
  AudioNode,
  SceneNode
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
