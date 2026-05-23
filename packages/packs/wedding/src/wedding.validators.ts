import type { WeddingInput } from './wedding.types';
const urlOk = (value?: string) => !value || /^https?:\/\//.test(value);
const emailOk = (value?: string) => !value || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
export const validateWeddingInput = (input: WeddingInput): { valid: boolean; issues: string[] } => {
  const issues: string[] = [];
  if (!input.data.couple?.brideName?.trim()) issues.push('brideName required');
  if (!input.data.couple?.groomName?.trim()) issues.push('groomName required');
  if (!input.data.event?.date?.trim()) issues.push('date required');
  if (!input.data.event?.venueName?.trim()) issues.push('venueName required');
  input.data.gallery?.forEach((g, i) => { if (!g.src?.trim()) issues.push(`gallery[${i}].src required`); });
  input.data.story?.items?.forEach((s, i) => { if (!s.title?.trim()) issues.push(`story.items[${i}].title required`); });
  input.data.schedule?.forEach((s, i) => { if (!s.title?.trim()) issues.push(`schedule[${i}].title required`); });
  if (!urlOk(input.data.event?.mapUrl)) issues.push('event.mapUrl invalid');
  if (!urlOk(input.data.gift?.registryUrl)) issues.push('gift.registryUrl invalid');
  if (!urlOk(input.data.music?.src)) issues.push('music.src invalid');
  if (!emailOk(input.data.rsvp?.contactEmail)) issues.push('rsvp.contactEmail invalid');
  return { valid: issues.length === 0, issues };
};
