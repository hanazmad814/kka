export * from './types';
export * from './schemas';
export * from './validators';
export * from './scene-node';
export * from './scene-document';
export * from './validation';
export * from './registry';
export * from './renderer';
export * from './assets';

export const OUTCOME_FIRST_PIPELINE = ['INPUT_DATA', 'GENERATE_VARIANTS', 'SELECT_BEST_DESIGN', 'QUICK_EDIT', 'QUALITY_CHECK', 'PUBLISH'] as const;

export const SMART_PRODUCT_CATEGORIES = [
  'wedding-invitation',
  'business-showcase',
  'restaurant-food',
  'ecommerce-catalog',
  'event-campaign',
  'marketing-conversion',
  'social-creator',
  'forms-utility',
  'print-digital-design'
] as const;

export const SMART_PRODUCT_CATALOG = {
  'wedding-invitation': ['wedding-website', 'digital-wedding-invitation', 'save-the-date', 'rsvp-page', 'engagement-invitation', 'birthday-invitation', 'baby-shower-invitation', 'graduation-invitation', 'event-invitation', 'family-invitation', 'traditional-invitation', 'luxury-invitation', 'minimal-invitation', 'animated-invitation', 'interactive-invitation'],
  'business-showcase': ['business-landing-page', 'company-website', 'portfolio-website', 'agency-site', 'freelancer-portfolio', 'startup-landing-page', 'saas-landing-page', 'personal-brand-website', 'coach-website', 'consultant-website', 'real-estate-showcase', 'law-firm-website', 'medical-clinic-site', 'beauty-salon-site', 'gym-fitness-site', 'education-center-site'],
  'restaurant-food': ['restaurant-website', 'cafe-landing-page', 'digital-menu', 'qr-menu', 'food-catalog', 'delivery-landing-page', 'bakery-website', 'bar-lounge-website', 'street-food-landing-page', 'fine-dining-website'],
  'ecommerce-catalog': ['product-catalog', 'product-showcase', 'mini-ecommerce-site', 'collection-landing-page', 'flash-sale-page', 'product-launch-page', 'fashion-lookbook', 'beauty-catalog', 'furniture-catalog', 'jewelry-showcase'],
  'event-campaign': ['event-landing-page', 'concert-page', 'conference-page', 'workshop-page', 'webinar-landing-page', 'festival-website', 'meetup-page', 'registration-page', 'ticket-event-page', 'community-event-site'],
  'marketing-conversion': ['sales-page', 'lead-generation-page', 'funnel-landing-page', 'product-launch-funnel', 'waitlist-page', 'app-download-page', 'affiliate-landing-page', 'campaign-landing-page', 'promo-landing-page', 'viral-campaign-page'],
  'social-creator': ['link-in-bio', 'creator-landing-page', 'influencer-portfolio', 'media-kit', 'streamer-page', 'youtube-creator-site', 'tiktok-creator-page', 'podcast-landing-page', 'music-artist-page'],
  'forms-utility': ['booking-page', 'appointment-page', 'reservation-page', 'contact-form-page', 'rsvp-page', 'registration-page', 'survey-page', 'feedback-page', 'lead-capture-form', 'application-form'],
  'print-digital-design': ['poster', 'brochure', 'flyer', 'banner', 'social-post', 'instagram-story', 'facebook-cover', 'menu-print', 'invitation-card', 'business-card']
} as const;
