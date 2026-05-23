'use client';
import type { QualityIssuePresentation } from '../../../../packages/product-engine/src/quality-gate';

export function QualityIssueItem({ issue, onAutoFix, onGoToFix }: { issue: QualityIssuePresentation; onAutoFix: (issueId: string) => void; onGoToFix: (panel: string) => void }) {
  return <li>
    <strong>[{issue.severity}] {issue.title}</strong>
    <p>{issue.message}</p>
    {issue.goToFix && <button onClick={() => onGoToFix(issue.goToFix?.panel ?? 'unknown')}>Go to fix</button>}
    {issue.autoFixable && <button onClick={() => onAutoFix(issue.id)}>Auto Fix</button>}
  </li>;
}
