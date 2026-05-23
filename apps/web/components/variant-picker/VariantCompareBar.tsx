export function VariantCompareBar({ total, mobile, content }: { total?: number; mobile?: number; content?: number }) {
  return <p>Total {total?.toFixed(2) ?? 'n/a'} · Mobile {mobile?.toFixed(2) ?? 'n/a'} · Content {content?.toFixed(2) ?? 'n/a'}</p>;
}
