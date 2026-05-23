'use client';
import { useEffect, useState } from 'react';
import type { MediaAsset } from './asset-types';
import { listAssets, uploadAsset } from './asset-api';
export function AssetPickerField({ label, value, onChange, draftId, productType }: { label: string; value?: string; onChange: (src?: string) => void; draftId?: string; productType?: string }) {
  const [assets, setAssets] = useState<MediaAsset[]>([]);
  useEffect(() => { listAssets({ draftId, productType }).then(setAssets).catch(() => {}); }, [draftId, productType]);
  return <div><label>{label}</label>{value && <img src={value} alt={label} width={80} />}<input type='file' accept='image/png,image/jpeg,image/webp,image/gif' onChange={async (e: { currentTarget: HTMLInputElement })=>{const f=e.currentTarget.files?.[0]; if(!f) return; const a=await uploadAsset(f,{draftId,productType}); onChange(a.src); setAssets(await listAssets({draftId,productType}));}} />
  <select value={value ?? ''} onChange={(e: { currentTarget: HTMLSelectElement })=>onChange(e.currentTarget.value || undefined)}><option value=''>Select from library</option>{assets.map((a)=><option key={a.id} value={a.src}>{a.filename}</option>)}</select>
  <button type='button' onClick={()=>onChange(undefined)}>Remove</button></div>;
}
