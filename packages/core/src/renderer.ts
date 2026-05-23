import type {
  BaseSceneNode,
  ButtonNode,
  CollectionNode,
  EmbedNode,
  FormNode,
  FrameNode,
  GroupNode,
  ImageNode,
  ProductBlockNode,
  SceneDocument,
  SceneNode,
  ShapeNode,
  TextNode
} from './index';
import type { SiteDesignSystem } from '../../site-core/src/types';

export type RenderMode = 'preview' | 'public' | 'editor';

export interface RendererContext {
  mode: RenderMode;
  designSystem: SiteDesignSystem;
  warnings: string[];
  warn(message: string): void;
}

export const createRendererContext = (mode: RenderMode, designSystem: SiteDesignSystem): RendererContext => {
  const warnings: string[] = [];
  return {
    mode,
    designSystem,
    warnings,
    warn: (message: string) => {
      warnings.push(message);
    }
  };
};

const escapeHtml = (value: string): string => value
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#39;');

const toPx = (value: number): string => `${value}px`;

export const tokenResolver = {
  color: (context: RendererContext, token: keyof SiteDesignSystem['colors']): string => context.designSystem.colors[token],
  fontFamily: (context: RendererContext): string => context.designSystem.typography.fontFamily,
  fontSize: (context: RendererContext, step = 0): string => {
    const size = context.designSystem.typography.baseSize * (context.designSystem.typography.scale ** step);
    return `${Number(size.toFixed(3))}px`;
  },
  spacing: (context: RendererContext, step: number): string => {
    const multiplier = context.designSystem.spacing.steps[step] ?? context.designSystem.spacing.steps[0] ?? 0;
    return `${context.designSystem.spacing.unit * multiplier}px`;
  }
};

export const styleResolver = {
  baseNodeStyle: (node: BaseSceneNode): string => [
    'position:absolute',
    `left:${toPx(node.x)}`,
    `top:${toPx(node.y)}`,
    `width:${toPx(node.width)}`,
    `height:${toPx(node.height)}`
  ].join(';'),
  frameStyle: (context: RendererContext, node: BaseSceneNode): string => [
    styleResolver.baseNodeStyle(node),
    `background:${tokenResolver.color(context, 'background')}`
  ].join(';'),
  textStyle: (context: RendererContext, node: BaseSceneNode): string => [
    styleResolver.baseNodeStyle(node),
    `color:${tokenResolver.color(context, 'text')}`,
    `font-family:${tokenResolver.fontFamily(context)}`,
    `font-size:${tokenResolver.fontSize(context)}`
  ].join(';')
};

export const renderTextNode = (node: TextNode, context: RendererContext): string =>
  `<p data-node-id="${escapeHtml(node.id)}" style="${styleResolver.textStyle(context, node)}">${escapeHtml(node.text)}</p>`;

export const renderImageNode = (node: ImageNode, context: RendererContext): string =>
  `<img data-node-id="${escapeHtml(node.id)}" style="${styleResolver.baseNodeStyle(node)}" src="${escapeHtml(node.src)}" alt="${escapeHtml(node.alt ?? '')}"/>`;

export const renderShapeNode = (node: ShapeNode, context: RendererContext): string => {
  const borderRadius = node.shape === 'circle' ? '9999px' : `${context.designSystem.radius.sm}px`;
  return `<div data-node-id="${escapeHtml(node.id)}" style="${styleResolver.baseNodeStyle(node)};background:${tokenResolver.color(context, 'primary')};border-radius:${borderRadius}"></div>`;
};

export const renderButtonNode = (node: ButtonNode, context: RendererContext): string =>
  `<a data-node-id="${escapeHtml(node.id)}" style="${styleResolver.baseNodeStyle(node)};display:inline-flex;align-items:center;justify-content:center;padding:${tokenResolver.spacing(context, 1)};background:${tokenResolver.color(context, 'primary')};color:${tokenResolver.color(context, 'background')};font-family:${tokenResolver.fontFamily(context)}" href="${escapeHtml(node.action)}">${escapeHtml(node.label)}</a>`;

const renderChildren = (node: GroupNode | FrameNode, nodesById: Record<string, SceneNode>, context: RendererContext): string =>
  node.children
    .map((childId) => {
      const child = nodesById[childId];
      if (!child) {
        context.warn(`Missing child node \"${childId}\" in \"${node.id}\".`);
        return '';
      }
      return renderSceneNode(child, nodesById, context);
    })
    .join('');

export const renderGroupNode = (node: GroupNode, nodesById: Record<string, SceneNode>, context: RendererContext): string =>
  `<div data-node-id="${escapeHtml(node.id)}" style="${styleResolver.baseNodeStyle(node)}">${renderChildren(node, nodesById, context)}</div>`;

export const renderFrameNode = (node: FrameNode, nodesById: Record<string, SceneNode>, context: RendererContext): string =>
  `<section data-node-id="${escapeHtml(node.id)}" style="${styleResolver.frameStyle(context, node)}">${renderChildren(node, nodesById, context)}</section>`;

export const renderProductBlockNode = (node: ProductBlockNode): string =>
  `<div data-node-id="${escapeHtml(node.id)}" data-placeholder="product-block">Product block placeholder: ${escapeHtml(node.blockId)}</div>`;

export const renderFormNode = (node: FormNode): string =>
  `<div data-node-id="${escapeHtml(node.id)}" data-placeholder="form">Form placeholder (${node.fields.length} fields)</div>`;

export const renderEmbedNode = (node: EmbedNode): string =>
  `<div data-node-id="${escapeHtml(node.id)}" data-placeholder="embed">Embed placeholder: ${escapeHtml(node.provider)} ${escapeHtml(node.embedUrl)}</div>`;

export const renderCollectionNode = (node: CollectionNode): string =>
  `<div data-node-id="${escapeHtml(node.id)}" data-placeholder="collection">Collection placeholder: ${escapeHtml(node.source)}</div>`;

const renderUnknownNode = (node: SceneNode, context: RendererContext): string => {
  context.warn(`Unsupported node type \"${node.type}\" at node \"${node.id}\".`);
  return `<div data-node-id="${escapeHtml(node.id)}" data-unsupported-node="${escapeHtml(node.type)}"></div>`;
};

export const renderSceneNode = (node: SceneNode, nodesById: Record<string, SceneNode>, context: RendererContext): string => {
  switch (node.type) {
    case 'text': return renderTextNode(node, context);
    case 'image': return renderImageNode(node, context);
    case 'shape': return renderShapeNode(node, context);
    case 'button': return renderButtonNode(node, context);
    case 'group': return renderGroupNode(node, nodesById, context);
    case 'frame': return renderFrameNode(node, nodesById, context);
    case 'product-block': return renderProductBlockNode(node);
    case 'form': return renderFormNode(node);
    case 'embed': return renderEmbedNode(node);
    case 'collection': return renderCollectionNode(node);
    default: return renderUnknownNode(node, context);
  }
};

export const renderSceneDocument = (document: SceneDocument, context: RendererContext): string => {
  const pages = document.pages.map((page) => {
    const root = page.nodesById[page.rootNodeId];
    if (!root) {
      context.warn(`Missing root node \"${page.rootNodeId}\" in page \"${page.id}\".`);
      return `<div data-page-id="${escapeHtml(page.id)}"></div>`;
    }
    return `<div data-page-id="${escapeHtml(page.id)}">${renderSceneNode(root, page.nodesById, context)}</div>`;
  }).join('');

  return `<main data-render-mode="${context.mode}">${pages}</main>`;
};
