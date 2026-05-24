import { describe, expect, it } from 'vitest';
import { draftToQuickEditForm, quickEditFormToUpdateRequest } from '../quick-edit.mapper';
import { createProductDraftFixture } from '../../../../../packages/site-core/src/drafts';
import { getProductEditPanelDefinition, getSupportedQuickEditProductTypes, validateProductEditForm } from '../product-panels/product-edit-panel-registry';

describe('quick-edit mapper and panel registry', () => {
  it('registry supports all product panels', () => {
    expect(getProductEditPanelDefinition('restaurant')).toBeTruthy();
    expect(getProductEditPanelDefinition('business')).toBeTruthy();
    expect(getProductEditPanelDefinition('wedding')).toBeTruthy();
    expect(getSupportedQuickEditProductTypes()).toEqual(expect.arrayContaining(['restaurant', 'business', 'wedding']));
  });

  it('restaurant draft -> form -> patch', () => {
    const draft = createProductDraftFixture();
    draft.productType = 'restaurant'; draft.site.productType = 'restaurant';
    draft.site.dataModel.fields = { brandName: 'Demo', menuItems: [{ id: '1', name: 'Soup' }], unknownMeta: { keep: true } };
    const form = draftToQuickEditForm(draft) as { brandName: string; menuItems: Array<{ name: string }> };
    expect(form.brandName).toBe('Demo');
    const update = quickEditFormToUpdateRequest(draft.productType, form) as { dataPatch: Record<string, unknown> };
    expect(update.dataPatch.brandName).toBe('Demo');
    expect(update.dataPatch.unknownMeta).toBeUndefined();
  });

  it('business draft -> form -> patch', () => {
    const draft = createProductDraftFixture();
    draft.productType = 'business'; draft.site.productType = 'business';
    draft.site.dataModel.fields = { brandName: 'Acme', services: [{ id: 's1', name: 'Advisory' }], industry: 'Tech' };
    const form = draftToQuickEditForm(draft) as { businessName: string; services: Array<{ title: string }> };
    expect(form.businessName).toBe('Acme');
    const update = quickEditFormToUpdateRequest(draft.productType, form) as { dataPatch: Record<string, unknown> };
    expect(update.dataPatch.brandName).toBe('Acme');
  });

  it('wedding draft -> form -> patch', () => {
    const draft = createProductDraftFixture();
    draft.productType = 'wedding'; draft.site.productType = 'wedding';
    draft.site.dataModel.fields = { couple: { brideName: 'A', groomName: 'B' }, event: { date: '2026-01-01', venueName: 'Hall' } };
    const form = draftToQuickEditForm(draft) as { brideName: string; groomName: string; weddingDate: string };
    expect(form.brideName).toBe('A');
    const update = quickEditFormToUpdateRequest(draft.productType, form) as { dataPatch: Record<string, unknown> };
    expect(update.dataPatch.couple).toBeTruthy();
  });

  it('validation required fields fail and optional fields pass shape', () => {
    expect(validateProductEditForm('restaurant', { brandName: '', menuItems: [{ id: 'm1', name: '' }] }).ok).toBe(false);
    expect(validateProductEditForm('business', { businessName: '', services: [{ id: 's1', title: '' }], benefits: [], pricingPlans: [], faqs: [] }).ok).toBe(false);
    expect(validateProductEditForm('wedding', { brideName: '', groomName: '', weddingDate: '', venueName: '', loveStoryItems: [], scheduleItems: [], galleryImages: [], rsvp: { enabled: false } }).ok).toBe(false);
  });
});
