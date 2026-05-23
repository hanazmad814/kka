export const weddingBlockVariants = [
  { id:'wedding-hero-centered-names', blockId:'WeddingHeroBlock', layout:'standard', tags:['centered_names'] },
  { id:'wedding-hero-image-background', blockId:'WeddingHeroBlock', layout:'sparse', imageHeavy:true, tags:['image_background','image-heavy'] },
  { id:'wedding-hero-split-couple', blockId:'WeddingHeroBlock', layout:'standard', imageHeavy:true, tags:['split_couple_image','image-heavy'] },
  { id:'wedding-hero-minimal-typography', blockId:'WeddingHeroBlock', layout:'compact', tags:['minimal_typography'] },
  { id:'wedding-hero-floral-frame', blockId:'WeddingHeroBlock', layout:'standard', tags:['floral_frame'] },
  { id:'wedding-hero-editorial-cover', blockId:'WeddingHeroBlock', layout:'dense', tags:['editorial_cover'] },

  { id:'couple-intro-side-by-side', blockId:'CoupleIntroBlock', layout:'standard', tags:['side_by_side'] },
  { id:'couple-intro-stacked', blockId:'CoupleIntroBlock', layout:'compact', tags:['stacked'] },
  { id:'couple-intro-portrait-cards', blockId:'CoupleIntroBlock', layout:'standard', tags:['portrait_cards'] },
  { id:'couple-intro-minimal-names', blockId:'CoupleIntroBlock', layout:'compact', tags:['minimal_names'] },

  { id:'date-venue-calendar-card', blockId:'DateVenueBlock', layout:'standard', tags:['calendar_card'] },
  { id:'date-venue-elegant-line', blockId:'DateVenueBlock', layout:'compact', tags:['elegant_line'] },
  { id:'date-venue-countdown', blockId:'DateVenueBlock', layout:'dense', tags:['countdown_placeholder'] },
  { id:'date-venue-compact-info', blockId:'DateVenueBlock', layout:'compact', tags:['compact_info'] },

  { id:'message-classic-text', blockId:'InvitationMessageBlock', layout:'standard', tags:['classic_text'] },
  { id:'message-quote-first', blockId:'InvitationMessageBlock', layout:'standard', tags:['quote_first'] },
  { id:'message-formal-card', blockId:'InvitationMessageBlock', layout:'compact', tags:['formal_card'] },
  { id:'message-modern-short', blockId:'InvitationMessageBlock', layout:'compact', tags:['modern_short'] },

  { id:'story-vertical-timeline', blockId:'LoveStoryBlock', layout:'dense', tags:['vertical_timeline'] },
  { id:'story-horizontal-timeline', blockId:'LoveStoryBlock', layout:'dense', tags:['horizontal_timeline'] },
  { id:'story-cards', blockId:'LoveStoryBlock', layout:'standard', tags:['story_cards'] },
  { id:'story-simple-paragraph', blockId:'LoveStoryBlock', layout:'compact', tags:['simple_paragraph'] },

  { id:'gallery-grid', blockId:'SmartGalleryBlock', layout:'standard', tags:['grid'] },
  { id:'gallery-masonry', blockId:'SmartGalleryBlock', layout:'dense', tags:['masonry'] },
  { id:'gallery-carousel-placeholder', blockId:'SmartGalleryBlock', layout:'compact', tags:['carousel_placeholder'] },
  { id:'gallery-film-strip', blockId:'SmartGalleryBlock', layout:'compact', tags:['film_strip'] },

  { id:'rsvp-simple-form', blockId:'RSVPBlock', layout:'standard', tags:['simple_form'] },
  { id:'rsvp-card-form', blockId:'RSVPBlock', layout:'standard', tags:['card_form'] },
  { id:'rsvp-contact-only', blockId:'RSVPBlock', layout:'compact', tags:['contact_only'] },
  { id:'rsvp-external-form', blockId:'RSVPBlock', layout:'standard', tags:['button_to_external_form'] },

  { id:'venue-map-embed', blockId:'VenueMapBlock', layout:'standard', tags:['map_embed'] },
  { id:'venue-address-card', blockId:'VenueMapBlock', layout:'compact', tags:['address_card'] },
  { id:'venue-split-map-info', blockId:'VenueMapBlock', layout:'standard', tags:['split_map_info'] },

  { id:'schedule-timeline', blockId:'ScheduleBlock', layout:'dense', tags:['timeline'] },
  { id:'schedule-cards', blockId:'ScheduleBlock', layout:'standard', tags:['cards'] },
  { id:'schedule-compact-list', blockId:'ScheduleBlock', layout:'compact', tags:['compact_list'] },

  { id:'footer-names-date', blockId:'FooterBlock', layout:'compact', tags:['names_date'] },
  { id:'footer-thank-you', blockId:'FooterBlock', layout:'compact', tags:['thank_you'] },
  { id:'footer-minimal', blockId:'FooterBlock', layout:'compact', tags:['minimal'] }
] as const;
