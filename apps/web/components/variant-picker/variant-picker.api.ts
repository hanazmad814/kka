import type { SelectVariantResponse } from '../../../../packages/site-core/src/drafts';
import type { VariantPickerVariant } from './variant-picker.types';

export async function selectVariant(variant: VariantPickerVariant): Promise<SelectVariantResponse> {
  const res = await fetch('/api/select-variant', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(variant) });
  const json = await res.json() as SelectVariantResponse | { ok: false; error: { message: string } };
  if (!res.ok || !('ok' in json) || !json.ok) throw new Error('error' in json ? json.error.message : 'Select variant failed');
  return json;
}
