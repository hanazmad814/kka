import type { ProductSite } from '../../../../packages/site-core/src';
import type { DesignGenome } from '../../../../packages/product-engine/src/genome';
import type { QualityGateResult } from '../../../../packages/product-engine/src/quality-gate';
import type { DesignScore } from '../../../../packages/product-engine/src/scoring';

export interface VariantPickerVariant {
  id: string;
  site: ProductSite;
  genome?: DesignGenome;
  quality?: QualityGateResult;
  score?: DesignScore;
  reasons?: string[];
  metrics?: Record<string, unknown>;
}

export interface VariantPickerProps {
  variants: VariantPickerVariant[];
  initialSelectedId?: string;
  onSelect?: (variant: VariantPickerVariant) => void;
}

export type PreviewDevice = 'desktop' | 'mobile';

export interface StoredGeneratedVariants {
  createdAt: number;
  inputSummary?: { productType?: string; scope?: string; stylePresetId?: string; brandName?: string; };
  variants: VariantPickerVariant[];
}
