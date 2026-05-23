import { describe, expect, it } from 'vitest';
import { Registry } from '../src/index';

describe('core smoke', () => {
  it('exports Registry', () => {
    expect(Registry).toBeTypeOf('function');
  });
});
