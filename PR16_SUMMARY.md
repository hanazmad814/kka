# PR 16 - Select Variant + Draft Save

## Files created/changed
- Added draft model/validation/fixtures:
  - `packages/site-core/src/drafts/draft.types.ts`
  - `packages/site-core/src/drafts/draft.validators.ts`
  - `packages/site-core/src/drafts/draft.fixtures.ts`
  - `packages/site-core/src/drafts/index.ts`
  - `packages/site-core/src/drafts/__tests__/drafts.test.ts`
- Added repository abstraction + in-memory repository:
  - `packages/site-core/src/storage/draft-repository.types.ts`
  - `packages/site-core/src/storage/in-memory-draft-repository.ts`
  - `packages/site-core/src/storage/index.ts`
  - `packages/site-core/src/storage/__tests__/draft-repository.test.ts`
- Exported drafts/storage from `packages/site-core/src/index.ts`
- Updated select variant API with server-side validation + quality gate + draft creation:
  - `apps/web/app/api/select-variant/route.ts`
  - `apps/web/app/api/select-variant/route.test.ts`
- Added draft fetch API:
  - `apps/web/app/api/drafts/[draftId]/route.ts`
  - `apps/web/app/api/drafts/[draftId]/route.test.ts`
- Added Variant Picker client API integration:
  - `apps/web/components/variant-picker/variant-picker.api.ts`
  - updated `VariantPicker.tsx` and `VariantCard.tsx` for loading/error/select behavior
- Added Quick Edit placeholder route with draft loading:
  - `apps/web/app/editor/quick/[draftId]/page.tsx`

## Tests run
- `npm run typecheck`
- `npm test`

## Known limitations
- Draft persistence is in-memory singleton only (dev/test baseline), not durable DB.
- Quick Edit page is placeholder-only (no editing controls yet).
- Placeholder page currently shows draft metadata only (no full preview rendering).

## How PR 16 unlocks PR 17
PR 16 turns selected variants into real server-validated drafts with stable draftId and retrieval API,
so PR 17 can focus on editing draft content and saving updates instead of selection/persistence plumbing.
