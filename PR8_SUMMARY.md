# PR 8 - Compatibility Rules + Filtering

## Files changed
- Added compatibility engine foundation in `packages/product-engine/src/compatibility/index.ts`.
- Added design-genome compatibility export shim in `packages/product-engine/src/design-genome/filter-compatible-genomes.ts`.
- Exported compatibility APIs from `packages/product-engine/src/index.ts`.
- Added tests in `packages/product-engine/__tests__/compatibility-foundation.test.ts`.

## Why PR 8 unlocks PR 9 Beam Search
PR 8 adds deterministic feasibility filtering before ranking/search expansion. PR 9 Beam Search can now:
- expand candidates,
- immediately prune incompatible branches via compatibility rules,
- spend search budget only on valid combinations.

This avoids exploring invalid state space and makes Beam Search both faster and safer.
