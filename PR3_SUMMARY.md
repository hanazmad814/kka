# PR 3 - Shared Renderer Foundation Summary

## Files created/updated
- Added shared core renderer foundation in `packages/core/src/renderer.ts`.
- Added site renderer adapters in `packages/site-core/src/renderer.ts`.
- Exported renderers from package entrypoints.
- Added renderer-focused unit tests for core and site-core.

## Why PR 3 unlocks PR 4 (Recipe/Template Registry)
PR 3 introduces a stable, reusable rendering contract for both `SceneDocument` and `ProductSite`:
- deterministic rendering from typed scene/site models
- token-based style resolution against `SiteDesignSystem`
- safe handling for unknown nodes and missing child references
- separate public vs preview renderer boundaries

With this foundation, PR 4 can register templates/recipes as scene/site definitions and immediately verify output via the same renderer API, instead of coupling registry work to editor-specific runtime.
