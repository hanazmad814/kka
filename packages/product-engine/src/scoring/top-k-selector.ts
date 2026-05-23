import { hasBlockingIssues } from '../quality-gate';
import type { ScoredDesignCandidate, TopKOptions } from './design-score.types';

export const selectTopK = (candidates: ScoredDesignCandidate[], options?: TopKOptions): ScoredDesignCandidate[] => {
  const max = options?.max ?? 6;
  const valid = candidates.filter((candidate) => !hasBlockingIssues(candidate.quality));
  const sorted = [...valid].sort((a, b) => b.score.total - a.score.total || a.id.localeCompare(b.id));
  if (!options?.enforceDiversity) return sorted.slice(0, max);

  const selected: ScoredDesignCandidate[] = [];
  const used = new Set<string>();

  for (const candidate of sorted) {
    const key = `${candidate.genome?.stylePresetId ?? 'none'}::${candidate.genome?.layoutVariantId ?? 'none'}`;
    if (!used.has(key)) {
      selected.push(candidate);
      used.add(key);
    }
    if (selected.length >= max) return selected;
  }

  for (const candidate of sorted) {
    if (selected.includes(candidate)) continue;
    selected.push(candidate);
    if (selected.length >= max) break;
  }
  return selected;
};
