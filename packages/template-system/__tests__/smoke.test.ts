import { describe, expect, it } from 'vitest';
import { blockRegistry } from '../src/index';
describe('template-system smoke', () => {
  it('exports registries', () => {
    expect(blockRegistry).toBeDefined();
  });
});
