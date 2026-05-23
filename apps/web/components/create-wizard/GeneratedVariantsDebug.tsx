export function GeneratedVariantsDebug({ variants }: { variants: Array<{ id: string; score?: { total?: number }; quality?: { blockingCount?: number; warningCount?: number }; site?: { siteMap?: { pages?: unknown[] } } }> }) {
  return <div>{variants.map((v) => <div key={v.id}><h4>{v.id}</h4><p>score: {v.score?.total ?? 'n/a'}</p><p>quality: b{v.quality?.blockingCount ?? 0}/w{v.quality?.warningCount ?? 0}</p><p>pages: {v.site?.siteMap?.pages?.length ?? 0}</p></div>)}</div>;
}
