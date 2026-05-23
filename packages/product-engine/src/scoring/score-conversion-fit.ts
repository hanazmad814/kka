import { normalizeScore } from './scoring-weights';
import type { ScoringContext } from './scoring-context';

export const scoreConversionFit = (ctx: ScoringContext): number => {
  const isLanding = ctx.input.scope === 'landing' || ctx.input.productType === 'business';
  if (!isLanding) return 0.8;
  const home = Object.values(ctx.site.pages)[0];
  const nodes = Object.values(home?.pages[0]?.nodesById ?? {});
  const hasCTA = nodes.some((n) => n.type === 'button');
  const formMissing = ctx.quality.issues.some((i) => i.code === 'FORM_HANDLER_MISSING');
  let score = hasCTA ? 1 : 0.4;
  if (formMissing) score -= 0.3;
  return normalizeScore(score);
};
