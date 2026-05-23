import type { ProductDraft } from './draft.types';
import type { QualityGateResult } from '../../../product-engine/src/quality-gate';
import type { QualityIssuePresentation } from '../../../product-engine/src/quality-gate';

export interface DraftQualityCheckResponse {
  ok: true;
  draftId: string;
  checkedAt: number;
  result: QualityGateResult;
  presentation: QualityIssuePresentation[];
}

export interface DraftQualityCheckErrorResponse {
  ok: false;
  error: { code: string; message: string };
}

export interface AutoFixIssuesResponse {
  ok: true;
  draft: ProductDraft;
  fixedIssues: string[];
  remainingQuality: QualityGateResult;
  presentation: QualityIssuePresentation[];
}
