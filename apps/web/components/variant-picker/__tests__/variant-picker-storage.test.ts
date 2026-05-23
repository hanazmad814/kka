import { describe, expect, it } from 'vitest';
import { clearGeneratedVariants, loadGeneratedVariants, saveGeneratedVariants } from '../variant-picker.storage';

describe('variant picker storage', () => {
  it('window guard returns null on load without data', () => {
    clearGeneratedVariants();
    expect(loadGeneratedVariants()).toBeNull();
  });

  it('save/load generated variants works', () => {
    saveGeneratedVariants({ createdAt: 1, variants: [] });
    expect(loadGeneratedVariants()?.createdAt).toBe(1);
  });
});
