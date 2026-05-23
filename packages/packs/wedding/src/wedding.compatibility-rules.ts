import type { WeddingInput } from './wedding.types';
export const weddingCompatibilityRules = [{ id: 'wedding-required-core', description: 'Wedding requires names/date/venue and RSVP/map fallback behavior.' }];
export const applyWeddingCompatibility = (input: WeddingInput, candidates: Array<{ id: string; blockId?: string; tags: string[] }>) => candidates.filter((c) => {
  if (!input.data.assets?.heroImageUrl && !input.data.assets?.coupleImageUrl && c.tags.includes('image-heavy')) return false;
  if ((!input.data.gallery || input.data.gallery.length === 0) && c.blockId === 'SmartGalleryBlock') return false;
  if (input.data.rsvp?.enabled === false && c.blockId === 'RSVPBlock') return false;
  if (input.data.rsvp?.enabled && !input.data.rsvp.formAction && c.tags.includes('button_to_external_form')) return false;
  if (!input.data.event.mapUrl && c.tags.includes('map_embed')) return false;
  return true;
});
