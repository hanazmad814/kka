import type { OutcomeFirstPipelineState, ProductCategory, PublishedSiteSnapshot } from '../../core/src/index';
import type { SiteRecipe } from './recipes';
import type { DesignGenome, SeededRandom } from './genome';

export interface BeamSearch {
  run(seed: SeededRandom, width: number): DesignGenome[];
}

export interface QualityGate {
  approve(snapshot: PublishedSiteSnapshot): { pass: boolean; reasons: string[]; score: number };
}

export interface DesignScoring {
  score(genome: DesignGenome): number;
}

export interface AssemblyEngine {
  assemble(input: { genome: DesignGenome; recipe: SiteRecipe; seed: SeededRandom }): PublishedSiteSnapshot;
}

export interface GenerationRequest {
  draftId: string;
  productCategory: ProductCategory;
  productType: string;
  requestedVariants: number;
  inputData: Record<string, unknown>;
}

export interface GeneratedVariant {
  variantId: string;
  genome: DesignGenome;
  score: number;
  snapshot: PublishedSiteSnapshot;
}

export interface ProductGenerationService {
  generate(request: GenerationRequest): Promise<GeneratedVariant[]>;
  promoteVariant(draftId: string, variantId: string): Promise<OutcomeFirstPipelineState>;
}
