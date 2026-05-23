# PR 15 - Variant Picker UI

## Files created/changed
- Added Variant Picker route and placeholder selected route:
  - `apps/web/app/create/variants/page.tsx`
  - `apps/web/app/create/selected/page.tsx`
- Added Variant Picker components:
  - `apps/web/components/variant-picker/VariantPicker.tsx`
  - `VariantCard.tsx`
  - `VariantPreview.tsx`
  - `DesktopPreviewFrame.tsx`
  - `MobilePreviewFrame.tsx`
  - `VariantScoreBadge.tsx`
  - `VariantQualitySummary.tsx`
  - `VariantReasons.tsx`
  - `VariantPageList.tsx`
  - `VariantCompareBar.tsx`
  - `variant-picker.types.ts`
  - `variant-picker.storage.ts`
  - `variant-picker.utils.ts`
  - `index.ts`
- Added API placeholder for variant selection:
  - `apps/web/app/api/select-variant/route.ts`
  - `apps/web/app/api/select-variant/route.test.ts`
- Added tests:
  - `apps/web/components/variant-picker/__tests__/variant-picker-utils.test.ts`
  - `apps/web/components/variant-picker/__tests__/variant-picker-storage.test.ts`
- Updated Create Wizard integration:
  - `apps/web/components/create-wizard/CreateWizard.tsx`
  - Save generated variants to storage and navigate to `/create/variants` on success.

## Tests run
- `npm run typecheck`
- `npm test`

## Known limitations
- Selected variant is stored in localStorage only (no DB draft persistence yet).
- Preview uses shared renderer in an iframe with fallback text if rendering fails.
- Quick Edit is not implemented; selection redirects to placeholder `/create/selected`.

## How PR 15 unlocks PR 16
PR 15 provides concrete variant selection UX and temporary selection persistence.
PR 16 can now focus on draft creation + Quick Edit entry using selected variant payload.
