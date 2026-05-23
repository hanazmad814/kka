import type { CreateProductDraftInput, ProductDraft, UpdateProductDraftInput } from '../drafts';

export interface DraftRepository {
  createDraft(input: CreateProductDraftInput): Promise<ProductDraft>;
  getDraftById(id: string): Promise<ProductDraft | null>;
  updateDraft(id: string, patch: UpdateProductDraftInput): Promise<ProductDraft>;
  deleteDraft?(id: string): Promise<void>;
}
