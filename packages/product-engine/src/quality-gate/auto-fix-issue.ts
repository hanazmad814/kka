import type { ProductSite } from '../../../site-core/src/types';
import type { QualityIssue } from './quality-gate.types';

export function autoFixIssue(site: ProductSite, issue: QualityIssue): ProductSite {
  const fixed = structuredClone(site);
  const fields = fixed.dataModel.fields as Record<string, unknown>;
  const code = issue.code.toLowerCase();
  if (code === 'missing_seo_title') {
    const brand = String(fields.brandName ?? 'Untitled');
    fixed.siteMap.pages = fixed.siteMap.pages.map((p) => p.id === issue.pageId ? { ...p, title: p.title?.trim() ? p.title : brand } : p);
  }
  if (code === 'missing_seo_description') {
    if (!fields.description || String(fields.description).trim() === '') fields.description = `${String(fields.brandName ?? 'Brand')} site`;
  }
  if (code === 'missing_cta_label') {
    if (!fields.ctaLabel || String(fields.ctaLabel).trim() === '') fields.ctaLabel = 'Contact us';
  }
  if (code === 'duplicate_route') {
    const seen = new Set<string>();
    fixed.siteMap.pages = fixed.siteMap.pages.map((p, i) => {
      const base = i === 0 ? '/' : p.path;
      let path = base || `/${p.id}`;
      let n = 1;
      while (seen.has(path)) { path = `${base}-${n++}`; }
      seen.add(path);
      return { ...p, path };
    });
  }
  return fixed;
}
