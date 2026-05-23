import type { ProductSite } from '../../../site-core/src';
import type { QualityGateContext, QualityGateOptions } from './quality-gate.types';

export const createQualityContext = (site: ProductSite, options?: Partial<QualityGateOptions>): QualityGateContext => ({
  site,
  options: {
    mode: options?.mode ?? 'preview',
    strict: options?.strict ?? false,
    performanceBudget: options?.performanceBudget ?? {}
  }
});
