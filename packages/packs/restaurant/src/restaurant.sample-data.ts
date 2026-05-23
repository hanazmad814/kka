import type { RestaurantInput } from './restaurant.types';

const menu60 = Array.from({ length: 60 }).map((_, i) => ({ name: `Dish ${i + 1}`, price: '$10', category: i % 2 === 0 ? 'Main' : 'Drink' }));

export const restaurantSampleData = {
  minimal: {
    productType: 'restaurant_site', scope: 'one_page', stylePresetId: 'minimal',
    data: { name: 'Tiny Bistro', menuItems: menu60.slice(0, 8) }
  } satisfies RestaurantInput,
  rich: {
    productType: 'restaurant_site', scope: 'standard_site_5_pages', stylePresetId: 'warm',
    data: { name: 'Maison Verde', menuItems: menu60.slice(0, 20), images: ['/1.jpg', '/2.jpg'], address: '1 Main St', phone: '555-1111' }
  } satisfies RestaurantInput,
  menu60: {
    productType: 'restaurant_menu', scope: 'mini_site_3_pages', stylePresetId: 'natural',
    data: { name: 'Big Menu House', menuItems: menu60, address: '2 Main St' }
  } satisfies RestaurantInput,
  noImages: {
    productType: 'restaurant_site', scope: 'mini_site_3_pages', stylePresetId: 'minimal',
    data: { name: 'No Pic Diner', menuItems: menu60.slice(0, 12), images: [] }
  } satisfies RestaurantInput
};
