import type { ProductType } from '../../core/src/index';
import type { SiteDesignSystem } from '../../site-core/src/types';

export interface TemplateRecipe {
  id: string;
  recipeId: string;
}

export interface SeedTemplate {
  id: string;
  productType: ProductType;
  recipe: TemplateRecipe;
}

export interface BlockVariant {
  id: string;
  productType: ProductType;
  blockId: string;
  props: Record<string, unknown>;
}

export interface LayoutVariant {
  id: string;
  productType: ProductType;
  pageId: string;
  blockOrder: string[];
}

export interface ColorTokens { primary: string; secondary: string; background: string; text: string; accent: string; muted: string; }
export interface TypographyTokens { headingFont: string; bodyFont: string; baseSize: number; scale: number; }
export interface SpacingTokens { unit: number; steps: number[]; }
export interface RadiusTokens { sm: number; md: number; lg: number; pill: number; }
export interface ShadowTokens { sm: string; md: string; lg: string; }
export interface MotionTokens { fastMs: number; normalMs: number; slowMs: number; }
export interface ButtonTokens { bgColor: keyof ColorTokens; textColor: keyof ColorTokens; radius: keyof RadiusTokens; shadow: keyof ShadowTokens; }
export interface CardTokens { bgColor: keyof ColorTokens; radius: keyof RadiusTokens; shadow: keyof ShadowTokens; }
export interface ImageTreatmentTokens { radius: keyof RadiusTokens; shadow: keyof ShadowTokens; overlayColor: keyof ColorTokens; }

export interface StylePresetTokens {
  colors: ColorTokens;
  typography: TypographyTokens;
  spacing: SpacingTokens;
  radius: RadiusTokens;
  shadows: ShadowTokens;
  motion: MotionTokens;
  button: ButtonTokens;
  card: CardTokens;
  image: ImageTreatmentTokens;
}

export interface StylePreset {
  id: string;
  productType: ProductType;
  tokens: StylePresetTokens;
}

export interface ResolvedStylePreset {
  id: string;
  productType: ProductType;
  designSystem: SiteDesignSystem;
}
