export type ProductCategory =
  | 'wedding-invitation'
  | 'business-showcase'
  | 'restaurant-food'
  | 'ecommerce-catalog'
  | 'event-campaign'
  | 'marketing-conversion'
  | 'social-creator'
  | 'forms-utility'
  | 'print-digital-design';

export type ProductType =
  | 'wedding-website'
  | 'digital-wedding-invitation'
  | 'save-the-date'
  | 'rsvp-page'
  | 'engagement-invitation'
  | 'birthday-invitation'
  | 'baby-shower-invitation'
  | 'graduation-invitation'
  | 'event-invitation'
  | 'family-invitation'
  | 'traditional-invitation'
  | 'luxury-invitation'
  | 'minimal-invitation'
  | 'animated-invitation'
  | 'interactive-invitation'
  | 'business-landing-page'
  | 'company-website'
  | 'portfolio-website'
  | 'agency-site'
  | 'freelancer-portfolio'
  | 'startup-landing-page'
  | 'saas-landing-page'
  | 'personal-brand-website'
  | 'coach-website'
  | 'consultant-website'
  | 'real-estate-showcase'
  | 'law-firm-website'
  | 'medical-clinic-site'
  | 'beauty-salon-site'
  | 'gym-fitness-site'
  | 'education-center-site'
  | 'restaurant-website'
  | 'cafe-landing-page'
  | 'digital-menu'
  | 'qr-menu'
  | 'food-catalog'
  | 'delivery-landing-page'
  | 'bakery-website'
  | 'bar-lounge-website'
  | 'street-food-landing-page'
  | 'fine-dining-website'
  | 'product-catalog'
  | 'product-showcase'
  | 'mini-ecommerce-site'
  | 'collection-landing-page'
  | 'flash-sale-page'
  | 'product-launch-page'
  | 'fashion-lookbook'
  | 'beauty-catalog'
  | 'furniture-catalog'
  | 'jewelry-showcase'
  | 'event-landing-page'
  | 'concert-page'
  | 'conference-page'
  | 'workshop-page'
  | 'webinar-landing-page'
  | 'festival-website'
  | 'meetup-page'
  | 'registration-page'
  | 'ticket-event-page'
  | 'community-event-site'
  | 'sales-page'
  | 'lead-generation-page'
  | 'funnel-landing-page'
  | 'product-launch-funnel'
  | 'waitlist-page'
  | 'app-download-page'
  | 'affiliate-landing-page'
  | 'campaign-landing-page'
  | 'promo-landing-page'
  | 'viral-campaign-page'
  | 'link-in-bio'
  | 'creator-landing-page'
  | 'influencer-portfolio'
  | 'media-kit'
  | 'streamer-page'
  | 'youtube-creator-site'
  | 'tiktok-creator-page'
  | 'podcast-landing-page'
  | 'music-artist-page'
  | 'booking-page'
  | 'appointment-page'
  | 'reservation-page'
  | 'contact-form-page'
  | 'survey-page'
  | 'feedback-page'
  | 'lead-capture-form'
  | 'application-form'
  | 'poster'
  | 'brochure'
  | 'flyer'
  | 'banner'
  | 'social-post'
  | 'instagram-story'
  | 'facebook-cover'
  | 'menu-print'
  | 'invitation-card'
  | 'business-card'
  | (string & {});

export interface ProductDataModel {
  id: string;
  schemaVersion: string;
  productType?: ProductType;
  productCategory?: ProductCategory;
  fields: Record<string, unknown>;
}

export interface SeededRandom {
  readonly seed: string;
  next(): number;
  nextInt(maxExclusive: number): number;
}

export type GenerationPipelineStep =
  | 'INPUT_DATA'
  | 'GENERATE_VARIANTS'
  | 'SELECT_BEST_DESIGN'
  | 'QUICK_EDIT'
  | 'QUALITY_CHECK'
  | 'PUBLISH';

export interface OutcomeFirstPipelineState {
  draftId: string;
  steps: GenerationPipelineStep[];
  currentStep: GenerationPipelineStep;
  qualityScore?: number;
  publishReady: boolean;
}

export type { ValidationIssue, ValidationResult } from './validation';
export type { BaseSceneNode, TextNode, ImageNode, ShapeNode, ButtonNode, GroupNode, FrameNode, ProductBlockNode, FormNode, EmbedNode, CollectionNode, IconNode, VideoNode, AudioNode, SceneNode } from './scene-node';
export type { SceneAsset, ScenePage, SceneDocument } from './scene-document';

import type { SceneDocument } from './scene-document';
export interface PublishedSiteSnapshot {
  id: string;
  createdAtIso: string;
  productType: ProductType;
  scene: SceneDocument;
  data: ProductDataModel;
}
