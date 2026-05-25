export interface AiStructuredPatch {
  target: 'ProductDataModel' | 'SiteRecipe' | 'DesignGenome';
  operations: Array<{ op: 'set' | 'unset'; path: string; value?: unknown }>;
  rationale: string;
  confidence: number;
}

export interface AiPatchRequest {
  draftId: string;
  instruction: string;
  currentData: Record<string, unknown>;
}

export interface AiPatchService {
  suggestPatch(input: AiPatchRequest): Promise<AiStructuredPatch>;
}
