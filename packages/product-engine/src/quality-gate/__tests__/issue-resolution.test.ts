import { describe, expect, it } from 'vitest';
import { mapQualityIssueToPresentation } from '../issue-presenter';
import { autoFixQualityIssuesSite } from '../auto-fix-site';
import { createProductSiteFixture } from '../../../../site-core/src/fixtures';

describe('issue resolution', () => {
  it('maps issue to friendly presentation', () => {
    const site = createProductSiteFixture();
    const p = mapQualityIssueToPresentation({ severity: 'warning', code: 'missing_seo_title', message: 'x' }, site);
    expect(p.title).toContain('Missing page title');
    expect(p.autoFixable).toBe(true);
  });

  it('auto-fix does not mutate original site', () => {
    const site = createProductSiteFixture();
    const clone = structuredClone(site);
    const result = autoFixQualityIssuesSite(site, { fixAllSafe: true });
    expect(site).toEqual(clone);
    expect(result.site).toBeDefined();
  });
});
