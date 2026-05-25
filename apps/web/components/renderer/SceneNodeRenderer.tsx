import type { CSSProperties } from 'react';
import type { SceneNode } from '../../../../packages/core/src';

type Props = { node: SceneNode; nodesById: Record<string, SceneNode> };

export function SceneNodeRenderer({ node, nodesById }: Props) {
  const style: CSSProperties = { position: 'absolute', left: node.x, top: node.y, width: node.width, height: node.height };
  switch (node.type) {
    case 'text': return <p style={style}>{node.text}</p>;
    case 'image': return <img style={style} src={node.src} alt={node.alt ?? ''} />;
    case 'button': return <a style={style} href={node.action}>{node.label}</a>;
    case 'group':
    case 'frame':
      return <div style={style}>{node.children.map((id) => nodesById[id] ? <SceneNodeRenderer key={id} node={nodesById[id]} nodesById={nodesById} /> : null)}</div>;
    default:
      return <div style={style} data-unsupported-node={node.type} />;
  }
}
