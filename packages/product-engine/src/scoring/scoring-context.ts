import type { ProductInput } from '../assembly';
import type { ProductSite } from '../../../site-core/src';
import type { DesignGenome } from '../genome';
import type { QualityGateResult } from '../quality-gate';

export interface ScoringContext {
  site: ProductSite;
  input: ProductInput;
  genome?: DesignGenome;
  quality: QualityGateResult;
  allCandidates: Array<{ genome?: DesignGenome; site: ProductSite }>;
}
