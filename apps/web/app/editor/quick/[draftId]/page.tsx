import Link from 'next/link';
import { AppShell } from '../../../../components/AppShell';

type QuickEditorPageProps = {
  params: {
    draftId: string;
  };
};

const flowSteps = ['Input data', 'Generate variants (3-6)', 'Select best design', 'Quick edit', 'Quality check', 'Publish'];

const platformModules = [
  'Scene Engine',
  'Product Engine',
  'Template System',
  'Design Genome',
  'Variant Scoring',
  'Quality Gate',
  'AI Structured Patch',
  'Quick Edit System',
  'Publish Snapshot System'
];

const qualityChecklist = [
  'Headline, subheadline, CTA có hierarchy rõ ràng.',
  'Contrast đạt chuẩn cho CTA, nút hành động nổi bật.',
  'Nội dung quan trọng nằm ở first fold cho mobile.',
  'Không còn placeholder hoặc thông tin chưa đủ.',
  'Form/CTA chính có validation và thông điệp rõ ràng.',
  'Metadata/publish snapshot sẵn sàng cho public link.'
];

export default function QuickEditorPage({ params }: QuickEditorPageProps) {
  return (
    <AppShell
      title={`Quick Edit Draft: ${params.draftId}`}
      description="Editor-second: user không cần kéo layer phức tạp, chỉ chỉnh nội dung bằng form và để hệ thống giữ bố cục đẹp + ổn định." 
      action={
        <div className="flex items-center gap-2">
          <Link href="/create" className="rounded-lg border border-slate-300 px-3 py-2 text-sm hover:bg-slate-50">Quay lại Create</Link>
          <Link href={`/p/${params.draftId}`} className="rounded-lg bg-slate-900 px-3 py-2 text-sm text-white hover:bg-slate-700">Xem public preview</Link>
        </div>
      }
    >
      <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold">Outcome-first Workflow</h3>
          <ol className="mt-3 grid gap-2 sm:grid-cols-2">
            {flowSteps.map((step, index) => (
              <li key={step} className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
                <span className="mr-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-slate-900 text-xs text-white">{index + 1}</span>
                {step}
              </li>
            ))}
          </ol>

          <h4 className="mt-5 text-sm font-semibold text-slate-900">Core Engine Modules</h4>
          <div className="mt-2 flex flex-wrap gap-2">
            {platformModules.map((module) => (
              <span key={module} className="rounded-full border border-sky-200 bg-sky-50 px-2 py-1 text-xs text-sky-800">{module}</span>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-amber-200 bg-amber-50 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-amber-900">Quality Gate Checklist</h3>
          <ul className="mt-3 space-y-2 text-sm text-amber-900">
            {qualityChecklist.map((item) => (
              <li key={item} className="rounded-md bg-white/80 p-3">• {item}</li>
            ))}
          </ul>
        </section>
      </div>
    </AppShell>
  );
}
