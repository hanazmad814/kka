import { normalizeScore } from './scoring-weights';
import type { ScoringContext } from './scoring-context';

export const scoreBrandFit = (ctx: ScoringContext): number => {
  const match = ctx.genome?.stylePresetId === ctx.input.stylePresetId ? 1 : 0.7;
  return normalizeScore(match);
};
