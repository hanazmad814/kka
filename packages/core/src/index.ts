export * from './types';
export * from './schemas';
export * from './validators';
export * from './scene-node';
export * from './scene-document';
export * from './validation';
export * from './registry';
export * from './renderer';
export * from './assets';

export const OUTCOME_FIRST_PIPELINE = [
  'INPUT_DATA',
  'GENERATE_VARIANTS',
  'SELECT_BEST_DESIGN',
  'QUICK_EDIT',
  'QUALITY_CHECK',
  'PUBLISH'
] as const;

export const SMART_PRODUCT_CATEGORIES = [
  'wedding-invitation',
  'business-showcase',
  'restaurant-food',
  'ecommerce-catalog',
  'event-campaign',
  'marketing-conversion',
  'social-creator',
  'forms-utility',
  'print-digital-design'
] as const;
