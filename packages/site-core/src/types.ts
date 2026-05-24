import type {
  ProductCategory,
  ProductDataModel,
  ProductType,
  SceneDocument,
  ValidationResult,
  GenerationPipelineStep
} from '../../core/src/index';

export type { ProductCategory, ProductDataModel, ProductType, GenerationPipelineStep };

export interface ColorPalette {
  primary: string;
  secondary: string;
  background: string;
  text: string;
}

export interface TypographySystem {
  fontFamily: string;
  baseSize: number;
  scale: number;
}

export interface SpacingSystem {
  unit: number;
  steps: number[];
}

export interface RadiusSystem {
  sm: number;
  md: number;
  lg: number;
}

export interface ShadowSystem {
  sm: string;
  md: string;
  lg: string;
}

export interface MotionSystem {
  fastMs: number;
  normalMs: number;
  slowMs: number;
}

export interface BreakpointSystem {
  mobile: number;
  tablet: number;
  desktop: number;
}

export interface SiteDesignSystem {
  colors: ColorPalette;
  typography: TypographySystem;
  spacing: SpacingSystem;
  radius: RadiusSystem;
  shadows: ShadowSystem;
  motion: MotionSystem;
  breakpoints: BreakpointSystem;
}

export interface SitePageRef {
  id: string;
  path: string;
  title: string;
}

export interface SiteMap {
  pages: SitePageRef[];
}

export interface SiteNavItem {
  id: string;
  label: string;
  pageId: string;
  children?: SiteNavItem[];
}

export interface SiteNavigation {
  items: SiteNavItem[];
}

export interface PublishConfig {
  allowDraftPublish: false;
  channel: 'production' | 'staging';
}

export interface OutcomeFirstMeta {
  pipeline: GenerationPipelineStep[];
  currentStep: GenerationPipelineStep;
  selectedVariantId?: string;
  generatedVariantCount: number;
  qualityScore?: number;
}

export interface ProductSite {
  id: string;
  productType: ProductType;
  productCategory?: ProductCategory;
  schemaVersion: string;
  siteMap: SiteMap;
  navigation: SiteNavigation;
  designSystem: SiteDesignSystem;
  pages: Record<string, SceneDocument>;
  dataModel: ProductDataModel;
  publishConfig: PublishConfig;
  outcomeFirstMeta?: OutcomeFirstMeta;
}

export interface PublishedRoute {
  path: string;
  pageId: string;
}

export interface PublishedAsset {
  id: string;
  url: string;
  mimeType: string;
}

export interface PublishedSiteSnapshot {
  id: string;
  createdAtIso: string;
  site: ProductSite;
  routes: PublishedRoute[];
  assets: PublishedAsset[];
}

export type Validator<T> = (input: T) => ValidationResult;
