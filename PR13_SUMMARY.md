# PR 13 - Product Pack 1: Restaurant/Menu

## Files changed
- Added full restaurant pack modules in `packages/packs/restaurant/src/`:
  - `restaurant.types.ts`
  - `restaurant.sample-data.ts`
  - `restaurant.site-recipe.ts`
  - `restaurant.page-recipes.ts`
  - `restaurant.blocks.ts`
  - `restaurant.block-variants.ts`
  - `restaurant.style-presets.ts`
  - `restaurant.compatibility-rules.ts`
  - `restaurant.validators.ts`
  - `restaurant.fixtures.ts`
  - `restaurant.registry.ts`
  - `index.ts`
- Added tests: `packages/packs/restaurant/__tests__/restaurant-pack.test.ts`.
- Updated generate pipeline to support restaurant scope-aware recipe/layout flow:
  - `packages/product-engine/src/generate/generate-best-variants.ts`

## Tests run
- `npm run typecheck`
- `npm test`

## Known limitations
- Restaurant pack integration is fixture-first and deterministic baseline, not yet full dynamic multi-pack resolution.
- Layout tagging/selection is still metadata-driven heuristic.
- Page/block assembly remains generic text-node assembly from existing engine foundation.

## How PR 13 unlocks PR 14 Create Wizard UI
PR 13 delivers the first real product pack with typed input, recipes, blocks, presets, compatibility, and deterministic variant output.
PR 14 Create Wizard UI can now bind to concrete restaurant scopes/data fields and call engine generation with real pack-backed behavior.
