export interface QuickEditMenuItem {
  id: string;
  name: string;
  description?: string;
  price?: string;
  category?: string;
  imageUrl?: string;
}

export interface QuickEditFormState {
  brandName: string;
  description?: string;
  cuisineType?: string;
  address?: string;
  phone?: string;
  openingHours?: string;
  ctaLabel?: string;
  menuItems: QuickEditMenuItem[];
  stylePresetId?: string;
}
