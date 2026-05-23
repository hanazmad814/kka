export function VariantQualitySummary({ blocking = 0, warning = 0, info = 0 }: { blocking?: number; warning?: number; info?: number }) {
  return <p>Quality b:{blocking} w:{warning} i:{info}</p>;
}
