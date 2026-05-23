import type { ProductType } from '../../../../packages/core/src';
import { validateProductEditForm } from './product-panels/product-edit-panel-registry';
export function validateQuickEditForm(productType: ProductType, form: unknown): { valid: boolean; errors: string[] } {
  const r = validateProductEditForm(productType, form);
  return { valid: r.ok, errors: r.errors.map((e) => e.message) };
}
