import { describe, expect, it } from 'vitest';
import { runQualityGate } from '..';
import { createQualityGateSiteFixture } from '../quality-fixtures';

describe('quality gate foundation', () => {
  it('valid ProductSite fixture returns ok=true', () => {
    const site = createQualityGateSiteFixture();
    site.pages.home.assets.push({ id: 'a1', type: 'image', url: '/hero.jpg', mimeType: 'image/jpeg' });
    // make sure image src exists in asset set
    const hero = site.pages.home.pages[0].nodesById.hero as { src?: string; type: string; id: string; x: number; y: number; width: number; height: number; text?: string };
    site.pages.home.pages[0].nodesById.hero = { ...hero, type: 'image', src: '/hero.jpg' } as never;
    const result = runQualityGate(site);
    expect(result.ok).toBe(true);
  });

  it('site with missing page returns blocking issue', () => {
    const site = createQualityGateSiteFixture();
    site.siteMap.pages.push({ id: 'missing', path: '/missing', title: 'Missing' });
    const result = runQualityGate(site);
    expect(result.issues.some((i) => i.code.includes('SITEMAP_PAGE_MISSING') && i.severity === 'blocking')).toBe(true);
  });

  it('navigation to unknown page returns blocking issue', () => {
    const site = createQualityGateSiteFixture();
    site.navigation.items[0].pageId = 'unknown';
    const result = runQualityGate(site);
    expect(result.issues.some((i) => i.code.includes('NAV') && i.severity === 'blocking')).toBe(true);
  });

  it('duplicate route returns blocking issue', () => {
    const site = createQualityGateSiteFixture();
    site.siteMap.pages.push({ id: 'home-2', path: '/', title: 'Dup' });
    site.pages['home-2'] = structuredClone(site.pages.home);
    site.pages['home-2'].pageId = 'home-2';
    site.pages['home-2'].pages[0].id = 'home-2';
    site.pages['home-2'].pages[0].pageId = 'home-2';
    const result = runQualityGate(site);
    expect(result.issues.some((i) => i.code === 'DUPLICATE_ROUTE')).toBe(true);
  });

  it('missing required asset returns blocking issue', () => {
    const site = createQualityGateSiteFixture();
    site.pages.home.pages[0].nodesById.hero = { id: 'hero', type: 'image', x: 0, y: 0, width: 100, height: 100, src: '/missing.jpg' } as never;
    const result = runQualityGate(site);
    expect(result.issues.some((i) => i.code === 'MISSING_REQUIRED_ASSET')).toBe(true);
  });

  it('text too long for small node returns warning', () => {
    const site = createQualityGateSiteFixture();
    site.pages.home.pages[0].nodesById.hero = { id: 'hero', type: 'text', x: 0, y: 0, width: 20, height: 10, text: 'x'.repeat(500) } as never;
    const result = runQualityGate(site);
    expect(result.issues.some((i) => i.code === 'TEXT_OVERFLOW')).toBe(true);
  });

  it('tiny mobile font returns warning', () => {
    const site = createQualityGateSiteFixture();
    site.pages.home.pages[0].nodesById.hero = { id: 'hero', type: 'text', x: 0, y: 0, width: 100, height: 10, text: 'tiny' } as never;
    const result = runQualityGate(site);
    expect(result.issues.some((i) => i.code === 'MOBILE_FONT_TOO_SMALL')).toBe(true);
  });

  it('low contrast returns warning or blocking in strict mode', () => {
    const site = createQualityGateSiteFixture();
    site.designSystem.colors.text = '#777777';
    site.designSystem.colors.background = '#7a7a7a';
    const loose = runQualityGate(site, { strict: false });
    const strict = runQualityGate(site, { strict: true });
    expect(loose.issues.some((i) => i.code === 'LOW_CONTRAST' && i.severity === 'warning')).toBe(true);
    expect(strict.issues.some((i) => i.code === 'LOW_CONTRAST' && i.severity === 'blocking')).toBe(true);
  });

  it('publish mode missing SEO returns warning', () => {
    const site = createQualityGateSiteFixture();
    site.dataModel.fields = {};
    const result = runQualityGate(site, { mode: 'publish' });
    expect(result.issues.some((i) => i.code === 'SEO_TITLE_MISSING')).toBe(true);
  });

  it('publish mode invalid form returns blocking', () => {
    const site = createQualityGateSiteFixture();
    site.pages.home.pages[0].nodesById.form1 = { id: 'form1', type: 'form', x: 0, y: 0, width: 100, height: 100, fields: ['a'] } as never;
    const result = runQualityGate(site, { mode: 'publish' });
    expect(result.issues.some((i) => i.code === 'FORM_HANDLER_MISSING')).toBe(true);
  });

  it('editor leak in public/publish mode returns blocking', () => {
    const site = createQualityGateSiteFixture();
    site.pages.home.pages[0].nodesById.leak = { id: 'leak', type: 'text', x: 0, y: 0, width: 100, height: 50, text: 'hello', editorOnly: true } as never;
    const result = runQualityGate(site, { mode: 'publish' });
    expect(result.issues.some((i) => i.code === 'EDITOR_LEAK')).toBe(true);
  });

  it('performance budget exceeded returns warning', () => {
    const site = createQualityGateSiteFixture();
    const result = runQualityGate(site, { performanceBudget: { maxPages: 0 } });
    expect(result.issues.some((i) => i.code === 'PERF_MAX_PAGES_EXCEEDED')).toBe(true);
  });

  it('unknown node does not crash and returns warning', () => {
    const site = createQualityGateSiteFixture();
    site.pages.home.pages[0].nodesById.weird = { id: 'weird', type: 'weird', x: 0, y: 0, width: 1, height: 1 } as never;
    const result = runQualityGate(site);
    expect(result.issues.some((i) => i.code === 'UNKNOWN_NODE_TYPE')).toBe(true);
  });

  it('runQualityGate does not mutate input', () => {
    const site = createQualityGateSiteFixture();
    const before = JSON.stringify(site);
    runQualityGate(site);
    const after = JSON.stringify(site);
    expect(after).toBe(before);
  });
});
