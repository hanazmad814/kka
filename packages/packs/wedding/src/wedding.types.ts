import type { SiteRecipe, PageRecipe, BlockDefinition } from '../../../product-engine/src/recipes';
export type WeddingProductType = 'wedding_invitation';
export type WeddingScope = 'one_page' | 'mini_site_3_pages' | 'standard_site_5_pages';
export interface WeddingStoryItemInput { id: string; title: string; date?: string; description?: string; imageUrl?: string; }
export interface WeddingScheduleItemInput { id: string; time?: string; title: string; description?: string; location?: string; }
export interface WeddingGalleryImageInput { id: string; src: string; alt?: string; caption?: string; }
export interface WeddingInputData {
  couple: { brideName: string; groomName: string; displayNames?: string };
  event: { date: string; time?: string; timezone?: string; venueName: string; venueAddress?: string; mapUrl?: string };
  message?: { headline?: string; invitationText?: string; quote?: string };
  story?: { title?: string; items?: WeddingStoryItemInput[] };
  schedule?: WeddingScheduleItemInput[];
  gallery?: WeddingGalleryImageInput[];
  rsvp?: { enabled: boolean; deadline?: string; contactEmail?: string; contactPhone?: string; formAction?: string };
  gift?: { enabled?: boolean; message?: string; registryUrl?: string };
  music?: { enabled?: boolean; title?: string; src?: string; loop?: boolean };
  assets?: { heroImageUrl?: string; coupleImageUrl?: string; galleryImageUrls?: string[] };
}
export interface WeddingInput { productType: WeddingProductType; scope: WeddingScope; stylePresetId: string; data: WeddingInputData; }
export interface WeddingPackRegistry { siteRecipe: SiteRecipe; pageRecipes: Record<string, PageRecipe>; blockDefinitions: BlockDefinition[]; blockVariants: Array<{ id: string; blockId: string; layout: 'dense'|'sparse'|'standard'|'compact'; imageHeavy?: boolean; tags?: readonly string[] }>; stylePresets: Array<{id:string; mood:string}>; compatibilityRules: Array<{id:string; description:string}>; }
