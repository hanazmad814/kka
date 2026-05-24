import type { ProductEditPanelDefinition, ProductEditValidationError, ProductEditPanelProps } from '../product-edit-panel.types';
import type { ProductDraft } from '../../../../../../packages/site-core/src/drafts';

export interface WeddingEditFormState {
  brideName: string; groomName: string; weddingDate: string; weddingTime?: string; venueName: string; venueAddress?: string; invitationMessage?: string;
  loveStoryItems: Array<{ id: string; title: string; description?: string }>;
  scheduleItems: Array<{ id: string; time?: string; title: string; description?: string }>;
  galleryImages: string[];
  rsvp: { enabled: boolean; deadline?: string; guestLimit?: number };
  giftInfo?: string; backgroundMusic?: string;
}
const getFields = (d: ProductDraft) => (d.site?.dataModel?.fields ?? {}) as Record<string, unknown>;
function WeddingForm({ value, onChange, errors = [] }: ProductEditPanelProps<WeddingEditFormState>) {
  return <div>
    <input placeholder='Bride name' value={value.brideName} onChange={(e)=>onChange({ ...value, brideName: e.target.value })} />
    <input placeholder='Groom name' value={value.groomName} onChange={(e)=>onChange({ ...value, groomName: e.target.value })} />
    <input placeholder='Wedding date' value={value.weddingDate} onChange={(e)=>onChange({ ...value, weddingDate: e.target.value })} />
    <input placeholder='Venue' value={value.venueName} onChange={(e)=>onChange({ ...value, venueName: e.target.value })} />
    {errors.map((e, i)=><p key={i} role='alert'>{e.message}</p>)}
  </div>;
}

export const weddingEditPanel: ProductEditPanelDefinition<WeddingEditFormState> = {
  productTypes: ['wedding'], label: 'Wedding',
  draftToForm: (d) => { const f = getFields(d); const couple = (f.couple as { brideName?: string; groomName?: string } | undefined) ?? {}; const event = (f.event as { date?: string; time?: string; venueName?: string; venueAddress?: string } | undefined) ?? {}; const message = (f.message as { invitationText?: string } | undefined) ?? {}; const rsvp = (f.rsvp as { enabled?: boolean; deadline?: string; guestLimit?: number } | undefined) ?? {}; return { brideName: String(couple.brideName ?? ''), groomName: String(couple.groomName ?? ''), weddingDate: String(event.date ?? ''), weddingTime: String(event.time ?? ''), venueName: String(event.venueName ?? ''), venueAddress: String(event.venueAddress ?? ''), invitationMessage: String(message.invitationText ?? ''), loveStoryItems: Array.isArray((f.story as { items?: unknown[] } | undefined)?.items) ? ((f.story as { items: WeddingEditFormState['loveStoryItems'] }).items) : [], scheduleItems: Array.isArray(f.schedule) ? (f.schedule as WeddingEditFormState['scheduleItems']) : [], galleryImages: Array.isArray(f.galleryImages) ? (f.galleryImages as string[]) : [], rsvp: { enabled: Boolean(rsvp.enabled), deadline: rsvp.deadline, guestLimit: rsvp.guestLimit }, giftInfo: String((f.gift as { message?: string } | undefined)?.message ?? ''), backgroundMusic: String((f.music as { src?: string } | undefined)?.src ?? '') }; },
  validate: (s) => { const e: ProductEditValidationError[] = []; if (!s.brideName.trim()) e.push({ path: 'brideName', message: 'Bride name required' }); if (!s.groomName.trim()) e.push({ path: 'groomName', message: 'Groom name required' }); if (!s.weddingDate.trim()) e.push({ path: 'weddingDate', message: 'Wedding date required' }); if (!s.venueName.trim()) e.push({ path: 'venueName', message: 'Venue required' }); return { ok: e.length === 0, errors: e }; },
  toUpdateRequest: (s) => ({ dataPatch: { couple: { brideName: s.brideName, groomName: s.groomName }, event: { date: s.weddingDate, time: s.weddingTime, venueName: s.venueName, venueAddress: s.venueAddress }, message: { invitationText: s.invitationMessage }, story: { items: s.loveStoryItems }, schedule: s.scheduleItems, galleryImages: s.galleryImages, rsvp: s.rsvp, gift: { message: s.giftInfo }, music: { src: s.backgroundMusic } } }),
  Component: WeddingForm
};
