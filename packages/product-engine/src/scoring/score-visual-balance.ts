import { normalizeScore } from './scoring-weights';
import type { ScoringContext } from './scoring-context';

export const scoreVisualBalance = (ctx: ScoringContext): number => {
  const nodeCounts = Object.values(ctx.site.pages).map((doc) => Object.keys(doc.pages[0]?.nodesById ?? {}).length);
  const avg = nodeCounts.reduce((a, b) => a + b, 0) / Math.max(1, nodeCounts.length);
  const distance = Math.abs(avg - 8) / 8;
  return normalizeScore(1 - distance);
};
