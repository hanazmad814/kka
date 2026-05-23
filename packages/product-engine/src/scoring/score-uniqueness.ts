import { normalizeScore } from './scoring-weights';
import type { ScoringContext } from './scoring-context';

export const scoreUniqueness = (ctx: ScoringContext): number => {
  if (!ctx.genome || ctx.allCandidates.length <= 1) return 1;
  const same = ctx.allCandidates.filter((c) => c.genome?.stylePresetId === ctx.genome?.stylePresetId && c.genome?.layoutVariantId === ctx.genome?.layoutVariantId).length;
  return normalizeScore(1 - ((same - 1) * 0.2));
};
