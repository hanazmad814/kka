import type { ProductType } from '../../../core/src/index';

export type PublishTarget = 'production' | 'staging';

export interface ProductInputField {
  id: string;
  label: string;
  type: 'text' | 'number' | 'email' | 'select';
  required: boolean;
}

export interface BlockDefinition {
  id: string;
  category: 'hero' | 'content' | 'cta' | 'gallery' | 'footer' | (string & {});
  defaultProps: Record<string, unknown>;
  validator: (props: Record<string, unknown>) => boolean;
}

export interface BlockPlan {
  blockId: string;
  props: Record<string, unknown>;
}

export interface PageRecipe {
  id: string;
  title: string;
  blocks: BlockPlan[];
}

export interface SiteRecipe {
  id: string;
  productType: ProductType;
  requiredPages: string[];
  pages: PageRecipe[];
  inputFields: ProductInputField[];
  publishTargets: PublishTarget[];
}
