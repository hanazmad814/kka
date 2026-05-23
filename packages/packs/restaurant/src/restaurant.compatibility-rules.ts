import type { RestaurantInput } from './restaurant.types';

export const applyRestaurantCompatibility = (input: RestaurantInput, candidates: Array<{ id: string; tags: string[] }>): Array<{ id: string; tags: string[] }> =>
  candidates.filter((candidate) => {
    if ((!input.data.images || input.data.images.length === 0) && candidate.tags.includes('image-heavy')) return false;
    if (input.data.menuItems.length > 50 && candidate.tags.includes('sparse-menu')) return false;
    if (input.scope === 'one_page' && candidate.tags.includes('multi-page')) return false;
    return true;
  });
