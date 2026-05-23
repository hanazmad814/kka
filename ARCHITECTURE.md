# Architecture Skeleton (PR 1)

## Principles
- Deterministic core first (rules/code/validators).
- AI is assistive only.
- Outcome-first, editor-second.
- No `Math.random`; seeded interface only.
- Public render must consume `PublishedSiteSnapshot`.
- Draft cannot be published directly.

## Dependency Map
- `packages/core`: foundation domain types, schemas, validators, seed interface.
- `packages/site-core` -> depends on `packages/core`.
- `packages/template-system` -> depends on `packages/core`.
- `packages/product-engine` -> depends on `core`, `template-system`.
- `packages/ai` -> independent contract layer.
- `packages/editor` -> UI contract layer only.
- `packages/packs/*` -> depend on `core` and register pack metadata.
- `apps/web` -> will consume `site-core`, `product-engine`, `editor`, `packs` later.

## Notes for PR 2
Implement deterministic generation flow in `core + site-core` before editor and AI behaviors.
