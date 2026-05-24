import { describe, expect, it } from 'vitest';
import { Registry } from '../src/index';
import type { GenerationPipelineStep, ProductCategory } from '../src/index';

describe('core smoke', () => {
  it('exports Registry', () => {
    expect(Registry).toBeTypeOf('function');
  });

  it('supports outcome-first business types', () => {
    const step: GenerationPipelineStep = 'QUALITY_CHECK';
    const category: ProductCategory = 'marketing-conversion';

    expect(step).toBe('QUALITY_CHECK');
    expect(category).toBe('marketing-conversion');
  });
});
