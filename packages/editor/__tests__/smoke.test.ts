import { describe, expect, it } from 'vitest';
import { EDITOR_FOUNDATION_VERSION, type EditorState } from '../src/index';

describe('editor smoke', () => {
  it('exports editor foundation contracts', () => {
    expect(EDITOR_FOUNDATION_VERSION).toBe('1.0.0');
    const state: EditorState['mode'] = 'quick-edit';
    expect(state).toBe('quick-edit');
  });
});
