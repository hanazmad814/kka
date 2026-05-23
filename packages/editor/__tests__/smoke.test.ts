import { describe, expect, it } from 'vitest';
import type { QuickEditProps } from '../src/index';
describe('editor smoke', () => {
  it('exports props', () => {
    const key: keyof QuickEditProps = 'snapshotId';
    expect(key).toBe('snapshotId');
  });
});
