import { describe, expect, it } from 'vitest';
import { TEMPLATE_SYSTEM_VERSION, type TemplateRepository } from '../src/index';

describe('template-system smoke', () => {
  it('exports production API', () => {
    expect(TEMPLATE_SYSTEM_VERSION).toBe('1.0.0');
    const repo: TemplateRepository | null = null;
    expect(repo).toBeNull();
  });
});
