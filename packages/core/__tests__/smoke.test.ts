import { describe, expect, it } from 'vitest';
import { OUTCOME_FIRST_PIPELINE, Registry, SMART_PRODUCT_CATALOG } from '../src/index';
import type { GenerationPipelineStep, ProductCategory } from '../src/index';

describe('core smoke', () => {
  it('exports Registry', () => {
    expect(Registry).toBeTypeOf('function');
  });

  it('exports business model pipeline and catalog', () => {
    const step: GenerationPipelineStep = 'QUALITY_CHECK';
    const category: ProductCategory = 'marketing-conversion';

    expect(step).toBe('QUALITY_CHECK');
    expect(category).toBe('marketing-conversion');
    expect(OUTCOME_FIRST_PIPELINE).toHaveLength(6);
    expect(SMART_PRODUCT_CATALOG['wedding-invitation'].length).toBeGreaterThan(10);
  });
});
