import { describe, expect, it } from 'vitest';
import { createSceneDocumentFixture } from '../src/scene-document';
import { createDefaultDesignSystemFixture } from '../../site-core/src/fixtures';
import { createRendererContext, renderSceneDocument, renderSceneNode, tokenResolver } from '../src/renderer';

describe('core renderer foundation', () => {
  it('render valid SceneDocument fixture', () => {
    const context = createRendererContext('preview', createDefaultDesignSystemFixture());
    const html = renderSceneDocument(createSceneDocumentFixture(), context);
    expect(html).toContain('data-page-id="home"');
  });

  it('TextNode displays text', () => {
    const context = createRendererContext('preview', createDefaultDesignSystemFixture());
    const doc = createSceneDocumentFixture();
    const html = renderSceneDocument(doc, context);
    expect(html).toContain('Hello');
  });

  it('ImageNode displays img alt/src', () => {
    const context = createRendererContext('preview', createDefaultDesignSystemFixture());
    const node = { id: 'img-1', type: 'image', x: 0, y: 0, width: 10, height: 10, src: '/a.png', alt: 'A' } as const;
    const html = renderSceneNode(node, { 'img-1': node }, context);
    expect(html).toContain('src="/a.png"');
    expect(html).toContain('alt="A"');
  });

  it('ButtonNode displays label/link', () => {
    const context = createRendererContext('preview', createDefaultDesignSystemFixture());
    const node = { id: 'btn-1', type: 'button', x: 0, y: 0, width: 10, height: 10, label: 'Buy', action: '/buy' } as const;
    const html = renderSceneNode(node, { 'btn-1': node }, context);
    expect(html).toContain('Buy');
    expect(html).toContain('href="/buy"');
  });

  it('GroupNode renders children recursively', () => {
    const context = createRendererContext('preview', createDefaultDesignSystemFixture());
    const nodesById = {
      group: { id: 'group', type: 'group', x: 0, y: 0, width: 10, height: 10, children: ['child'] },
      child: { id: 'child', type: 'text', x: 1, y: 1, width: 10, height: 10, text: 'Nested' }
    } as const;
    const html = renderSceneNode(nodesById.group, nodesById, context);
    expect(html).toContain('Nested');
  });

  it('FrameNode renders children recursively', () => {
    const context = createRendererContext('preview', createDefaultDesignSystemFixture());
    const nodesById = {
      frame: { id: 'frame', type: 'frame', x: 0, y: 0, width: 10, height: 10, children: ['child'] },
      child: { id: 'child', type: 'text', x: 1, y: 1, width: 10, height: 10, text: 'Nested frame' }
    } as const;
    const html = renderSceneNode(nodesById.frame, nodesById, context);
    expect(html).toContain('Nested frame');
  });

  it('Unknown node fallback does not crash', () => {
    const context = createRendererContext('preview', createDefaultDesignSystemFixture());
    const unknown = { id: 'u1', type: 'unknown', x: 0, y: 0, width: 1, height: 1 } as never;
    const html = renderSceneNode(unknown, { u1: unknown }, context);
    expect(html).toContain('data-unsupported-node="unknown"');
    expect(context.warnings.length).toBe(1);
  });


  it('invalid children id is skipped and warning recorded', () => {
    const context = createRendererContext('preview', createDefaultDesignSystemFixture());
    const nodesById = {
      frame: { id: 'frame', type: 'frame', x: 0, y: 0, width: 10, height: 10, children: ['missing'] }
    } as const;
    const html = renderSceneNode(nodesById.frame, nodesById as never, context);
    expect(html).toContain('data-node-id="frame"');
    expect(context.warnings[0]).toContain('Missing child node');
  });
  it('tokenResolver resolves color/font/spacing tokens', () => {
    const context = createRendererContext('preview', createDefaultDesignSystemFixture());
    expect(tokenResolver.color(context, 'primary')).toBe('#111111');
    expect(tokenResolver.fontFamily(context)).toBe('Inter');
    expect(tokenResolver.spacing(context, 1)).toBe('8px');
  });
});
