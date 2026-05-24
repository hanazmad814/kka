'use client';
import { useMemo, useState } from 'react';
import type { ProductDraft } from '../../../../packages/site-core/src/drafts';
import { draftToQuickEditForm, quickEditFormToUpdateRequest } from './quick-edit.mapper';
import { getProductEditPanelDefinition } from './product-panels/product-edit-panel-registry';
import { validateQuickEditForm } from './quick-edit.schema';
import { patchDraft, publishDraft } from './quick-edit.api';
import { QualityCheckPanel } from './QualityCheckPanel';
import { VersionHistoryPanel } from './version-history/VersionHistoryPanel';
import type { DraftQualityCheckResponse } from '../../../../packages/site-core/src/drafts';
import { runQualityCheck } from './quick-edit.quality-api';

export function QuickEditShell({ draft }: { draft: ProductDraft }) {
  const [currentDraft, setCurrentDraft] = useState(draft);
  const [form, setForm] = useState(draftToQuickEditForm(draft));
  const [initial, setInitial] = useState(draftToQuickEditForm(draft));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);

  const [publishing, setPublishing] = useState(false);
  const [publishError, setPublishError] = useState('');
  const [publishResult, setPublishResult] = useState<null | { publicUrl: string; version: number }>(null);
  const [latestQuality, setLatestQuality] = useState<DraftQualityCheckResponse | null>(null);
  const [activePanel, setActivePanel] = useState<'content' | 'style' | 'quality' | 'versions'>('content');
  const [showAdvancedJson, setShowAdvancedJson] = useState(false);

  const isDirty = useMemo(() => JSON.stringify(form) !== JSON.stringify(initial), [form, initial]);
  const validation = validateQuickEditForm(currentDraft.productType, form);
  const panelDef = getProductEditPanelDefinition(currentDraft.productType);
  const PanelComponent = panelDef?.Component as ((props: { value: unknown; onChange: (next: unknown) => void; errors?: unknown[] }) => JSX.Element) | undefined;

  const onPublish = async () => {
    setPublishing(true); setPublishError('');
    try {
      const checked = await runQualityCheck(currentDraft.id);
      setLatestQuality(checked);
      if (checked.result.blockingCount > 0) {
        setPublishError('Fix blockers in Quality tab before publish.');
        setActivePanel('quality');
        return;
      }
      const result = await publishDraft(currentDraft.id);
      setPublishResult({ publicUrl: result.publicUrl, version: result.version });
    } catch (e) {
      setPublishError(e instanceof Error ? e.message : 'Publish failed');
    } finally { setPublishing(false); }
  };

  const save = async () => {
    setSaving(true); setError(''); setSaved(false);
    try {
      const updated = await patchDraft(currentDraft.id, quickEditFormToUpdateRequest(currentDraft.productType, form));
      setCurrentDraft(updated);
      const nextForm = draftToQuickEditForm(updated);
      setForm(nextForm);
      setInitial(nextForm);
      setSaved(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Save failed');
    } finally { setSaving(false); }
  };

  return <section>
    <h1>Quick Edit</h1>

    <nav>
      <button onClick={() => setActivePanel('content')} disabled={activePanel==='content'}>Content</button>
      <button onClick={() => setActivePanel('style')} disabled={activePanel==='style'}>Style</button>
      <button onClick={() => setActivePanel('quality')} disabled={activePanel==='quality'}>Quality</button>
      <button onClick={() => setActivePanel('versions')} disabled={activePanel==='versions'}>Versions</button>
    </nav>

    <p>Draft: {currentDraft.id}</p>
    {activePanel === 'content' && <>
    {!panelDef && <p>Quick Edit for this product type is not available yet.</p>}
    {panelDef && <>
      <p>Product: {currentDraft.productType}</p>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16 }}>
        <div>
          {PanelComponent && <PanelComponent value={form as never} onChange={(next) => setForm(next)} errors={validation.errors as never} />}
          <button onClick={() => setShowAdvancedJson(!showAdvancedJson)}>{showAdvancedJson ? 'Hide Advanced JSON' : 'Advanced JSON'}</button>
          {showAdvancedJson && <label>JSON Data Patch Model
            <textarea value={JSON.stringify(form, null, 2)} onChange={(e: { target: { value: string } }) => {
              try { setForm(JSON.parse(e.target.value) as unknown); } catch {}
            }} rows={16} cols={80} />
          </label>}
        </div>
        <aside><p>Live preview</p>{publishResult?.publicUrl ? <a href={publishResult.publicUrl} target='_blank' rel='noreferrer'>Open public preview</a> : <p>Publish to generate public URL preview.</p>}</aside>
      </div>
      {!validation.valid && <p role='alert'>{String(validation.errors[0] ?? '')}</p>}
      {error && <p role='alert'>{error}</p>}
      {saved && <p>Saved.</p>}
      <button disabled={!isDirty || !validation.valid || saving} onClick={() => void save()}>{saving ? 'Saving...' : 'Save changes'}</button>
    </>}

    </>}
    {activePanel === 'style' && <p>Style switching will be expanded later.</p>}
    {activePanel === 'quality' && <QualityCheckPanel draftId={currentDraft.id} forced={latestQuality} onDraftUpdated={() => setSaved(true)} onGoToFix={(panel) => { if (panel === 'style') setActivePanel('style'); else setActivePanel('content'); }} />}
    {activePanel === 'versions' && <VersionHistoryPanel draft={currentDraft} dirty={isDirty} onRollback={(next)=>{ setCurrentDraft(next); const f=draftToQuickEditForm(next); setForm(f); setInitial(f); setSaved(true); }} />}
    <div>
      <button disabled={publishing || saving} onClick={() => void onPublish()}>{publishing ? 'Publishing...' : 'Publish'}</button>
      <button onClick={() => setActivePanel('quality')}>Run quality check</button>
      {publishError && <p role='alert'>{publishError}</p>}
      {publishResult && <p>Published v{publishResult.version}: <a href={publishResult.publicUrl} target='_blank' rel='noreferrer'>{publishResult.publicUrl}</a></p>}
    </div>

  </section>;
}
