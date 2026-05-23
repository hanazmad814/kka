import type { ProductEditPanelDefinition, ProductEditValidationError } from '../product-edit-panel.types';
import type { ProductDraft } from '../../../../../../packages/site-core/src/drafts';

export interface WeddingEditFormState {
  couple: { brideName: string; groomName: string; displayNames?: string };
  event: { date: string; time?: string; timezone?: string; venueName: string; venueAddress?: string; mapUrl?: string };
  message?: { headline?: string; invitationText?: string; quote?: string };
  story?: { title?: string; items?: Array<{ id: string; title: string; date?: string; description?: string; imageUrl?: string }> };
  schedule?: Array<{ id: string; time?: string; title: string; description?: string; location?: string }>;
  gallery?: Array<{ id: string; src: string; alt?: string; caption?: string }>;
  rsvp?: { enabled: boolean; deadline?: string; contactEmail?: string; contactPhone?: string; formAction?: string };
  gift?: { enabled?: boolean; message?: string; registryUrl?: string };
  music?: { enabled?: boolean; title?: string; src?: string; loop?: boolean };
  assets?: { heroImageUrl?: string; coupleImageUrl?: string; galleryImageUrls?: string[] };
}
const getFields = (d: ProductDraft) => (d.site?.dataModel?.fields ?? {}) as Record<string, unknown>;
const urlOk = (v?: string) => !v || /^https?:\/\//.test(v);
const emailOk = (v?: string) => !v || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
export const weddingEditPanel: ProductEditPanelDefinition<WeddingEditFormState> = {
  productTypes: ['wedding'], label: 'Wedding',
  draftToForm: (d) => { const f = getFields(d); return { couple: (f.couple as WeddingEditFormState['couple']) ?? { brideName: '', groomName: '' }, event: (f.event as WeddingEditFormState['event']) ?? { date: '', venueName: '' }, message: (f.message as WeddingEditFormState['message']) ?? {}, story: (f.story as WeddingEditFormState['story']) ?? {}, schedule: Array.isArray(f.schedule) ? (f.schedule as WeddingEditFormState['schedule']) : [], gallery: Array.isArray(f.gallery) ? (f.gallery as WeddingEditFormState['gallery']) : [], rsvp: (f.rsvp as WeddingEditFormState['rsvp']) ?? { enabled: false }, gift: (f.gift as WeddingEditFormState['gift']) ?? {}, music: (f.music as WeddingEditFormState['music']) ?? {}, assets: (f.assets as WeddingEditFormState['assets']) ?? {} }; },
  validate: (s) => { const e: ProductEditValidationError[] = []; if (!s.couple.brideName?.trim()) e.push({ path: 'couple.brideName', message: 'Bride required' }); if (!s.couple.groomName?.trim()) e.push({ path: 'couple.groomName', message: 'Groom required' }); if (!s.event.date?.trim()) e.push({ path: 'event.date', message: 'Date required' }); if (!s.event.venueName?.trim()) e.push({ path: 'event.venueName', message: 'Venue required' }); s.story?.items?.forEach((x, i) => !x.title?.trim() && e.push({ path: `story.items.${i}.title`, message: 'Story title required' })); s.schedule?.forEach((x, i) => !x.title?.trim() && e.push({ path: `schedule.${i}.title`, message: 'Schedule title required' })); s.gallery?.forEach((x, i) => !x.src?.trim() && e.push({ path: `gallery.${i}.src`, message: 'Gallery src required' })); if (!urlOk(s.event.mapUrl)) e.push({ path: 'event.mapUrl', message: 'Invalid URL' }); if (!emailOk(s.rsvp?.contactEmail)) e.push({ path: 'rsvp.contactEmail', message: 'Invalid email' }); return { ok: e.length === 0, errors: e }; },
  toUpdateRequest: (s) => ({ dataPatch: { couple: s.couple, event: s.event, message: s.message, story: s.story, schedule: s.schedule, gallery: s.gallery, rsvp: s.rsvp, gift: s.gift, music: s.music, assets: s.assets } }),
  Component: () => null
};
