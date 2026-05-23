'use client';
import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { PreviewDevice, VariantPickerProps } from './variant-picker.types';
import { getVariantLabel } from './variant-picker.utils';
import { VariantCard } from './VariantCard';
import { VariantPreview } from './VariantPreview';
import { VariantPageList } from './VariantPageList';
import { VariantCompareBar } from './VariantCompareBar';
import { clearGeneratedVariants, saveSelectedVariant } from './variant-picker.storage';
import { selectVariant } from './variant-picker.api';

export function VariantPicker({ variants, initialSelectedId, onSelect }: VariantPickerProps) {
  const router = useRouter();
  const [device, setDevice] = useState<PreviewDevice>('desktop');
  const [selectedId, setSelectedId] = useState<string>(initialSelectedId ?? variants[0]?.id ?? '');
  const [selectingId, setSelectingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const selected = useMemo(() => variants.find((v) => v.id === selectedId) ?? variants[0], [variants, selectedId]);

  if (!variants.length) return <section><h1>Choose your best version</h1><p>No generated variants found.</p><a href='/create'>Back to Create Wizard</a></section>;

  const handleSelect = async (id: string) => {
    const variant = variants.find((v) => v.id === id);
    if (!variant || (variant.quality?.blockingCount ?? 0) > 0) return;
    setSelectingId(id); setError(null);
    try {
      const result = await selectVariant(variant);
      saveSelectedVariant(variant);
      clearGeneratedVariants();
      onSelect?.(variant);
      router.push(result.redirectTo);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Select failed');
    } finally {
      setSelectingId(null);
    }
  };

  return <section>
    <h1>Choose your best version</h1>
    <p>We generated multiple ready-to-use versions. Pick one to continue.</p>
    <p>{variants.length} variants generated</p>
    <div>
      {variants.map((v, i) => <VariantCard key={v.id} label={getVariantLabel(i)} variant={v} onPreview={() => setSelectedId(v.id)} onSelect={() => void handleSelect(v.id)} selecting={selectingId===v.id} />)}
    </div>
    {error && <p role='alert'>{error}</p>}
    {selected && <div>
      <button onClick={() => setDevice('desktop')}>Desktop</button>
      <button onClick={() => setDevice('mobile')}>Mobile</button>
      <VariantPreview site={selected.site as never} device={device} />
      <VariantCompareBar total={selected.score?.total} mobile={selected.score?.mobileQuality} content={selected.score?.contentFit} />
      <VariantPageList pages={selected.site.siteMap.pages} />
    </div>}
  </section>;
}
