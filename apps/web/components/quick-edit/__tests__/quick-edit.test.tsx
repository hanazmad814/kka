import { describe, expect, it } from 'vitest';
import { draftToQuickEditForm, quickEditFormToUpdateRequest } from '../quick-edit.mapper';
import { createProductDraftFixture } from '../../../../../packages/site-core/src/drafts';
import { getProductEditPanelDefinition, getSupportedQuickEditProductTypes, validateProductEditForm } from '../product-panels/product-edit-panel-registry';

describe('quick-edit mapper', () => {
  it('registry supports all product panels', () => {
    expect(getProductEditPanelDefinition('restaurant')).toBeTruthy();
    expect(getProductEditPanelDefinition('business')).toBeTruthy();
    expect(getProductEditPanelDefinition('wedding')).toBeTruthy();
    expect(getSupportedQuickEditProductTypes()).toEqual(expect.arrayContaining(['restaurant', 'business', 'wedding']));
  });

  it('restaurant mapping/validation works', () => {
    const draft = createProductDraftFixture();
    draft.productType = 'restaurant'; draft.site.productType = 'restaurant';
    draft.site.dataModel.fields = { brandName: 'Demo', menuItems: [{ id: '1', name: 'Soup' }] };
    const form = draftToQuickEditForm(draft);
    const update = quickEditFormToUpdateRequest(draft.productType, form);
    expect((update.dataPatch as Record<string, unknown>).brandName).toBe('Demo');
    expect(validateProductEditForm('restaurant', { brandName: '', menuItems: [] }).ok).toBe(false);
  });

  it('business mapping/validation works', () => {
    const draft = createProductDraftFixture();
    draft.productType = 'business'; draft.site.productType = 'business';
    draft.site.dataModel.fields = { brandName: 'Acme', services: [{ id: 's1', name: 'Advisory' }] };
    const form = draftToQuickEditForm(draft);
    const update = quickEditFormToUpdateRequest(draft.productType, form);
    expect((update.dataPatch as Record<string, unknown>).brandName).toBe('Acme');
    expect(validateProductEditForm('business', { brandName: '', services: [] }).ok).toBe(false);
  });

  it('wedding mapping/validation works', () => {
    const draft = createProductDraftFixture();
    draft.productType = 'wedding'; draft.site.productType = 'wedding';
    draft.site.dataModel.fields = { couple: { brideName: 'A', groomName: 'B' }, event: { date: '2026-01-01', venueName: 'Hall' } };
    const form = draftToQuickEditForm(draft);
    const update = quickEditFormToUpdateRequest(draft.productType, form);
    expect((update.dataPatch as Record<string, unknown>).couple).toBeTruthy();
    expect(validateProductEditForm('wedding', { couple: { brideName: '', groomName: '' }, event: { date: '', venueName: '' } }).ok).toBe(false);
  });
});
