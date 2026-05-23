import type { BlockDefinition } from '../../../product-engine/src/recipes';

const block = (id: string): BlockDefinition => ({ id, category: 'content', defaultProps: {}, validator: () => true });

export const restaurantBlockDefinitions: BlockDefinition[] = [
  block('RestaurantHeroBlock'), block('MenuCategoryBlock'), block('MenuItemGridBlock'), block('FeaturedDishBlock'), block('GalleryBlock'),
  block('ReservationCTABlock'), block('OpeningHoursBlock'), block('MapContactBlock'), block('QRCodeBlock'), block('FooterBlock')
];
