'use client';
import type { QualityIssuePresentation } from '../../../../packages/product-engine/src/quality-gate';
import { QualityIssueItem } from './QualityIssueItem';

export function QualityIssueList({ issues, onAutoFix, onGoToFix }: { issues: QualityIssuePresentation[]; onAutoFix: (issueId: string) => void; onGoToFix: (panel: string) => void }) {
  return <ul>{issues.map((issue) => <QualityIssueItem key={issue.id} issue={issue} onAutoFix={onAutoFix} onGoToFix={onGoToFix} />)}</ul>;
}
