import type { PageRecipe } from '../../../product-engine/src/recipes';
const b = (blockId: string) => ({ blockId, props: {} });
export const weddingPageRecipes: Record<string, PageRecipe> = {
  invitation: { id: 'invitation', title: 'Invitation', blocks: [b('WeddingHeroBlock'), b('CoupleIntroBlock'), b('DateVenueBlock'), b('InvitationMessageBlock'), b('ScheduleBlock'), b('SmartGalleryBlock'), b('RSVPBlock'), b('VenueMapBlock'), b('FooterBlock')] },
  home: { id: 'home', title: 'Home', blocks: [b('WeddingHeroBlock'), b('CoupleIntroBlock'), b('DateVenueBlock'), b('InvitationMessageBlock'), b('RSVPBlock')] },
  'story-gallery': { id: 'story-gallery', title: 'Story & Gallery', blocks: [b('LoveStoryBlock'), b('TimelineBlock'), b('CoupleQuoteBlock'), b('SmartGalleryBlock'), b('FeaturedPhotoBlock')] },
  'rsvp-location': { id: 'rsvp-location', title: 'RSVP & Location', blocks: [b('RSVPBlock'), b('ContactFallbackBlock'), b('VenueBlock'), b('VenueMapBlock'), b('ScheduleBlock')] },
  story: { id: 'story', title: 'Story', blocks: [b('LoveStoryBlock'), b('TimelineBlock'), b('CoupleQuoteBlock')] },
  gallery: { id: 'gallery', title: 'Gallery', blocks: [b('SmartGalleryBlock'), b('FeaturedPhotoBlock')] },
  rsvp: { id: 'rsvp', title: 'RSVP', blocks: [b('RSVPBlock'), b('ContactFallbackBlock')] },
  location: { id: 'location', title: 'Location', blocks: [b('VenueBlock'), b('VenueMapBlock'), b('ScheduleBlock'), b('TravelNoteBlock')] }
};
