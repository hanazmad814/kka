export function VariantPageList({ pages }: { pages: Array<{ id: string; title: string }> }) {
  return <ul>{pages.map((p) => <li key={p.id}>{p.title}</li>)}</ul>;
}
