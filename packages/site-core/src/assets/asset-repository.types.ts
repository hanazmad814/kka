import type { CreateAssetInput, ListAssetsFilter, MediaAsset, UpdateAssetInput } from '../../../core/src/assets';
export interface AssetRepository {
  createAsset(input: CreateAssetInput): Promise<MediaAsset>;
  getAssetById(assetId: string): Promise<MediaAsset | null>;
  listAssets(filter?: ListAssetsFilter): Promise<MediaAsset[]>;
  updateAsset(assetId: string, patch: UpdateAssetInput): Promise<MediaAsset>;
}
