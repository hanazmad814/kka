import type { GenerationPipelineStep } from '../../core/src/index';

export interface CreateWizardProps {
  onCreate(input: { productType: string; name: string }): void;
}

export interface VariantPickerProps {
  blockId: string;
  onPick(variantId: string): void;
}

export interface QuickEditProps {
  snapshotId: string;
  fieldPath: string;
  onApply(value: unknown): void;
}

export type EditorMode = 'quick-edit' | 'advanced-canvas';

export interface EditorState {
  draftId: string;
  mode: EditorMode;
  currentStep: GenerationPipelineStep;
  selectedVariantId?: string;
  hasUnsavedChanges: boolean;
}

export interface EditorCommand {
  id: string;
  type: 'APPLY_PATCH' | 'UNDO' | 'REDO' | 'PUBLISH';
  payload?: Record<string, unknown>;
}

export interface EditorCommandBus {
  dispatch(command: EditorCommand): Promise<void>;
}
