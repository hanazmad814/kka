import { describe, expect, it } from 'vitest';
import { businessPack } from '../src/index';
describe('business pack smoke', () => {
  it('exports pack', () => {
    expect(businessPack.id).toContain('business');
  });
});
