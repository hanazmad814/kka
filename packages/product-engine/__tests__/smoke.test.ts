import { describe, expect, it } from 'vitest';
import { PRODUCT_ENGINE_VERSION, type ProductGenerationService } from '../src/index';

describe('product-engine smoke', () => {
  it('exports generation service contracts', () => {
    expect(PRODUCT_ENGINE_VERSION).toBe('1.0.0');
    const service: ProductGenerationService | null = null;
    expect(service).toBeNull();
  });
});
