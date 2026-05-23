import type { BlockVariant, LayoutVariant, SeedTemplate } from './types';
import type { StylePreset } from './types';

const createPreset = (id: string, productType: StylePreset['productType'], colors: StylePreset['tokens']['colors']): StylePreset => ({
  id,
  productType,
  tokens: {
    colors,
    typography: { headingFont: 'Playfair Display', bodyFont: 'Inter', baseSize: 16, scale: 1.25 },
    spacing: { unit: 4, steps: [1, 2, 3, 4, 6, 8] },
    radius: { sm: 4, md: 8, lg: 16, pill: 999 },
    shadows: { sm: '0 1px 2px rgba(0,0,0,0.08)', md: '0 4px 8px rgba(0,0,0,0.12)', lg: '0 8px 24px rgba(0,0,0,0.16)' },
    motion: { fastMs: 100, normalMs: 200, slowMs: 300 },
    button: { bgColor: 'primary', textColor: 'background', radius: 'md', shadow: 'sm' },
    card: { bgColor: 'background', radius: 'md', shadow: 'md' },
    image: { radius: 'sm', shadow: 'sm', overlayColor: 'muted' }
  }
});

export const defaultStylePresets: StylePreset[] = [
  createPreset('minimal', 'business', { primary: '#111111', secondary: '#666666', background: '#ffffff', text: '#111111', accent: '#2d2d2d', muted: '#f2f2f2' }),
  createPreset('luxury', 'business', { primary: '#2b1d0e', secondary: '#7a5b3a', background: '#f8f3eb', text: '#1a1209', accent: '#b08968', muted: '#efe3d3' }),
  createPreset('modern', 'business', { primary: '#0057ff', secondary: '#4b74d9', background: '#ffffff', text: '#0f172a', accent: '#22d3ee', muted: '#e2e8f0' }),
  createPreset('playful', 'business', { primary: '#ff4d6d', secondary: '#ff9f1c', background: '#fff9f0', text: '#3d2c2e', accent: '#2ec4b6', muted: '#ffe8d6' }),
  createPreset('warm', 'restaurant', { primary: '#9a3412', secondary: '#c2410c', background: '#fff7ed', text: '#431407', accent: '#f97316', muted: '#fed7aa' }),
  createPreset('bold', 'business', { primary: '#0f172a', secondary: '#1e293b', background: '#f8fafc', text: '#020617', accent: '#e11d48', muted: '#e2e8f0' }),
  createPreset('editorial', 'wedding', { primary: '#1f2937', secondary: '#6b7280', background: '#ffffff', text: '#111827', accent: '#9ca3af', muted: '#f3f4f6' }),
  createPreset('natural', 'restaurant', { primary: '#365314', secondary: '#4d7c0f', background: '#f7fee7', text: '#1a2e05', accent: '#84cc16', muted: '#ecfccb' }),
  createPreset('tech', 'business', { primary: '#0b3d91', secondary: '#2563eb', background: '#f8fbff', text: '#0b1220', accent: '#06b6d4', muted: '#dbeafe' }),
  createPreset('classic', 'wedding', { primary: '#3f3f46', secondary: '#71717a', background: '#fafaf9', text: '#18181b', accent: '#a1a1aa', muted: '#f4f4f5' })
];

export const createStylePresetFixture = (): StylePreset => defaultStylePresets[0];


export const createSeedTemplateFixture = (): SeedTemplate => ({
  id: 'business-seed-1',
  productType: 'business',
  recipe: { id: 'template-recipe-1', recipeId: 'business-basic' }
});

export const createBlockVariantFixture = (): BlockVariant => ({
  id: 'hero-variant-1',
  productType: 'business',
  blockId: 'hero-basic',
  props: { heading: 'Hello' }
});

export const createLayoutVariantFixture = (): LayoutVariant => ({
  id: 'home-layout-1',
  productType: 'business',
  pageId: 'home',
  blockOrder: ['hero-basic']
});
