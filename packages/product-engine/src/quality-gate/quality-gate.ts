import type { ProductSite } from '../../../site-core/src';
import { createQualityContext } from './quality-context';
import type { QualityGateOptions, QualityGateResult, QualityIssue } from './quality-gate.types';
import { checkSchema } from './check-schema';
import { checkMissingAssets } from './check-missing-assets';
import { checkTextOverflow } from './check-text-overflow';
import { checkMobileReadability } from './check-mobile-readability';
import { checkContrast } from './check-contrast';
import { checkNavigation } from './check-navigation';
import { checkRoutes } from './check-routes';
import { checkSEO } from './check-seo';
import { checkForms } from './check-forms';
import { checkEditorLeak } from './check-editor-leak';
import { checkPerformanceBudget } from './check-performance-budget';

export const createQualityIssue = (input: QualityIssue): QualityIssue => input;

export const hasBlockingIssues = (result: QualityGateResult): boolean => result.blockingCount > 0;

export const combineQualityResults = (results: QualityGateResult[]): QualityGateResult => {
  const issues = results.flatMap((result) => result.issues);
  const blockingCount = issues.filter((issue) => issue.severity === 'blocking').length;
  const warningCount = issues.filter((issue) => issue.severity === 'warning').length;
  const infoCount = issues.filter((issue) => issue.severity === 'info').length;
  return {
    ok: blockingCount === 0,
    issues,
    blockingCount,
    warningCount,
    infoCount
  };
};

export const runQualityGate = (site: ProductSite, options?: Partial<QualityGateOptions>): QualityGateResult => {
  const ctx = createQualityContext(site, options);
  return combineQualityResults([
    checkSchema(ctx),
    checkMissingAssets(ctx),
    checkTextOverflow(ctx),
    checkMobileReadability(ctx),
    checkContrast(ctx),
    checkNavigation(ctx),
    checkRoutes(ctx),
    checkSEO(ctx),
    checkForms(ctx),
    checkEditorLeak(ctx),
    checkPerformanceBudget(ctx)
  ]);
};
