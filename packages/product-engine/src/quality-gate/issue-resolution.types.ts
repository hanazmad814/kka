import type { QualityIssue, QualityIssueSeverity } from './quality-gate.types';

export interface QualityIssuePresentation {
  id: string;
  severity: QualityIssueSeverity;
  code: string;
  title: string;
  message: string;
  pageId?: string;
  nodeId?: string;
  fieldPath?: string;
  autoFixable: boolean;
  fixLabel?: string;
  goToFix?: {
    panel: 'brand' | 'contact' | 'menu' | 'style' | 'pages' | 'seo' | 'unknown';
    fieldPath?: string;
    pageId?: string;
    nodeId?: string;
  };
}

export interface IssueResolutionContext { issue: QualityIssue; }
