export function VariantReasons({ reasons }: { reasons?: string[] }) {
  if (!reasons || reasons.length === 0) return <p>No detailed reasons available.</p>;
  return <ul>{reasons.slice(0, 3).map((r) => <li key={r}>{r}</li>)}</ul>;
}
