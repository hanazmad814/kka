import { describe, expect, it } from 'vitest';
import { createProductDraftFixture, validateProductDraft } from '../index';

describe('draft validators', () => {
  it('valid ProductDraft passes', () => {
    expect(validateProductDraft(createProductDraftFixture()).valid).toBe(true);
  });
  it('missing site fails', () => {
    const d = createProductDraftFixture();
    // @ts-expect-error runtime invalid
    d.site = undefined;
    expect(validateProductDraft(d).valid).toBe(false);
  });
  it('invalid status fails', () => {
    const d = createProductDraftFixture();
    // @ts-expect-error runtime invalid
    d.status = 'x';
    expect(validateProductDraft(d).valid).toBe(false);
  });
  it('source generated_variant with variantId passes', () => {
    const d = createProductDraftFixture();
    d.source = { type: 'generated_variant', variantId: 'v1' };
    expect(validateProductDraft(d).valid).toBe(true);
  });
});
