import type { ProductType } from '../../../core/src';
import type { DesignScore } from './design-score.types';

export const normalizeScore = (value: number): number => Math.min(1, Math.max(0, value));

export const getScoringWeights = (productType: ProductType): Record<keyof Omit<DesignScore, 'total'>, number> => {
  const base = {
    contentFit: 0.25,
    mobileQuality: 0.2,
    readability: 0.2,
    visualBalance: 0.15,
    brandFit: 0.1,
    contrast: 0,
    uniqueness: 0.05,
    performance: 0.05,
    conversionFit: 0
  };

  if (productType === 'business') return { ...base, contentFit: 0.27, conversionFit: 0.1, visualBalance: 0.1, brandFit: 0.08 };
  if (productType === 'restaurant') return { ...base, readability: 0.24, contentFit: 0.28, mobileQuality: 0.24, visualBalance: 0.1, brandFit: 0.06, performance: 0.04 };
  if (productType === 'wedding') return { ...base, visualBalance: 0.22, brandFit: 0.16, contentFit: 0.2, mobileQuality: 0.16, readability: 0.16, performance: 0.04, uniqueness: 0.06 };
  return base;
};
