'use client';

export function QualityFilterTabs({ filter, onChange }: { filter: 'all' | 'blocking' | 'warning' | 'info' | 'autofixable'; onChange: (value: 'all' | 'blocking' | 'warning' | 'info' | 'autofixable') => void }) {
  const tabs: Array<typeof filter> = ['all', 'blocking', 'warning', 'info', 'autofixable'];
  return <div>{tabs.map((t) => <button key={t} onClick={() => onChange(t)} disabled={filter === t}>{t}</button>)}</div>;
}
