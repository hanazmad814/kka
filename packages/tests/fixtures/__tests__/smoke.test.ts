import { describe, expect, it } from 'vitest';
import type { FixtureNote } from '../src/index';
describe('fixtures smoke', () => {
  it('exports fixture types', () => {
    const fixture: FixtureNote = { name: 'base' };
    expect(fixture.name).toBe('base');
  });
});
