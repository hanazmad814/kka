import { describe, expect, it } from 'vitest';
import { runQualityGate } from '../../quality-gate';
import { createScoringInputFixture, createScoringSiteFixture } from '../scoring-fixtures';
import { scoreDesignCandidate } from '../score-design-candidate';
import { getScoringWeights } from '../scoring-weights';
import { selectTopK } from '../top-k-selector';

const mk = (id: string, total: number, blocking = false, style = 'minimal', layout = 'l1') => ({
  id,
  site: createScoringSiteFixture(),
  quality: { ok: !blocking, issues: blocking ? [{ severity: 'blocking' as const, code: 'X', message: 'x' }] : [], blockingCount: blocking ? 1 : 0, warningCount: 0, infoCount: 0 },
  score: { contentFit: total, readability: total, mobileQuality: total, visualBalance: total, brandFit: total, contrast: total, uniqueness: total, performance: total, conversionFit: total, total },
  reasons: [],
  genome: { id, seed: 's', productType: 'business' as const, recipeId: 'r', stylePresetId: style, layoutVariantId: layout, blockVariantIds: [] }
});

describe('scoring', () => {
  it('scoreDesignCandidate returns all score fields 0..1 and total 0..1', () => {
    const site = createScoringSiteFixture();
    const input = createScoringInputFixture();
    const scored = scoreDesignCandidate({ site, input });
    for (const value of Object.values(scored.score)) expect(value).toBeGreaterThanOrEqual(0);
    for (const value of Object.values(scored.score)) expect(value).toBeLessThanOrEqual(1);
  });

  it('candidate with blocking issue is excluded from selectTopK', () => {
    const out = selectTopK([mk('a', 0.9, true), mk('b', 0.7, false)]);
    expect(out.map((x) => x.id)).toEqual(['b']);
  });

  it('higher quality candidate ranks above lower quality candidate', () => {
    const out = selectTopK([mk('a', 0.2), mk('b', 0.8)]);
    expect(out[0].id).toBe('b');
  });

  it('business_landing weights include conversionFit emphasis', () => {
    const w = getScoringWeights('business');
    expect(w.conversionFit).toBeGreaterThan(0);
  });

  it('restaurant_menu weights emphasize readability/contentFit/mobileQuality', () => {
    const w = getScoringWeights('restaurant');
    expect(w.readability).toBeGreaterThanOrEqual(0.2);
    expect(w.contentFit).toBeGreaterThanOrEqual(0.25);
    expect(w.mobileQuality).toBeGreaterThanOrEqual(0.2);
  });

  it('selectTopK returns max 6 by default', () => {
    const out = selectTopK(Array.from({ length: 10 }).map((_, i) => mk(String(i), 1 - i / 20)));
    expect(out).toHaveLength(6);
  });

  it('selectTopK returns stable order for same input', () => {
    const arr = [mk('a', 0.8), mk('b', 0.8), mk('c', 0.7)];
    expect(selectTopK(arr).map((x) => x.id)).toEqual(selectTopK(arr).map((x) => x.id));
  });

  it('enforceDiversity avoids all candidates with same style/layout when alternatives exist', () => {
    const out = selectTopK([mk('a',0.9,false,'s1','l1'), mk('b',0.89,false,'s1','l1'), mk('c',0.88,false,'s2','l2')], { max: 2, enforceDiversity: true });
    const keys = out.map((x) => `${x.genome?.stylePresetId}-${x.genome?.layoutVariantId}`);
    expect(new Set(keys).size).toBe(2);
  });

  it('low contrast issue lowers contrast score', () => {
    const site = createScoringSiteFixture();
    const input = createScoringInputFixture();
    const quality = runQualityGate(site);
    quality.issues.push({ severity: 'warning', code: 'LOW_CONTRAST', message: 'x' });
    const scored = scoreDesignCandidate({ site, input, quality });
    expect(scored.score.contrast).toBeLessThan(1);
  });

  it('missing CTA lowers conversionFit for landing/sales', () => {
    const site = createScoringSiteFixture();
    delete site.pages.home.pages[0].nodesById.hero;
    const input = createScoringInputFixture();
    const scored = scoreDesignCandidate({ site, input });
    expect(scored.score.conversionFit).toBeLessThan(1);
  });

  it('performance budget warning lowers performance score', () => {
    const site = createScoringSiteFixture();
    const input = createScoringInputFixture();
    const quality = runQualityGate(site);
    quality.issues.push({ severity: 'warning', code: 'PERF_MAX_PAGES_EXCEEDED', message: 'x' });
    const scored = scoreDesignCandidate({ site, input, quality });
    expect(scored.score.performance).toBeLessThan(1);
  });

  it('selectTopK does not mutate input candidates', () => {
    const candidates = [mk('a',0.8), mk('b',0.7)];
    const before = JSON.stringify(candidates);
    selectTopK(candidates);
    expect(JSON.stringify(candidates)).toBe(before);
  });
});
