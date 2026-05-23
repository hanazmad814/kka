import { runQualityGate } from '../quality-gate';
import type { ScoreDesignCandidateInput, ScoredDesignCandidate } from './design-score.types';
import { getScoringWeights, normalizeScore } from './scoring-weights';
import { scoreContentFit } from './score-content-fit';
import { scoreReadability } from './score-readability';
import { scoreMobileQuality } from './score-mobile-quality';
import { scoreVisualBalance } from './score-visual-balance';
import { scoreBrandFit } from './score-brand-fit';
import { scoreContrast } from './score-contrast';
import { scoreUniqueness } from './score-uniqueness';
import { scorePerformance } from './score-performance';
import { scoreConversionFit } from './score-conversion-fit';

export const scoreDesignCandidate = (input: ScoreDesignCandidateInput): ScoredDesignCandidate => {
  const quality = input.quality ?? runQualityGate(input.site);
  const ctx = { site: input.site, input: input.input, genome: input.genome, quality, allCandidates: input.allCandidates ?? [] };
  const score = {
    contentFit: scoreContentFit(ctx),
    readability: scoreReadability(ctx),
    mobileQuality: scoreMobileQuality(ctx),
    visualBalance: scoreVisualBalance(ctx),
    brandFit: scoreBrandFit(ctx),
    contrast: scoreContrast(ctx),
    uniqueness: scoreUniqueness(ctx),
    performance: scorePerformance(ctx),
    conversionFit: scoreConversionFit(ctx),
    total: 0
  };
  const w = getScoringWeights(input.input.productType);
  score.total = normalizeScore(
    (score.contentFit * w.contentFit) +
    (score.mobileQuality * w.mobileQuality) +
    (score.readability * w.readability) +
    (score.visualBalance * w.visualBalance) +
    (score.brandFit * w.brandFit) +
    (score.uniqueness * w.uniqueness) +
    (score.performance * w.performance) +
    (score.conversionFit * w.conversionFit)
  );

  const reasons = [
    `contentFit=${score.contentFit.toFixed(2)}`,
    `readability=${score.readability.toFixed(2)}`,
    `mobileQuality=${score.mobileQuality.toFixed(2)}`,
    `conversionFit=${score.conversionFit.toFixed(2)}`
  ];

  return { id: input.genome?.id ?? input.site.id, genome: input.genome, site: input.site, quality, score, reasons };
};
