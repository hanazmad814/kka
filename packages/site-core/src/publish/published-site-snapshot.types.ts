import type { ProductType } from '../../../core/src';
import type { ProductSite } from '../types';
import type { QualityGateResult, QualityIssue } from '../../../product-engine/src/quality-gate';
import type { PublishedAsset, PublishedRoute } from './published-route.types';

export interface PublishedSiteSnapshot {
  id: string;
  siteId: string;
  draftId: string;
  productType: ProductType;
  version: number;
  site: ProductSite;
  routes: PublishedRoute[];
  assets: PublishedAsset[];
  quality: QualityGateResult;
  meta: {
    createdAt: number;
    publishedAt: number;
    sourceDraftUpdatedAt: number;
  };
}

export interface PublishDraftResponse {
  ok: true;
  snapshot: { id: string; draftId: string; version: number; publicUrl: string; publishedAt: number };
}

export interface PublishDraftErrorResponse {
  ok: false;
  error: { code: string; message: string; issues?: QualityIssue[] };
}
