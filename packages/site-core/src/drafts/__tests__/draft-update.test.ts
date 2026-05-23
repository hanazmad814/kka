import { describe, expect, it } from 'vitest';
import { validateDraftUpdateRequest } from '../draft-update-validator';

describe('validateDraftUpdateRequest', () => {
  it('accepts valid payload', () => {
    const result = validateDraftUpdateRequest({ dataPatch: { brandName: 'A', menuItems: [{ id: '1', name: 'Soup' }] } });
    expect(result.valid).toBe(true);
  });

  it('rejects empty brand name', () => {
    const result = validateDraftUpdateRequest({ dataPatch: { brandName: '   ' } });
    expect(result.valid).toBe(false);
  });

  it('rejects empty menu items', () => {
    const result = validateDraftUpdateRequest({ dataPatch: { menuItems: [] } });
    expect(result.valid).toBe(false);
  });
});
