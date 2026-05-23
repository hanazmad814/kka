import type { PageRecipe } from '../../../product-engine/src/recipes';

export const restaurantPageRecipes: Record<string, PageRecipe> = {
  'home-menu': { id: 'home-menu', title: 'Home Menu', blocks: [{ blockId: 'RestaurantHeroBlock', props: {} }, { blockId: 'MenuCategoryBlock', props: {} }, { blockId: 'FooterBlock', props: {} }] },
  home: { id: 'home', title: 'Home', blocks: [{ blockId: 'RestaurantHeroBlock', props: {} }, { blockId: 'FeaturedDishBlock', props: {} }, { blockId: 'OpeningHoursBlock', props: {} }, { blockId: 'FooterBlock', props: {} }] },
  menu: { id: 'menu', title: 'Menu', blocks: [{ blockId: 'MenuCategoryBlock', props: {} }, { blockId: 'MenuItemGridBlock', props: {} }, { blockId: 'QRCodeBlock', props: {} }, { blockId: 'FooterBlock', props: {} }] },
  gallery: { id: 'gallery', title: 'Gallery', blocks: [{ blockId: 'GalleryBlock', props: {} }, { blockId: 'FooterBlock', props: {} }] },
  reservation: { id: 'reservation', title: 'Reservation', blocks: [{ blockId: 'ReservationCTABlock', props: {} }, { blockId: 'MapContactBlock', props: {} }, { blockId: 'FooterBlock', props: {} }] },
  contact: { id: 'contact', title: 'Contact', blocks: [{ blockId: 'MapContactBlock', props: {} }, { blockId: 'OpeningHoursBlock', props: {} }, { blockId: 'FooterBlock', props: {} }] }
};
