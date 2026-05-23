import type { CreateProductDraftInput, ProductDraft, UpdateProductDraftInput } from '../drafts';
import type { DraftRepository } from './draft-repository.types';

export class InMemoryDraftRepository implements DraftRepository {
  private readonly items = new Map<string, ProductDraft>();

  async createDraft(input: CreateProductDraftInput): Promise<ProductDraft> {
    const now = Date.now();
    const id = `draft-${crypto.randomUUID()}`;
    const draft: ProductDraft = { ...input, id, meta: { createdAt: now, updatedAt: now, selectedAt: now } };
    this.items.set(id, draft);
    return structuredClone(draft);
  }

  async getDraftById(id: string): Promise<ProductDraft | null> {
    const item = this.items.get(id);
    return item ? structuredClone(item) : null;
  }

  async updateDraft(id: string, patch: UpdateProductDraftInput): Promise<ProductDraft> {
    const existing = this.items.get(id);
    if (!existing) throw new Error('draft_not_found');
    const updated: ProductDraft = { ...existing, ...patch, meta: { ...existing.meta, updatedAt: Date.now() } };
    this.items.set(id, updated);
    return structuredClone(updated);
  }
}

const globalKey = '__in_memory_draft_repository__';
const g = globalThis as unknown as Record<string, InMemoryDraftRepository | undefined>;
export const draftRepositorySingleton = g[globalKey] ?? (g[globalKey] = new InMemoryDraftRepository());
