import { describe, expect, it } from 'vitest';
import type { AiStructuredPatch } from '../src/index';

describe('ai smoke', () => {
  it('exports types', () => {
    const sample: AiStructuredPatch['target'] = 'DesignGenome';
    expect(sample).toBe('DesignGenome');
  });
});
