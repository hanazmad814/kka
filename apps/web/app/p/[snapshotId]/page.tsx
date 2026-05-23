import { notFound } from 'next/navigation';
import { PublicRenderer } from '../../../../../packages/site-core/src/renderer';
import type { ProductSite } from '../../../../../packages/site-core/src/types';
import { publishedSnapshotRepositorySingleton } from '../../../../../packages/site-core/src/publish';

export default async function PublicSnapshotPage({ params }: { params: Promise<{ snapshotId: string }> }) {
  const { snapshotId } = await params;
  const snapshot = await publishedSnapshotRepositorySingleton.getSnapshotById(snapshotId);
  if (!snapshot) {
    notFound();
  }

  let html = '';
  try { html = PublicRenderer.render(snapshot.site as ProductSite); } catch { html = '<main><h1>Public page unavailable</h1></main>'; }

  return <main><div dangerouslySetInnerHTML={{ __html: html }} /></main>;
}
