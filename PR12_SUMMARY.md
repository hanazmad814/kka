# PR 12 - Generate Best Variants API

## Files changed
- Added generate pipeline module under `packages/product-engine/src/generate/`:
  - `generate-best-variants.types.ts`
  - `generate-best-variants.ts`
  - `generate-variant-preview.ts`
  - `variant-result.types.ts`
  - `generation-metrics.ts`
  - `generation-errors.ts`
  - `index.ts`
  - `__tests__/generate-best-variants.test.ts`
- Exported generate API from `packages/product-engine/src/index.ts`.

## Tests run
- `npm run typecheck`
- `npm test`

## Known limitations
- Beam generation currently uses existing genome generator wrapper and fixture-backed metadata (deterministic baseline).
- Assembly currently uses recipe fixture registry for baseline variants.
- Preview type is currently `unknown` as requested contract placeholder.

## How PR 12 unlocks next phase
PR 12 provides the single orchestration function from ProductInput to scored/validated Top-K variants with metrics,
which can now be wrapped by API routes and UI layers without changing core engine logic.
