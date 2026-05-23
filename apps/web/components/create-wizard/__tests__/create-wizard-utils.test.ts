import { describe, expect, it } from 'vitest';
import { toProductInput } from '../create-wizard.utils';
import { validateWizardState } from '../create-wizard.schema';
import { getProductFormDefinition, getScopeOptionsForProductType, getSupportedProductTypes, productFormToProductInput, validateProductForm } from '../product-forms/product-form-registry';

describe('create wizard multi-product utils', () => {
  it('registry contains all product forms', () => {
    expect(getProductFormDefinition('restaurant_site')).toBeTruthy();
    expect(getProductFormDefinition('business_landing')).toBeTruthy();
    expect(getProductFormDefinition('wedding_invitation')).toBeTruthy();
  });

  it('supported types include restaurant/business/wedding', () => {
    expect(getSupportedProductTypes()).toEqual(expect.arrayContaining(['restaurant_site', 'restaurant_menu', 'business_landing', 'business_website', 'wedding_invitation']));
  });

  it('scope options are product-dependent', () => {
    expect(getScopeOptionsForProductType('restaurant_site').map((o) => o.id)).toEqual(['one_page', 'mini_site_3_pages', 'standard_site_5_pages']);
    expect(getScopeOptionsForProductType('business_landing').map((o) => o.id)).toEqual(['one_page']);
    expect(getScopeOptionsForProductType('business_website').map((o) => o.id)).toEqual(['mini_site_3_pages', 'standard_site_5_pages']);
    expect(getScopeOptionsForProductType('wedding_invitation').map((o) => o.id)).toEqual(['one_page', 'mini_site_3_pages', 'standard_site_5_pages']);
  });

  it('restaurant form validate + map works', () => {
    const sample = getProductFormDefinition('restaurant_site')!.getSampleState();
    expect(validateProductForm('restaurant_site', sample).ok).toBe(true);
    expect(validateProductForm('restaurant_site', { brandName: '', menuItems: [] }).ok).toBe(false);
    const input = toProductInput({ productType: 'restaurant_site', scope: 'one_page', stylePresetId: 'minimal', formState: sample });
    expect(input.productType).toBe('restaurant');
  });

  it('business form validate + map works', () => {
    const sample = getProductFormDefinition('business_landing')!.getSampleState();
    expect(validateProductForm('business_landing', sample).ok).toBe(true);
    expect(validateProductForm('business_landing', { brandName: '', services: [] }).ok).toBe(false);
    expect(validateProductForm('business_landing', { brandName: 'Acme', services: [{ id: 's1', name: '' }] }).ok).toBe(false);
    const input = productFormToProductInput('business_landing', 'one_page', 'modern', sample);
    expect(input?.productType).toBe('business');
  });

  it('wedding form validate + map works', () => {
    const sample = getProductFormDefinition('wedding_invitation')!.getSampleState();
    expect(validateProductForm('wedding_invitation', sample).ok).toBe(true);
    expect(validateProductForm('wedding_invitation', { brideName: '', groomName: '', date: '', venueName: '' }).ok).toBe(false);
    const input = productFormToProductInput('wedding_invitation', 'one_page', 'classic', sample);
    expect(input?.productType).toBe('wedding');
  });

  it('wedding validation fails missing fields from wizard schema', () => {
    const result = validateWizardState({ productType: 'wedding_invitation', scope: 'one_page', stylePresetId: 'classic', formState: { brideName: '', groomName: '', date: '', venueName: '' } });
    expect(result.valid).toBe(false);
  });
});
