import Link from 'next/link';
import { AppShell } from '../../../../components/AppShell';

type QuickEditorPageProps = {
  params: {
    draftId: string;
  };
};

export default function QuickEditorPage({ params }: QuickEditorPageProps) {
  return (
    <AppShell
      title={`Quick Edit Draft: ${params.draftId}`}
      description="Placeholder cho trải nghiệm sửa nhanh bằng form, hiển thị issue quality gate và cho phép auto-fix trước khi publish."
      action={
        <Link href="/create" className="rounded-lg border border-slate-300 px-3 py-2 text-sm hover:bg-slate-50">
          Quay lại Create
        </Link>
      }
    >
      <section className="rounded-xl border border-dashed border-slate-300 bg-white p-6 text-sm text-slate-600">
        Placeholder: Quick Edit panel + Quality Check panel sẽ hiển thị tại đây.
      </section>
    </AppShell>
  );
}
