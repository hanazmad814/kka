import type { VariantPickerVariant } from './variant-picker.types';
import { getPageCount, hasBlocking } from './variant-picker.utils';
import { VariantScoreBadge } from './VariantScoreBadge';
import { VariantQualitySummary } from './VariantQualitySummary';
import { VariantReasons } from './VariantReasons';

export function VariantCard({ label, variant, onPreview, onSelect, selecting = false }: { label: string; variant: VariantPickerVariant; onPreview: () => void; onSelect: () => void; selecting?: boolean }) {
  const blocking = hasBlocking(variant);
  return <article>
    <h3>{label}</h3>
    <VariantScoreBadge score={variant.score?.total} />
    <p>Pages: {getPageCount(variant)}</p>
    <VariantQualitySummary blocking={variant.quality?.blockingCount} warning={variant.quality?.warningCount} info={variant.quality?.infoCount} />
    <VariantReasons reasons={variant.reasons} />
    <button onClick={onPreview}>Preview</button>
    <button onClick={onSelect} disabled={blocking || !variant.site || selecting}>{blocking ? 'Blocked' : (selecting ? 'Selecting...' : 'Select this variant')}</button>
  </article>;
}
