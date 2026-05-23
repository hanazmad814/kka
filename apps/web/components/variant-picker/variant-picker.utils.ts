import type { VariantPickerVariant } from './variant-picker.types';

export const getVariantLabel = (index: number): string => `Version ${String.fromCharCode(65 + index)}`;
export const hasBlocking = (variant: VariantPickerVariant): boolean => (variant.quality?.blockingCount ?? 0) > 0;
export const getPageCount = (variant: VariantPickerVariant): number => variant.site.siteMap.pages.length;
