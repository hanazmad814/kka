import type { StoredGeneratedVariants, VariantPickerVariant } from './variant-picker.types';

const GENERATED_KEY = 'generatedVariants';
const SELECTED_KEY = 'selectedVariant';

const hasWindow = (): boolean => typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';

export const saveGeneratedVariants = (payload: StoredGeneratedVariants): void => { if (hasWindow()) window.localStorage.setItem(GENERATED_KEY, JSON.stringify(payload)); };
export const loadGeneratedVariants = (): StoredGeneratedVariants | null => { if (!hasWindow()) return null; const raw = window.localStorage.getItem(GENERATED_KEY); if (!raw) return null; try { return JSON.parse(raw) as StoredGeneratedVariants; } catch { return null; } };
export const clearGeneratedVariants = (): void => { if (hasWindow()) window.localStorage.removeItem(GENERATED_KEY); };

export const saveSelectedVariant = (variant: VariantPickerVariant): void => { if (hasWindow()) window.localStorage.setItem(SELECTED_KEY, JSON.stringify(variant)); };
export const loadSelectedVariant = (): VariantPickerVariant | null => { if (!hasWindow()) return null; const raw = window.localStorage.getItem(SELECTED_KEY); if (!raw) return null; try { return JSON.parse(raw) as VariantPickerVariant; } catch { return null; } };
