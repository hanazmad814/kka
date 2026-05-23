# PR 14 - Create Wizard UI

## Files created/changed
- Added `/create` page:
  - `apps/web/app/create/page.tsx`
- Added Create Wizard components:
  - `apps/web/components/create-wizard/CreateWizard.tsx`
  - `ProductTypeStep.tsx`
  - `ProductScopeStep.tsx`
  - `ProductDataStep.tsx`
  - `MenuItemsEditor.tsx`
  - `StyleStep.tsx`
  - `GenerateStep.tsx`
  - `WizardProgress.tsx`
  - `GeneratedVariantsDebug.tsx`
  - `create-wizard.types.ts`
  - `create-wizard.schema.ts`
  - `create-wizard.utils.ts`
  - `index.ts`
- Added API route:
  - `apps/web/app/api/generate-variants/route.ts`
- Added tests:
  - `apps/web/components/create-wizard/__tests__/create-wizard-utils.test.ts`
  - `apps/web/app/api/generate-variants/route.test.ts`

## Tests run
- `npm run typecheck`
- `npm test`

## Known limitations
- Variant Picker UI is not implemented yet (debug cards only after generation).
- No Quick Edit and no Publish flow.
- Style list in UI uses constant IDs mapped to existing preset IDs.
- App shell currently does not include full Next.js runtime wiring in this repo baseline; route/page are implemented in expected App Router structure.

## How PR 14 unlocks PR 15 Variant Picker UI
PR 14 provides the full data-entry + generation UX and returns 3–6 variants with metadata in client state,
so PR 15 can focus purely on richer variant visualization, comparison, selection, and draft save UX.
