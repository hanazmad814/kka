import type { RestaurantInput } from './restaurant.types';

export const validateRestaurantInput = (input: RestaurantInput): { valid: boolean; issues: string[] } => {
  const issues: string[] = [];
  if (!input.data.name) issues.push('name required');
  if (!input.data.menuItems.length) issues.push('menu items required');
  return { valid: issues.length === 0, issues };
};
