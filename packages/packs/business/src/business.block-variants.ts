export const businessBlockVariants = [
  { id: 'hero-centered', blockId: 'BusinessHeroBlock', layout: 'standard', tags: ['centered', 'conversion'] },
  { id: 'hero-split-image', blockId: 'BusinessHeroBlock', layout: 'standard', imageHeavy: true, tags: ['split_image', 'image-heavy'] },
  { id: 'hero-image-background', blockId: 'BusinessHeroBlock', layout: 'sparse', imageHeavy: true, tags: ['image_background', 'image-heavy'] },
  { id: 'hero-minimal-typography', blockId: 'BusinessHeroBlock', layout: 'compact', tags: ['minimal_typography'] },
  { id: 'hero-conversion-focused', blockId: 'BusinessHeroBlock', layout: 'dense', tags: ['conversion_focused'] },

  { id: 'services-card-grid', blockId: 'ServiceCardsBlock', layout: 'standard', tags: ['card_grid'] },
  { id: 'services-icon-list', blockId: 'ServiceCardsBlock', layout: 'dense', tags: ['icon_list'] },
  { id: 'services-horizontal-rows', blockId: 'ServiceCardsBlock', layout: 'sparse', tags: ['horizontal_rows', 'sparse'] },
  { id: 'services-compact-grid', blockId: 'ServiceCardsBlock', layout: 'compact', tags: ['compact_grid'] },

  { id: 'pricing-three-cards', blockId: 'PricingTableBlock', layout: 'standard', tags: ['three_cards', 'pricing-table'] },
  { id: 'pricing-comparison-table', blockId: 'PricingTableBlock', layout: 'dense', tags: ['comparison_table', 'pricing-table'] },
  { id: 'pricing-single-offer', blockId: 'PricingTableBlock', layout: 'compact', tags: ['single_offer', 'pricing-table'] },
  { id: 'pricing-minimal-list', blockId: 'PricingTableBlock', layout: 'compact', tags: ['minimal_list', 'pricing-table'] },

  { id: 'cta-centered', blockId: 'CTASectionBlock', layout: 'standard', tags: ['centered'] },
  { id: 'cta-split', blockId: 'CTASectionBlock', layout: 'standard', tags: ['split'] },
  { id: 'cta-sticky-mobile', blockId: 'CTASectionBlock', layout: 'compact', tags: ['sticky_mobile_cta'] },
  { id: 'cta-banner', blockId: 'CTASectionBlock', layout: 'dense', tags: ['banner'] },

  { id: 'contact-simple-form', blockId: 'ContactLeadFormBlock', layout: 'standard', tags: ['simple_form'] },
  { id: 'contact-split', blockId: 'ContactLeadFormBlock', layout: 'standard', tags: ['split_contact'] },
  { id: 'contact-booking-cta', blockId: 'ContactLeadFormBlock', layout: 'compact', tags: ['booking_cta'] },

  { id: 'faq-accordion', blockId: 'FAQBlock', layout: 'standard', tags: ['accordion'] },
  { id: 'faq-two-column', blockId: 'FAQBlock', layout: 'standard', tags: ['two_column'] },
  { id: 'faq-simple-list', blockId: 'FAQBlock', layout: 'compact', tags: ['simple_list'] }
] as const;
