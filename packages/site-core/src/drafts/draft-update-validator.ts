import type { UpdateDraftRequest } from './update-draft.types';

export const validateDraftUpdateRequest = (input: UpdateDraftRequest): { valid: boolean; code?: string; message?: string } => {
  if (!input || (typeof input !== 'object')) return { valid: false, code: 'bad_request', message: 'Invalid request body.' };
  if (!input.dataPatch && !input.stylePresetId) return { valid: false, code: 'invalid_update', message: 'No update payload provided.' };

  const patch = input.dataPatch as Record<string, unknown> | undefined;
  const brandName = patch?.brandName;
  if (typeof brandName === 'string' && !brandName.trim()) return { valid: false, code: 'invalid_update', message: 'brandName cannot be empty.' };

  const menuItems = patch?.menuItems;
  if (Array.isArray(menuItems)) {
    if (menuItems.length === 0) return { valid: false, code: 'invalid_update', message: 'menuItems cannot be empty.' };
    if (menuItems.some((i) => typeof i === 'object' && i !== null && typeof (i as Record<string, unknown>).name === 'string' && !String((i as Record<string, unknown>).name).trim())) {
      return { valid: false, code: 'invalid_update', message: 'menu item name is required.' };
    }
  }

  return { valid: true };
};
