# PR 10 - Quality Gate Foundation

## Files changed
- Added quality-gate module under `packages/product-engine/src/quality-gate/`:
  - `quality-gate.types.ts`
  - `quality-context.ts`
  - `quality-gate.ts`
  - `check-schema.ts`
  - `check-missing-assets.ts`
  - `check-text-overflow.ts`
  - `check-mobile-readability.ts`
  - `check-contrast.ts`
  - `check-navigation.ts`
  - `check-routes.ts`
  - `check-seo.ts`
  - `check-forms.ts`
  - `check-editor-leak.ts`
  - `check-performance-budget.ts`
  - `quality-fixtures.ts`
  - `index.ts`
- Added tests: `packages/product-engine/src/quality-gate/__tests__/quality-gate.test.ts`.
- Exported quality-gate API from `packages/product-engine/src/index.ts`.

## Known limitations
- Contrast checker currently expects hex colors and emits info when insufficient data.
- Text overflow and mobile readability are heuristic checks (initial baseline only).
- Route checks currently infer routes from `siteMap.pages.path` only.

## How PR 10 unlocks PR 11 Design Scoring
PR 10 introduces deterministic quality signals (blocking/warning/info) that PR 11 can use as hard constraints and soft penalties before numerical scoring.
This lets scoring avoid invalid candidates and rank only quality-passing sites.
