import type { BlockDefinition } from '../../../product-engine/src/recipes';
const block=(id:string,category:BlockDefinition['category']='content'):BlockDefinition=>({id,category,defaultProps:{variant:'default'},validator:()=>true});
export const weddingBlockDefinitions: BlockDefinition[] = [
  block('WeddingHeroBlock','hero'), block('CoupleIntroBlock'), block('DateVenueBlock'), block('InvitationMessageBlock'), block('LoveStoryBlock'), block('TimelineBlock'), block('SmartGalleryBlock','gallery'), block('FeaturedPhotoBlock','gallery'), block('RSVPBlock','cta'), block('VenueBlock'), block('VenueMapBlock'), block('ScheduleBlock'), block('TravelNoteBlock'), block('GiftInfoBlock'), block('CoupleQuoteBlock'), block('FooterBlock','footer'), block('BackgroundMusicBlock'), block('ContactFallbackBlock','cta')
];
