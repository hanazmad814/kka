import { describe, expect, it } from 'vitest';
import { weddingPack } from '../src/index';
describe('wedding pack smoke', () => {
  it('exports pack', () => {
    expect(weddingPack.id).toContain('wedding');
  });
});
