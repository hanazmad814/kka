import { describe, expect, it } from 'vitest';
import { AssetService } from '../asset-service';
import { InMemoryAssetRepository } from '../in-memory-asset-repository';

describe('asset service',()=>{
  it('uploads valid image', async()=>{
    const storage={ saveFile: async (x:{bytes:Uint8Array;filename:string;mimeType:string})=>({src:'/uploads/a.png',sizeBytes:x.bytes.byteLength,mimeType:x.mimeType,filename:x.filename}) };
    const svc=new AssetService(new InMemoryAssetRepository(), storage);
    const asset=await svc.uploadImage({ bytes:new Uint8Array([1,2]), filename:'a.png', mimeType:'image/png'});
    expect(asset.src).toBe('/uploads/a.png');
  });
});
