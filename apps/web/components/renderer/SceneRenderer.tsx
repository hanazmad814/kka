import type { SceneDocument } from '../../../../packages/core/src';
import { SceneNodeRenderer } from './SceneNodeRenderer';

export function SceneRenderer({ document }: { document: SceneDocument }) {
  return (
    <div className="space-y-6">
      {document.pages.map((page) => {
        const root = page.nodesById[page.rootNodeId];
        return (
          <section key={page.id} className="relative min-h-[200px] rounded border border-slate-200" data-page-id={page.id}>
            {root ? <SceneNodeRenderer node={root} nodesById={page.nodesById} /> : <div>Missing root node</div>}
          </section>
        );
      })}
    </div>
  );
}
