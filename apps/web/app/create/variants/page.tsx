'use client';
import { VariantPicker } from '../../../components/variant-picker/VariantPicker';
import { loadGeneratedVariants } from '../../../components/variant-picker/variant-picker.storage';

export default function VariantsPage() {
  const stored = loadGeneratedVariants();
  return <VariantPicker variants={stored?.variants ?? []} />;
}
