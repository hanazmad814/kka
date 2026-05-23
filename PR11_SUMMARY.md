# PR 11 - Design Scoring + Top-K Selection

## Files changed
- Added scoring module under `packages/product-engine/src/scoring/`:
  - `design-score.types.ts`
  - `scoring-context.ts`
  - `score-content-fit.ts`
  - `score-readability.ts`
  - `score-mobile-quality.ts`
  - `score-visual-balance.ts`
  - `score-brand-fit.ts`
  - `score-contrast.ts`
  - `score-uniqueness.ts`
  - `score-performance.ts`
  - `score-conversion-fit.ts`
  - `score-design-candidate.ts`
  - `scoring-weights.ts`
  - `top-k-selector.ts`
  - `scoring-fixtures.ts`
  - `index.ts`
  - `__tests__/scoring.test.ts`
- Exported scoring API from `packages/product-engine/src/index.ts`.

## Tests run
- `npm run typecheck`
- `npm test`

## Scoring limitations
- Heuristic scoring only (no learned model, no AI).
- Brand-fit and content-fit currently use lightweight signals from input/site/genome.
- Diversity enforcement is style/layout based only (can be expanded later).

## How PR 11 unlocks PR 12 Generate Best Variants API
PR 11 provides deterministic candidate scoring + Top-K selection with explainable reasons.
PR 12 can now orchestrate end-to-end candidate generation -> quality gate -> scoring -> Top-K response payload.
