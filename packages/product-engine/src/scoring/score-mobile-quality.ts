import { normalizeScore } from './scoring-weights';
import type { ScoringContext } from './scoring-context';

export const scoreMobileQuality = (ctx: ScoringContext): number => {
  const penalties = ctx.quality.issues.filter((i) => i.code.includes('MOBILE_')).length;
  return normalizeScore(1 - (penalties * 0.2));
};
