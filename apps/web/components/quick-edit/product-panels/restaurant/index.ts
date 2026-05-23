import type { ProductEditPanelDefinition, ProductEditValidationError } from '../product-edit-panel.types';
import type { ProductDraft } from '../../../../../../packages/site-core/src/drafts';

export interface RestaurantEditFormState {
  brandName: string; description?: string; cuisineType?: string; address?: string; phone?: string; openingHours?: string; ctaLabel?: string;
  menuItems: Array<{ id: string; name: string; description?: string; price?: string; category?: string; imageUrl?: string }>;
}
const getFields = (d: ProductDraft) => (d.site?.dataModel?.fields ?? {}) as Record<string, unknown>;
export const restaurantEditPanel: ProductEditPanelDefinition<RestaurantEditFormState> = {
  productTypes: ['restaurant'], label: 'Restaurant',
  draftToForm: (d) => { const f = getFields(d); return { brandName: String(f.brandName ?? ''), description: String(f.description ?? ''), cuisineType: String(f.cuisineType ?? ''), address: String(f.address ?? ''), phone: String(f.phone ?? ''), openingHours: String(f.openingHours ?? ''), ctaLabel: String(f.ctaLabel ?? ''), menuItems: Array.isArray(f.menuItems) ? (f.menuItems as RestaurantEditFormState['menuItems']) : [] }; },
  validate: (s) => { const e: ProductEditValidationError[] = []; if (!s.brandName.trim()) e.push({ path: 'brandName', message: 'Brand name required' }); if (s.menuItems.length < 1) e.push({ path: 'menuItems', message: 'At least one menu item required' }); s.menuItems.forEach((m, i) => !m.name?.trim() && e.push({ path: `menuItems.${i}.name`, message: 'Menu item name required' })); return { ok: e.length === 0, errors: e }; },
  toUpdateRequest: (s) => ({ dataPatch: { brandName: s.brandName, description: s.description, cuisineType: s.cuisineType, address: s.address, phone: s.phone, openingHours: s.openingHours, ctaLabel: s.ctaLabel, menuItems: s.menuItems } }),
  Component: () => null
};
