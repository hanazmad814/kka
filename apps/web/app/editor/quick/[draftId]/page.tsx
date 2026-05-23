import { draftRepositorySingleton } from '../../../../../../packages/site-core/src/storage';
import { QuickEditShell } from '../../../../components/quick-edit/QuickEditShell';

export default async function QuickEditorPage({ params }: { params: Promise<{ draftId: string }> }) {
  const { draftId } = await params;
  const draft = await draftRepositorySingleton.getDraftById(draftId);

  if (!draft) {
    return <section><h1>Quick Edit</h1><p>Draft not found.</p><a href='/create'>Back to Create Wizard</a></section>;
  }

  return <QuickEditShell draft={draft} />;
}
