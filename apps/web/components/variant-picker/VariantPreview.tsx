import { PreviewRenderer } from '../../../../packages/site-core/src/renderer';
import type { PreviewDevice } from './variant-picker.types';
import { DesktopPreviewFrame } from './DesktopPreviewFrame';
import { MobilePreviewFrame } from './MobilePreviewFrame';

export function VariantPreview({ site, device }: { site: { id: string }; device: PreviewDevice }) {
  try {
    const html = PreviewRenderer.render(site as never);
    return device === 'desktop' ? <DesktopPreviewFrame html={html} /> : <MobilePreviewFrame html={html} />;
  } catch {
    return <div>Preview unavailable. Showing safe fallback.</div>;
  }
}
