export interface SaveAssetFileInput { bytes: Uint8Array; filename: string; mimeType: string }
export interface AssetStorage { saveFile(input: SaveAssetFileInput): Promise<{ src: string; sizeBytes: number; mimeType: string; filename: string }> }
