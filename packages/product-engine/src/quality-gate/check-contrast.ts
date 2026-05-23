import type { QualityGateContext, QualityGateResult, QualityIssue } from './quality-gate.types';

const toRgb = (hex: string): [number, number, number] | null => {
  const clean = hex.replace('#', '');
  if (clean.length !== 6) return null;
  const n = Number.parseInt(clean, 16);
  if (Number.isNaN(n)) return null;
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};
const luminance = ([r, g, b]: [number, number, number]): number => {
  const f = (v: number) => {
    const x = v / 255;
    return x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4;
  };
  return (0.2126 * f(r)) + (0.7152 * f(g)) + (0.0722 * f(b));
};

export const checkContrast = (ctx: QualityGateContext): QualityGateResult => {
  const issues: QualityIssue[] = [];
  const fg = toRgb(ctx.site.designSystem.colors.text);
  const bg = toRgb(ctx.site.designSystem.colors.background);
  if (!fg || !bg) {
    issues.push({ severity: 'info', code: 'CONTRAST_DATA_INSUFFICIENT', message: 'Cannot compute contrast from non-hex colors.' });
  } else {
    const l1 = luminance(fg);
    const l2 = luminance(bg);
    const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
    if (ratio < 4.5) {
      issues.push({ severity: ctx.options.strict ? 'blocking' : 'warning', code: 'LOW_CONTRAST', message: 'Contrast ratio is below threshold.', details: { ratio } });
    }
  }
  const blockingCount = issues.filter((i) => i.severity === 'blocking').length;
  const warningCount = issues.filter((i) => i.severity === 'warning').length;
  const infoCount = issues.filter((i) => i.severity === 'info').length;
  return { ok: blockingCount === 0, issues, blockingCount, warningCount, infoCount };
};
