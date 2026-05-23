import type { QualityIssuePresentation } from './issue-resolution.types';

export type IssueFilter = 'all' | 'blocking' | 'warning' | 'info' | 'autofixable';

export function filterIssues(issues: QualityIssuePresentation[], filter: IssueFilter): QualityIssuePresentation[] {
  if (filter === 'all') return issues;
  if (filter === 'autofixable') return issues.filter((x) => x.autoFixable);
  return issues.filter((x) => x.severity === filter);
}
