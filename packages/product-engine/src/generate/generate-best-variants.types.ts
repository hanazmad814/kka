import type { ProductInput } from '../assembly';
import type { DesignGenome } from '../genome';
import type { ProductSite } from '../../../site-core/src';
import type { QualityGateResult, QualityIssue } from '../quality-gate';
import type { DesignScore } from '../scoring';

export interface GenerateBestVariantsOptions {
  minVariants?: number;
  maxVariants?: number;
  beamSize?: number;
  maxCandidates?: number;
  strictQuality?: boolean;
  includeMetrics?: boolean;
}

export interface GeneratedVariant {
  id: string;
  genome: DesignGenome;
  site: ProductSite;
  quality: QualityGateResult;
  score: DesignScore;
  reasons: string[];
  preview?: unknown;
}

export interface GenerationMetrics {
  seed: string;
  candidateCount: number;
  compatibleCandidateCount: number;
  previewCandidateCount: number;
  validCandidateCount: number;
  selectedCount: number;
  elapsedMs: number;
}

export interface GenerateBestVariantsResult {
  ok: boolean;
  variants: GeneratedVariant[];
  issues: QualityIssue[];
  metrics?: GenerationMetrics;
}

export type { ProductInput };
