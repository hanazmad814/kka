import type { ProductSite } from '../../../site-core/src';

export type QualityIssueSeverity = 'blocking' | 'warning' | 'info';

export interface QualityIssue {
  severity: QualityIssueSeverity;
  code: string;
  message: string;
  targetId?: string;
  pageId?: string;
  nodeId?: string;
  autoFixable?: boolean;
  details?: Record<string, unknown>;
}

export interface QualityGateResult {
  ok: boolean;
  issues: QualityIssue[];
  blockingCount: number;
  warningCount: number;
  infoCount: number;
}

export interface QualityGateOptions {
  mode: 'preview' | 'publish';
  strict?: boolean;
  performanceBudget?: {
    maxPages?: number;
    maxNodesPerPage?: number;
    maxAssets?: number;
  };
}

export interface QualityGateContext {
  site: ProductSite;
  options: QualityGateOptions;
}
