import type { ProductType } from '../types';
export type AssetType = 'image' | 'video' | 'audio' | 'font' | 'document' | 'other';
export interface MediaAsset { id: string; type: AssetType; src: string; filename: string; mimeType: string; sizeBytes: number; width?: number; height?: number; alt?: string; caption?: string; ownerId?: string; draftId?: string; productType?: ProductType; meta: { createdAt: number; updatedAt: number } }
export interface CreateAssetInput extends Omit<MediaAsset, 'id'|'meta'> {}
export interface ListAssetsFilter { draftId?: string; productType?: ProductType }
export interface UpdateAssetInput { alt?: string; caption?: string }
