export const restaurantBlockVariants = [
  { id: 'menu-grid-dense', blockId: 'MenuItemGridBlock', layout: 'dense', imageHeavy: false },
  { id: 'menu-grid-sparse', blockId: 'MenuItemGridBlock', layout: 'sparse', imageHeavy: false },
  { id: 'gallery-image-heavy', blockId: 'GalleryBlock', layout: 'standard', imageHeavy: true },
  { id: 'hero-standard', blockId: 'RestaurantHeroBlock', layout: 'standard', imageHeavy: false },
  { id: 'contact-map', blockId: 'MapContactBlock', layout: 'standard', imageHeavy: false }
] as const;
