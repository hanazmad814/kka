import { detectAssetTypeFromMime, sanitizeFilename, validateUploadMimeAndSize } from '../../../core/src/assets';
import type { AssetRepository } from './asset-repository.types';
import type { AssetStorage } from './asset-storage.types';
import type { MediaAsset } from '../../../core/src/assets';
export class AssetService {
  constructor(private repo: AssetRepository, private storage: AssetStorage) {}
  async uploadImage(input: { bytes: Uint8Array; filename: string; mimeType: string; draftId?: string; productType?: string; alt?: string; caption?: string }): Promise<MediaAsset> {
    const v = validateUploadMimeAndSize(input.mimeType, input.bytes.byteLength); if (!v.ok) throw new Error(v.code);
    const saved = await this.storage.saveFile({ bytes: input.bytes, filename: sanitizeFilename(input.filename), mimeType: input.mimeType });
    return this.repo.createAsset({ type: detectAssetTypeFromMime(saved.mimeType), src: saved.src, filename: saved.filename, mimeType: saved.mimeType, sizeBytes: saved.sizeBytes, draftId: input.draftId, productType: input.productType as never, alt: input.alt, caption: input.caption });
  }
}
