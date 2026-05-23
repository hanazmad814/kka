import type { ProductType } from '../../../core/src';
import type { ProductSite } from '../types';
import type { DesignGenome } from '../../../product-engine/src/genome';
import type { DesignScore } from '../../../product-engine/src/scoring';
import type { QualityGateResult } from '../../../product-engine/src/quality-gate';

export type DraftStatus = 'draft' | 'archived';

export interface ProductDraft {
  id: string;
  siteId: string;
  productType: ProductType;
  status: DraftStatus;
  site: ProductSite;
  source: {
    type: 'generated_variant' | 'manual' | 'imported';
    variantId?: string;
    genome?: DesignGenome;
    score?: DesignScore;
    quality?: QualityGateResult;
    inputSummary?: Record<string, unknown>;
  };
  meta: {
    createdAt: number;
    updatedAt: number;
    selectedAt?: number;
  };
}

export interface CreateProductDraftInput extends Omit<ProductDraft, 'id' | 'meta'> {}
export type UpdateProductDraftInput = Partial<Omit<ProductDraft, 'id' | 'meta'>>;

export interface SelectVariantRequest {
  variantId: string;
  site: ProductSite;
  genome?: DesignGenome;
  score?: DesignScore;
  quality?: QualityGateResult;
  inputSummary?: Record<string, unknown>;
}

export interface SelectVariantResponse {
  ok: true;
  draft: { id: string; productType: ProductType; status: DraftStatus; createdAt: number; updatedAt: number };
  redirectTo: string;
}

export interface SelectVariantErrorResponse {
  ok: false;
  error: { code: string; message: string };
}
