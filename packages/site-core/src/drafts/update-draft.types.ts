import type { ProductDraft } from './draft.types';

export interface UpdateDraftRequest {
  dataPatch?: Record<string, unknown>;
  stylePresetId?: string;
}

export interface UpdateDraftResponse { ok: true; draft: ProductDraft; }
export interface UpdateDraftErrorResponse { ok: false; error: { code: string; message: string } }
