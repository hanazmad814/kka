export interface AiStructuredPatch {
  target: 'ProductDataModel' | 'SiteRecipe' | 'DesignGenome';
  operations: Array<{ op: 'set' | 'unset'; path: string; value?: unknown }>;
  rationale: string;
}
