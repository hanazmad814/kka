'use client';
import type { QualityGateResult } from '../../../../packages/product-engine/src/quality-gate';

export function QualitySummaryCard({ result }: { result: QualityGateResult | null }) {
  if (!result) return <p>No quality check yet.</p>;
  return <div>
    <p>{result.blockingCount === 0 ? 'Ready to publish' : 'Fix blockers before publish'}</p>
    <p>Blocking: {result.blockingCount} | Warnings: {result.warningCount} | Info: {result.infoCount}</p>
  </div>;
}
