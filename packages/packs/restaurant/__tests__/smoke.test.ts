import { describe, expect, it } from 'vitest';
import { restaurantPack } from '../src/index';
describe('restaurant pack smoke', () => {
  it('exports pack', () => {
    expect(restaurantPack.id).toContain('restaurant');
  });
});
