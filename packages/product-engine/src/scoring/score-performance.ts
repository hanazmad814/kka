import { normalizeScore } from './scoring-weights';
import type { ScoringContext } from './scoring-context';

export const scorePerformance = (ctx: ScoringContext): number => {
  const penalties = ctx.quality.issues.filter((i) => i.code.startsWith('PERF_')).length;
  return normalizeScore(1 - penalties * 0.2);
};
