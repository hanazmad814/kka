import type { ProductSite } from '../../../../packages/site-core/src';
import { SceneRenderer } from './SceneRenderer';

export function SiteRenderer({ site }: { site: ProductSite }) {
  return (
    <div className="space-y-8" data-site-id={site.id}>
      {site.siteMap.pages.map((page) => {
        const doc = site.pages[page.id];
        if (!doc) return <section key={page.id}>Missing page: {page.id}</section>;
        return (
          <section key={page.id}>
            <h3 className="mb-2 text-sm font-semibold">{page.title}</h3>
            <SceneRenderer document={doc} />
          </section>
        );
      })}
    </div>
  );
}
