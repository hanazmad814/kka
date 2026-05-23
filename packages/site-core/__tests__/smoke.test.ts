import { describe, expect, it } from 'vitest';
import { validatePublicRenderInput } from '../src/index';

describe('site-core smoke', () => {
  it('exports validators', () => {
    expect(validatePublicRenderInput).toBeTypeOf('function');
  });
});
