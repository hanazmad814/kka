import type { AssetStorage } from './asset-storage.types';
import { sanitizeFilename } from '../../../core/src/assets';

// Dev-only placeholder storage (in-memory data URL). TODO: replace with S3/R2 adapter.
export class LocalAssetStorage implements AssetStorage {
  async saveFile(input: { bytes: Uint8Array; filename: string; mimeType: string }): Promise<{ src: string; sizeBytes: number; mimeType: string; filename: string }> {
    const filename = `${Date.now()}-${sanitizeFilename(input.filename)}`;
    let binary = '';
    input.bytes.forEach((b) => { binary += String.fromCharCode(b); });
    const base64 = btoa(binary);
    return { src: `data:${input.mimeType};base64,${base64}`, sizeBytes: input.bytes.byteLength, mimeType: input.mimeType, filename };
  }
}
