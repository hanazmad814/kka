export function VariantScoreBadge({ score }: { score?: number }) { return <span>Score: {score?.toFixed(2) ?? 'n/a'}</span>; }
