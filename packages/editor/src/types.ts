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
