import { createValidationIssue, type ValidationResult, validResult } from './validation';

export type SceneAssetType = 'image' | 'video' | 'audio' | 'font' | 'document';

export interface SceneAsset {
  id: string;
  type: SceneAssetType;
  url: string;
  mimeType: string;
  sizeBytes?: number;
  createdAtIso?: string;
}

export const validateSceneAsset = (asset: SceneAsset): ValidationResult => {
  const issues = [];
  if (!asset.id) issues.push(createValidationIssue({ code: 'ASSET_ID_REQUIRED', message: 'Asset id is required.', path: 'id', severity: 'error' }));
  if (!asset.url) issues.push(createValidationIssue({ code: 'ASSET_URL_REQUIRED', message: 'Asset url is required.', path: 'url', severity: 'error' }));
  if (!asset.mimeType) issues.push(createValidationIssue({ code: 'ASSET_MIME_REQUIRED', message: 'Asset mimeType is required.', path: 'mimeType', severity: 'error' }));
  return issues.length === 0 ? validResult() : { valid: false, issues };
};
