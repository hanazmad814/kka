import type { AssetRepository } from './asset-repository.types';
import type { CreateAssetInput, ListAssetsFilter, MediaAsset, UpdateAssetInput } from '../../../core/src/assets';
export class InMemoryAssetRepository implements AssetRepository {
  private readonly items = new Map<string, MediaAsset>();
  async createAsset(input: CreateAssetInput): Promise<MediaAsset> {
    const now = Date.now(); const id = `asset-${crypto.randomUUID()}`;
    const asset: MediaAsset = { ...input, id, meta: { createdAt: now, updatedAt: now } };
    this.items.set(id, asset); return structuredClone(asset);
  }
  async getAssetById(assetId: string): Promise<MediaAsset | null> { const a=this.items.get(assetId); return a?structuredClone(a):null; }
  async listAssets(filter?: ListAssetsFilter): Promise<MediaAsset[]> {
    let list=[...this.items.values()];
    if (filter?.draftId) list=list.filter((x)=>x.draftId===filter.draftId);
    if (filter?.productType) list=list.filter((x)=>x.productType===filter.productType);
    return list.sort((a,b)=>b.meta.createdAt-a.meta.createdAt).map((x)=>structuredClone(x));
  }
  async updateAsset(assetId: string, patch: UpdateAssetInput): Promise<MediaAsset> {
    const existing=this.items.get(assetId); if(!existing) throw new Error('asset_not_found');
    const next={...existing,...patch,meta:{...existing.meta,updatedAt:Date.now()}}; this.items.set(assetId,next); return structuredClone(next);
  }
}
const k='__in_memory_asset_repository__'; const g=globalThis as unknown as Record<string,InMemoryAssetRepository|undefined>;
export const assetRepositorySingleton=g[k]??(g[k]=new InMemoryAssetRepository());
