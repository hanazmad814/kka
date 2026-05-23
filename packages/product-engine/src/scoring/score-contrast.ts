import { normalizeScore } from './scoring-weights';
import type { ScoringContext } from './scoring-context';

export const scoreContrast = (ctx: ScoringContext): number => {
  const low = ctx.quality.issues.filter((i) => i.code === 'LOW_CONTRAST').length;
  return normalizeScore(1 - (low * 0.5));
};
