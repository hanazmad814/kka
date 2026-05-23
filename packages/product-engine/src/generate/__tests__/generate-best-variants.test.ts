import { describe, expect, it } from 'vitest';
import { generateBestVariants } from '..';
import type { ProductInput } from '../../assembly';

const input: ProductInput = { productType: 'business', scope: 'landing', stylePresetId: 'minimal', data: { businessName: 'Acme' } };

describe('generate best variants', () => {
  it('generates between 3 and 6 variants by default', () => {
    const result = generateBestVariants(input);
    expect(result.variants.length).toBeGreaterThanOrEqual(3);
    expect(result.variants.length).toBeLessThanOrEqual(6);
  });

  it('all returned variants are non-blocking', () => {
    const result = generateBestVariants(input);
    expect(result.variants.every((v) => v.quality.blockingCount === 0)).toBe(true);
  });

  it('includeMetrics returns populated metrics', () => {
    const result = generateBestVariants(input, { includeMetrics: true, maxCandidates: 12 });
    expect(result.metrics?.candidateCount).toBeGreaterThan(0);
    expect(result.metrics?.selectedCount).toBe(result.variants.length);
  });
});
