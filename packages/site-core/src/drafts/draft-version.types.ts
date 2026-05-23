import type { ProductSite } from '../types';
import type { ProductDraft } from './draft.types';
import type { QualityGateResult } from '../../../product-engine/src/quality-gate';

export type DraftVersionSource = 'created' | 'quick_edit' | 'auto_fix' | 'rollback' | 'ai_patch' | 'import' | 'system';

export interface ProductDraftVersion {
  id: string;
  draftId: string;
  versionNumber: number;
  site: ProductSite;
  source: DraftVersionSource;
  summary?: string;
  meta: { createdAt: number; createdBy?: string; draftUpdatedAt: number; rollbackFromVersionId?: string };
  quality?: QualityGateResult;
}

export interface CreateDraftVersionInput {
  draftId: string;
  site: ProductSite;
  source: DraftVersionSource;
  summary?: string;
  rollbackFromVersionId?: string;
  quality?: QualityGateResult;
}

export interface DraftVersionListItem {
  id: string; draftId: string; versionNumber: number; source: DraftVersionSource; summary?: string; createdAt: number; rollbackFromVersionId?: string;
  qualitySummary?: { blockingCount: number; warningCount: number; infoCount: number };
}

export interface RollbackDraftRequest { versionId: string; }
export interface RollbackDraftResponse { ok: true; draft: ProductDraft; rollbackVersion: ProductDraftVersion; }
