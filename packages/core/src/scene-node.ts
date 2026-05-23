import { createValidationIssue, type ValidationResult, validResult } from './validation';

export interface BaseSceneNode {
  id: string;
  type: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface TextNode extends BaseSceneNode { type: 'text'; text: string; }
export interface ImageNode extends BaseSceneNode { type: 'image'; src: string; alt?: string; }
export interface ShapeNode extends BaseSceneNode { type: 'shape'; shape: 'rectangle' | 'circle'; }
export interface ButtonNode extends BaseSceneNode { type: 'button'; label: string; action: string; }
export interface GroupNode extends BaseSceneNode { type: 'group'; children: string[]; }
export interface FrameNode extends BaseSceneNode { type: 'frame'; children: string[]; }
export interface ProductBlockNode extends BaseSceneNode { type: 'product-block'; blockId: string; }
export interface FormNode extends BaseSceneNode { type: 'form'; fields: string[]; }
export interface EmbedNode extends BaseSceneNode { type: 'embed'; provider: string; embedUrl: string; }
export interface CollectionNode extends BaseSceneNode { type: 'collection'; source: string; }
export interface IconNode extends BaseSceneNode { type: 'icon'; icon: string; }
export interface VideoNode extends BaseSceneNode { type: 'video'; src: string; }
export interface AudioNode extends BaseSceneNode { type: 'audio'; src: string; }

export type SceneNode = TextNode | ImageNode | ShapeNode | ButtonNode | GroupNode | FrameNode | ProductBlockNode | FormNode | EmbedNode | CollectionNode | IconNode | VideoNode | AudioNode;

export const validateSceneNode = (node: SceneNode): ValidationResult => {
  const issues = [] as ReturnType<typeof createValidationIssue>[];
  if (!node.id) issues.push(createValidationIssue({ code: 'NODE_ID_REQUIRED', message: 'SceneNode id is required.', path: 'id', severity: 'error' }));
  if (!node.type) issues.push(createValidationIssue({ code: 'NODE_TYPE_REQUIRED', message: 'SceneNode type is required.', path: 'type', severity: 'error' }));
  for (const key of ['x', 'y', 'width', 'height'] as const) {
    if (!Number.isFinite(node[key])) {
      issues.push(createValidationIssue({ code: 'NODE_BOUNDS_INVALID', message: `SceneNode ${key} must be finite number.`, path: key, severity: 'error' }));
    }
  }
  if ((node.type === 'group' || node.type === 'frame') && node.children.length === 0) {
    issues.push(createValidationIssue({ code: 'NODE_CHILDREN_EMPTY', message: `${node.type} node should have children.`, path: 'children', severity: 'warning' }));
  }
  return issues.length === 0 ? validResult() : { valid: false, issues };
};
