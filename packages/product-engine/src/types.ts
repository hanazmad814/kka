import type { PublishedSiteSnapshot } from '../../core/src/index';
import type { SiteRecipe } from './recipes';
import type { DesignGenome, SeededRandom } from './genome';

export interface BeamSearch {
  run(seed: SeededRandom, width: number): DesignGenome[];
}

export interface QualityGate {
  approve(snapshot: PublishedSiteSnapshot): { pass: boolean; reasons: string[] };
}

export interface DesignScoring {
  score(genome: DesignGenome): number;
}

export interface AssemblyEngine {
  assemble(input: { genome: DesignGenome; recipe: SiteRecipe; seed: SeededRandom }): PublishedSiteSnapshot;
}
