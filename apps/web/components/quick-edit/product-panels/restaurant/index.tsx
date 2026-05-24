import type { ProductEditPanelDefinition, ProductEditValidationError, ProductEditPanelProps } from '../product-edit-panel.types';
import type { ProductDraft } from '../../../../../../packages/site-core/src/drafts';

export interface RestaurantEditFormState {
  brandName: string; description?: string; cuisineType?: string; address?: string; phone?: string; email?: string; openingHours?: string; reservationLink?: string;
  menuCategories: string[];
  menuItems: Array<{ id: string; name: string; description?: string; price?: string; category?: string; imageUrl?: string; featured?: boolean }>;
  galleryImages: string[];
  socialLinks?: Array<{ platform?: string; url?: string }>;
}
const getFields = (d: ProductDraft) => (d.site?.dataModel?.fields ?? {}) as Record<string, unknown>;

function RestaurantForm({ value, onChange, errors = [] }: ProductEditPanelProps<RestaurantEditFormState>) {
  const set = <K extends keyof RestaurantEditFormState>(k: K, v: RestaurantEditFormState[K]) => onChange({ ...value, [k]: v });
  return <div>
    <h3>Restaurant details</h3>
    <input placeholder='Restaurant name' value={value.brandName} onChange={(e)=>set('brandName', e.target.value)} />
    <input placeholder='Tagline' value={value.description ?? ''} onChange={(e)=>set('description', e.target.value)} />
    <input placeholder='Cuisine type' value={value.cuisineType ?? ''} onChange={(e)=>set('cuisineType', e.target.value)} />
    <input placeholder='Address' value={value.address ?? ''} onChange={(e)=>set('address', e.target.value)} />
    <input placeholder='Phone' value={value.phone ?? ''} onChange={(e)=>set('phone', e.target.value)} />
    <input placeholder='Email' value={value.email ?? ''} onChange={(e)=>set('email', e.target.value)} />
    <input placeholder='Opening hours' value={value.openingHours ?? ''} onChange={(e)=>set('openingHours', e.target.value)} />
    <input placeholder='Reservation link' value={value.reservationLink ?? ''} onChange={(e)=>set('reservationLink', e.target.value)} />
    <h4>Menu items</h4>
    {value.menuItems.map((item, i) => <div key={item.id || i}>
      <input placeholder='Name' value={item.name ?? ''} onChange={(e)=>set('menuItems', value.menuItems.map((m, idx)=> idx===i ? { ...m, name: e.target.value } : m))} />
      <input placeholder='Description' value={item.description ?? ''} onChange={(e)=>set('menuItems', value.menuItems.map((m, idx)=> idx===i ? { ...m, description: e.target.value } : m))} />
      <input placeholder='Price' value={item.price ?? ''} onChange={(e)=>set('menuItems', value.menuItems.map((m, idx)=> idx===i ? { ...m, price: e.target.value } : m))} />
      <button onClick={()=>set('menuItems', value.menuItems.filter((_, idx)=>idx!==i))}>Remove</button>
    </div>)}
    <button onClick={()=>set('menuItems', [...value.menuItems, { id: `m_${Date.now()}`, name: '' }])}>Add menu item</button>
    {errors.map((e, i)=><p key={i} role='alert'>{e.message}</p>)}
  </div>;
}

export const restaurantEditPanel: ProductEditPanelDefinition<RestaurantEditFormState> = {
  productTypes: ['restaurant'], label: 'Restaurant',
  draftToForm: (d) => { const f = getFields(d); return { brandName: String(f.brandName ?? ''), description: String(f.description ?? ''), cuisineType: String(f.cuisineType ?? ''), address: String(f.address ?? ''), phone: String(f.phone ?? ''), email: String(f.email ?? ''), openingHours: String(f.openingHours ?? ''), reservationLink: String(f.reservationLink ?? ''), menuCategories: Array.isArray(f.menuCategories) ? (f.menuCategories as string[]) : [], menuItems: Array.isArray(f.menuItems) ? (f.menuItems as RestaurantEditFormState['menuItems']) : [], galleryImages: Array.isArray(f.galleryImages) ? (f.galleryImages as string[]) : [], socialLinks: Array.isArray(f.socialLinks) ? (f.socialLinks as RestaurantEditFormState['socialLinks']) : [] }; },
  validate: (s) => { const e: ProductEditValidationError[] = []; if (!s.brandName.trim()) e.push({ path: 'brandName', message: 'Brand name required' }); s.menuItems.forEach((m, i) => !m.name?.trim() && e.push({ path: `menuItems.${i}.name`, message: 'Menu item name required' })); return { ok: e.length === 0, errors: e }; },
  toUpdateRequest: (s) => ({ dataPatch: { brandName: s.brandName, description: s.description, cuisineType: s.cuisineType, address: s.address, phone: s.phone, email: s.email, openingHours: s.openingHours, reservationLink: s.reservationLink, menuCategories: s.menuCategories, menuItems: s.menuItems, galleryImages: s.galleryImages, socialLinks: s.socialLinks } }),
  Component: RestaurantForm
};
