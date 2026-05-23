'use client';
import { useEffect, useState } from 'react';
import type { ProductDraft } from '../../../../../packages/site-core/src/drafts';
import { getDraftVersion, listDraftVersions, rollbackDraft } from './version-history.api';
import type { DraftVersionListItem, ProductDraftVersion } from './version-history.types';

export function VersionHistoryPanel({ draft, dirty, onRollback }: { draft: ProductDraft; dirty: boolean; onRollback: (next: ProductDraft) => void }) {
  const [versions, setVersions] = useState<DraftVersionListItem[]>([]);
  const [selected, setSelected] = useState<ProductDraftVersion | null>(null);
  const [error, setError] = useState('');
  useEffect(() => { listDraftVersions(draft.id).then(setVersions).catch(() => setError('Failed to load versions')); }, [draft.id]);
  return <div>
    {error && <p role='alert'>{error}</p>}
    <ul>{versions.map((v) => <li key={v.id}><button onClick={async()=>setSelected(await getDraftVersion(draft.id,v.id))}>v{v.versionNumber} {v.source} {v.summary ?? ''}</button></li>)}</ul>
    {selected && <div><pre>{JSON.stringify({ version: selected.versionNumber, source: selected.source, createdAt: selected.meta.createdAt }, null, 2)}</pre>
      <button disabled={dirty} onClick={async()=>{ if(!confirm('Rollback will replace current draft content with this version.')) return; const out=await rollbackDraft(draft.id, selected.id); onRollback(out.draft); }}>Rollback</button>
      {dirty && <p>You have unsaved changes. Save or discard them before rollback.</p>}
    </div>}
  </div>;
}
