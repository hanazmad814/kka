'use client';
import { useMemo, useState } from 'react';
import type { DraftQualityCheckResponse } from '../../../../packages/site-core/src/drafts';
import { autoFixIssues, filterPresentedIssues, runQualityCheck } from './quick-edit.quality-api';
import { QualityFilterTabs } from './QualityFilterTabs';
import { QualityIssueList } from './QualityIssueList';
import { QualitySummaryCard } from './QualitySummaryCard';

export function QualityCheckPanel({ draftId, onDraftUpdated, onGoToFix, forced }: { draftId: string; onDraftUpdated: () => void; onGoToFix: (panel: string) => void; forced?: DraftQualityCheckResponse | null }) {
  const [quality, setQuality] = useState<DraftQualityCheckResponse | null>(forced ?? null);
  const [filter, setFilter] = useState<'all' | 'blocking' | 'warning' | 'info' | 'autofixable'>('all');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const issues = useMemo(() => quality ? filterPresentedIssues(quality.presentation, filter) : [], [quality, filter]);

  const check = async () => {
    setBusy(true); setError('');
    try { setQuality(await runQualityCheck(draftId)); } catch (e) { setError(e instanceof Error ? e.message : 'Check failed'); }
    finally { setBusy(false); }
  };

  const autoFix = async (issueId?: string) => {
    setBusy(true); setError('');
    try {
      const response = await autoFixIssues(draftId, issueId ? { issueIds: [issueId] } : { fixAllSafe: true });
      onDraftUpdated();
      setQuality({ ok: true, draftId, checkedAt: Date.now(), result: response.remainingQuality, presentation: response.presentation });
    } catch (e) { setError(e instanceof Error ? e.message : 'Auto-fix failed'); }
    finally { setBusy(false); }
  };

  return <section>
    <h2>Quality Check</h2>
    <button onClick={() => void check()} disabled={busy}>{busy ? 'Checking...' : 'Run Check'}</button>
    <button onClick={() => void autoFix()} disabled={busy || !quality?.presentation.some((x) => x.autoFixable)}>Auto Fix All Safe</button>
    {error && <p role='alert'>{error}</p>}
    <QualitySummaryCard result={quality?.result ?? null} />
    <QualityFilterTabs filter={filter} onChange={setFilter} />
    <QualityIssueList issues={issues} onAutoFix={(id) => void autoFix(id)} onGoToFix={onGoToFix} />
  </section>;
}
