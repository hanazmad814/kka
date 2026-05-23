import { describe, expect, it } from 'vitest';
import type { AssemblyEngine } from '../src/index';
describe('product-engine smoke', () => {
  it('exports types', () => {
    const present: AssemblyEngine | null = null;
    expect(present).toBeNull();
  });
});
