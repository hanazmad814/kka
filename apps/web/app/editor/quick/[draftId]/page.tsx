import Link from 'next/link';
import { AppShell } from '../../../../components/AppShell';

type QuickEditorPageProps = {
  params: {
    draftId: string;
  };
};

type WorkflowStep = {
  id: string;
  title: string;
  outcome: string;
};

type QualityRule = {
  rule: string;
  impact: 'High' | 'Medium';
};

const workflowSteps: WorkflowStep[] = [
  { id: '01', title: 'Input Data', outcome: 'Chuẩn hóa nội dung đầu vào: brand, offer, CTA, contact, media.' },
  { id: '02', title: 'Generate 3-6 Variants', outcome: 'Sinh nhiều phương án layout/style để tối ưu tốc độ chọn mẫu.' },
  { id: '03', title: 'Select Best Design', outcome: 'Chọn bản có điểm quality và conversion cao nhất.' },
  { id: '04', title: 'Quick Edit', outcome: 'Chỉnh bằng form structured patch, không kéo layer thủ công.' },
  { id: '05', title: 'Quality Check', outcome: 'Quét readability, CTA clarity, spacing, responsive, content completeness.' },
  { id: '06', title: 'Publish', outcome: 'Xuất public snapshot sẵn sàng chia sẻ link ngay.' }
];

const systemModules = [
  'Scene Engine',
  'Template System',
  'Design Genome',
  'Product Engine',
  'Variant Scoring',
  'Quality Gate',
  'AI Structured Patch',
  'Publish Snapshot System'
];

const qualityRules: QualityRule[] = [
  { rule: 'Hero phải có headline + subheadline + CTA rõ ràng ở first fold.', impact: 'High' },
  { rule: 'Tương phản text/CTA đạt chuẩn để không mất conversion trên mobile.', impact: 'High' },
  { rule: 'Không còn placeholder, nội dung lặp hoặc section rỗng trước khi publish.', impact: 'High' },
  { rule: 'Thông tin hành động chính (đặt lịch, RSVP, mua hàng, liên hệ) luôn khả dụng.', impact: 'High' },
  { rule: 'Khoảng cách dọc nhất quán giữa các block để tăng độ dễ đọc.', impact: 'Medium' },
  { rule: 'Ảnh và media đúng tỷ lệ, không vỡ trên viewport nhỏ.', impact: 'Medium' }
];

export default function QuickEditorPage({ params }: QuickEditorPageProps) {
  return (
    <AppShell
      title={`Quick Edit Draft: ${params.draftId}`}
      description="Pro quick editor theo mô hình outcome-first: tập trung hoàn thiện sản phẩm publish-ready bằng dữ liệu thật và kiểm tra chất lượng tự động."
      action={
        <div className="flex flex-wrap items-center gap-2">
          <Link href="/create" className="rounded-lg border border-slate-300 px-3 py-2 text-sm hover:bg-slate-50">
            Quay lại Create
          </Link>
          <Link href={`/p/${params.draftId}`} className="rounded-lg bg-slate-900 px-3 py-2 text-sm text-white hover:bg-slate-700">
            Xem trang đã publish
          </Link>
        </div>
      }
    >
      <div className="grid gap-6 xl:grid-cols-[1.3fr_1fr]">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold">Workflow Control Panel</h3>
          <p className="mt-1 text-sm text-slate-600">Luồng vận hành thực tế từ dữ liệu đầu vào đến public link.</p>
          <ol className="mt-4 space-y-3">
            {workflowSteps.map((step) => (
              <li key={step.id} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-start gap-3">
                  <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white">
                    {step.id}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{step.title}</p>
                    <p className="mt-1 text-sm leading-6 text-slate-600">{step.outcome}</p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <div className="space-y-6">
          <section className="rounded-2xl border border-sky-200 bg-sky-50 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-sky-900">Core Modules</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {systemModules.map((module) => (
                <span key={module} className="rounded-full border border-sky-300 bg-white px-2.5 py-1 text-xs font-medium text-sky-900">
                  {module}
                </span>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-amber-200 bg-amber-50 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-amber-900">Quality Gate (Publish-ready)</h3>
            <ul className="mt-3 space-y-2 text-sm text-amber-950">
              {qualityRules.map((item) => (
                <li key={item.rule} className="rounded-lg bg-white/85 p-3">
                  <div className="flex items-center justify-between gap-2">
                    <span>{item.rule}</span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                        item.impact === 'High' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {item.impact}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </AppShell>
  );
}
