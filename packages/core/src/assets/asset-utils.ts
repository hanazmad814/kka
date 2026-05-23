import type { AssetType, MediaAsset } from './asset.types';
export const MAX_ASSET_UPLOAD_BYTES = 10 * 1024 * 1024;
export const ALLOWED_IMAGE_MIME_TYPES = ['image/jpeg','image/png','image/webp','image/gif'] as const;
export const sanitizeFilename = (name: string) => name.replace(/[^a-zA-Z0-9._-]/g, '_').slice(0, 120) || 'asset';
export const detectAssetTypeFromMime = (mime: string): AssetType => mime.startsWith('image/') ? 'image' : mime.startsWith('video/') ? 'video' : mime.startsWith('audio/') ? 'audio' : 'other';
export const validateUploadMimeAndSize = (mime: string, size: number) => {
  if (!ALLOWED_IMAGE_MIME_TYPES.includes(mime as never)) return { ok: false as const, code: 'unsupported_file_type' };
  if (size > MAX_ASSET_UPLOAD_BYTES) return { ok: false as const, code: 'file_too_large' };
  return { ok: true as const };
};
export const assetToImageInput = (asset: MediaAsset | null | undefined) => asset ? ({ assetId: asset.id, src: asset.src, alt: asset.alt }) : null;
