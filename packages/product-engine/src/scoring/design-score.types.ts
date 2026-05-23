import type { ProductSite } from '../../../site-core/src';
import type { ProductInput } from '../assembly';
import type { DesignGenome } from '../genome';
import type { QualityGateResult } from '../quality-gate';

export interface DesignScore {
  contentFit: number;
  readability: number;
  mobileQuality: number;
  visualBalance: number;
  brandFit: number;
  contrast: number;
  uniqueness: number;
  performance: number;
  conversionFit: number;
  total: number;
}

export interface ScoredDesignCandidate<T = ProductSite> {
  id: string;
  genome?: DesignGenome;
  site: T;
  quality: QualityGateResult;
  score: DesignScore;
  reasons: string[];
}

export interface ScoreDesignCandidateInput {
  site: ProductSite;
  input: ProductInput;
  genome?: DesignGenome;
  quality?: QualityGateResult;
  allCandidates?: Array<{ genome?: DesignGenome; site: ProductSite }>;
}

export interface TopKOptions {
  min?: number;
  max?: number;
  enforceDiversity?: boolean;
}
