export type ValidationSeverity = 'error' | 'warning';

export interface ValidationIssue {
  code: string;
  message: string;
  path: string;
  severity: ValidationSeverity;
}

export interface ValidationResult {
  valid: boolean;
  issues: ValidationIssue[];
}

export const createValidationIssue = (input: ValidationIssue): ValidationIssue => input;

export const combineValidationResults = (...results: ValidationResult[]): ValidationResult => {
  const issues = results.flatMap((item) => item.issues);
  return {
    valid: !issues.some((issue) => issue.severity === 'error'),
    issues
  };
};

export const hasBlockingIssues = (result: ValidationResult): boolean =>
  result.issues.some((issue) => issue.severity === 'error');

export const validResult = (): ValidationResult => ({ valid: true, issues: [] });
