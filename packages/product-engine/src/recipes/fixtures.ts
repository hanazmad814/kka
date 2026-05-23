import type { BlockDefinition, SiteRecipe } from './types';

export const createBlockDefinitionFixture = (): BlockDefinition => ({
  id: 'hero-basic',
  category: 'hero',
  defaultProps: { heading: 'Welcome' },
  validator: (props) => typeof props.heading === 'string'
});

export const createSiteRecipeFixture = (): SiteRecipe => ({
  id: 'business-basic',
  productType: 'business',
  requiredPages: ['home'],
  pages: [{ id: 'home', title: 'Home', blocks: [{ blockId: 'hero-basic', props: { heading: 'Hello' } }] }],
  inputFields: [{ id: 'businessName', label: 'Business Name', type: 'text', required: true }],
  publishTargets: ['production']
});
