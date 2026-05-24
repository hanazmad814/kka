import { describe, expect, it } from 'vitest';
import { AI_LAYER_VERSION, type AiPatchService } from '../src/index';

describe('ai smoke', () => {
  it('exports AI patch contracts', () => {
    expect(AI_LAYER_VERSION).toBe('1.0.0');
    const svc: AiPatchService | null = null;
    expect(svc).toBeNull();
  });
});
