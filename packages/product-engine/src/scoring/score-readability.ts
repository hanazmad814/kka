import { normalizeScore } from './scoring-weights';
import type { ScoringContext } from './scoring-context';

export const scoreReadability = (ctx: ScoringContext): number => {
  const penalties = ctx.quality.issues.filter((i) => i.code.includes('TEXT_OVERFLOW') || i.code.includes('SEO_')).length;
  return normalizeScore(1 - (penalties * 0.15));
};
