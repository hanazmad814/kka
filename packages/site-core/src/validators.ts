import { combineValidationResults, createValidationIssue, type ValidationResult, validateSceneDocument, validResult } from '../../core/src/index';
import type { ProductSite, PublishedSiteSnapshot, SiteDesignSystem, SiteMap, SiteNavigation, SiteNavItem } from './types';

export const validateSiteDesignSystem = (design: SiteDesignSystem): ValidationResult => {
  const issues = [];
  if (!design.colors) issues.push(createValidationIssue({ code: 'DESIGN_COLORS_REQUIRED', message: 'Design system colors required.', path: 'colors', severity: 'error' }));
  if (!design.typography) issues.push(createValidationIssue({ code: 'DESIGN_TYPOGRAPHY_REQUIRED', message: 'Design system typography required.', path: 'typography', severity: 'error' }));
  if (!design.spacing) issues.push(createValidationIssue({ code: 'DESIGN_SPACING_REQUIRED', message: 'Design system spacing required.', path: 'spacing', severity: 'error' }));
  if (!design.breakpoints) issues.push(createValidationIssue({ code: 'DESIGN_BREAKPOINTS_REQUIRED', message: 'Design system breakpoints required.', path: 'breakpoints', severity: 'error' }));
  return issues.length === 0 ? validResult() : { valid: false, issues };
};

export const validateSiteMap = (siteMap: SiteMap): ValidationResult => {
  if (siteMap.pages.length === 0) return { valid: false, issues: [createValidationIssue({ code: 'SITEMAP_EMPTY', message: 'Site map must have at least one page.', path: 'siteMap.pages', severity: 'error' })] };
  return validResult();
};

const validateNavItemRef = (item: SiteNavItem, existingPageIds: Set<string>, path: string): ValidationResult => {
  const issues = [];
  if (!existingPageIds.has(item.pageId)) {
    issues.push(createValidationIssue({ code: 'NAV_PAGE_NOT_FOUND', message: `Navigation points to unknown pageId ${item.pageId}.`, path, severity: 'error' }));
  }
  for (let i = 0; i < (item.children ?? []).length; i += 1) {
    issues.push(...validateNavItemRef(item.children![i], existingPageIds, `${path}.children.${i}`).issues);
  }
  return issues.length === 0 ? validResult() : { valid: false, issues };
};

export const validateNavigation = (navigation: SiteNavigation, existingPageIds: Set<string>): ValidationResult => {
  const issues = navigation.items.flatMap((item, index) => validateNavItemRef(item, existingPageIds, `navigation.items.${index}`).issues);
  return issues.length === 0 ? validResult() : { valid: false, issues };
};

export const validateProductSite = (site: ProductSite): ValidationResult => {
  const issues = [];
  if (!site.id) issues.push(createValidationIssue({ code: 'SITE_ID_REQUIRED', message: 'ProductSite id is required.', path: 'id', severity: 'error' }));
  if (!site.productType) issues.push(createValidationIssue({ code: 'SITE_PRODUCT_TYPE_REQUIRED', message: 'ProductSite productType is required.', path: 'productType', severity: 'error' }));
  if (!site.schemaVersion) issues.push(createValidationIssue({ code: 'SITE_SCHEMA_REQUIRED', message: 'ProductSite schemaVersion is required.', path: 'schemaVersion', severity: 'error' }));

  const pageIds = new Set(Object.keys(site.pages));
  for (const pageRef of site.siteMap.pages) {
    if (!pageIds.has(pageRef.id)) {
      issues.push(createValidationIssue({ code: 'SITEMAP_PAGE_MISSING', message: `Site map page ${pageRef.id} missing in ProductSite.pages.`, path: `siteMap.pages.${pageRef.id}`, severity: 'error' }));
    }
  }

  const sceneResults = Object.entries(site.pages).map(([id, document]) => {
    const result = validateSceneDocument(document);
    if (document.pageId !== id) {
      return combineValidationResults(result, { valid: false, issues: [createValidationIssue({ code: 'SCENE_DOC_PAGE_MISMATCH', message: 'SceneDocument.pageId must match page key.', path: `pages.${id}.pageId`, severity: 'error' })] });
    }
    return result;
  });

  const merged = combineValidationResults(
    validateSiteMap(site.siteMap),
    validateNavigation(site.navigation, pageIds),
    validateSiteDesignSystem(site.designSystem),
    ...sceneResults
  );

  return combineValidationResults(merged, issues.length === 0 ? validResult() : { valid: false, issues });
};

export const validatePublishedSiteSnapshot = (snapshot: PublishedSiteSnapshot): ValidationResult => {
  const siteResult = validateProductSite(snapshot.site);
  return siteResult.valid ? validResult() : siteResult;
};
