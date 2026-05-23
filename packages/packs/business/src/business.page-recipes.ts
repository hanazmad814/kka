import type { PageRecipe } from '../../../product-engine/src/recipes';
const b = (blockId: string) => ({ blockId, props: {} });
export const businessPageRecipes: Record<string, PageRecipe> = {
  landing: { id: 'landing', title: 'Landing', blocks: [b('BusinessHeroBlock'), b('ProblemSolutionBlock'), b('BenefitBlock'), b('ServiceCardsBlock'), b('SocialProofBlock'), b('PricingPreviewBlock'), b('FAQBlock'), b('CTASectionBlock'), b('ContactLeadFormBlock')] },
  home: { id: 'home', title: 'Home', blocks: [b('BusinessHeroBlock'), b('BenefitBlock'), b('ServicePreviewBlock'), b('TestimonialStripBlock'), b('CTASectionBlock')] },
  services: { id: 'services', title: 'Services', blocks: [b('ServicesHeroBlock'), b('ServiceCardsBlock'), b('ProcessBlock'), b('CTASectionBlock')] },
  pricing: { id: 'pricing', title: 'Pricing', blocks: [b('PricingHeroBlock'), b('PricingTableBlock'), b('FAQBlock'), b('CTASectionBlock')] },
  about: { id: 'about', title: 'About', blocks: [b('AboutHeroBlock'), b('StoryBlock'), b('ValuesBlock'), b('TeamBlock'), b('CTASectionBlock')] },
  contact: { id: 'contact', title: 'Contact', blocks: [b('ContactHeroBlock'), b('ContactLeadFormBlock'), b('ContactInfoBlock'), b('MapEmbedBlock'), b('SocialLinksBlock')] }
};
