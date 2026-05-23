import type { ProductSite } from '../../../site-core/src/types';
import type { QualityGateResult } from './quality-gate.types';
import type { QualityIssuePresentation } from './issue-resolution.types';

export interface AutoFixIssuesRequest { issueIds?: string[]; codes?: string[]; fixAllSafe?: boolean; }

export interface AutoFixSiteResult {
  site: ProductSite;
  fixedIssues: string[];
  remainingQuality: QualityGateResult;
  presentation: QualityIssuePresentation[];
}
