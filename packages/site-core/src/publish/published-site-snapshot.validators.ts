import type { PublishedSiteSnapshot } from './published-site-snapshot.types';

export function validatePublishedSiteSnapshot(snapshot: PublishedSiteSnapshot): { valid: boolean; message?: string } {
  if (!snapshot.id || !snapshot.draftId || !snapshot.siteId) return { valid: false, message: 'missing ids' };
  if (snapshot.version < 1) return { valid: false, message: 'invalid version' };
  if (!snapshot.routes.length) return { valid: false, message: 'routes required' };
  if (!snapshot.meta.publishedAt) return { valid: false, message: 'publishedAt required' };
  return { valid: true };
}
