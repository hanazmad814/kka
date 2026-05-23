import { normalizeScore } from './scoring-weights';
import type { ScoringContext } from './scoring-context';

export const scoreContentFit = (ctx: ScoringContext): number => {
  const pageCount = Object.keys(ctx.site.pages).length;
  const scopePenalty = ctx.input.scope === 'landing' && pageCount > 1 ? 0.2 : 0;
  const dataUsed = Object.keys(ctx.input.data).filter((key) => JSON.stringify(ctx.site).includes(key)).length;
  const expected = Math.max(1, Object.keys(ctx.input.data).length);
  return normalizeScore((dataUsed / expected) - scopePenalty);
};
