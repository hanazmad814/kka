import { describe, expect, it } from 'vitest';
import { sanitizeFilename, detectAssetTypeFromMime, validateUploadMimeAndSize } from '../asset-utils';
describe('asset utils',()=>{
  it('sanitizes filename',()=>expect(sanitizeFilename('../a b?.png')).toBe('.._a_b_.png'));
  it('detects image type',()=>expect(detectAssetTypeFromMime('image/png')).toBe('image'));
  it('rejects unsupported mime',()=>expect(validateUploadMimeAndSize('image/svg+xml',10).ok).toBe(false));
});
