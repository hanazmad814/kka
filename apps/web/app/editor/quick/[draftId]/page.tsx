import Link from 'next/link';
import { AppShell } from '../../../../components/AppShell';

type QuickEditorPageProps = {
  params: {
    draftId: string;
  };
};

const qualityChecklist = [
  'Hierarchy rõ ràng: headline, subheadline, CTA không bị cạnh tranh.',
  'Màu CTA đạt tương phản cao để tối ưu conversion.',
  'Ảnh hero dùng đúng tỷ lệ mobile-first.',
  'Không có placeholder text hoặc nội dung trùng lặp.',
  'Thông tin liên hệ và CTA hành động luôn hiện diện ở fold đầu.'
];

const quickEditModules = [
  {
    title: 'Content Form Editing',
    description: 'Sửa nhanh headline, mô tả, dịch vụ, menu, FAQ bằng form thay vì kéo từng layer.'
  },
  {
    title: 'Auto Quality Gate',
    description: 'Hệ thống quét quality issue và đề xuất auto-fix cho spacing, contrast, CTA clarity.'
  },
  {
    title: 'Variant-safe Updates',
    description: 'Patch dữ liệu có kiểm soát để giữ bố cục đẹp và không phá cấu trúc template/genome.'
  },
  {
    title: 'One-click Publish Readiness',
    description: 'Theo dõi trạng thái sẵn sàng publish theo checklist realtime ngay trong quick editor.'
  }
];

export default function QuickEditorPage({ params }: QuickEditorPageProps) {
  return (
    <AppShell
      title={`Quick Edit Draft: ${params.draftId}`}
      description="Trang Quick Edit theo mô hình outcome-first: ưu tiên hoàn thiện sản phẩm nhanh bằng form + quality gate trước khi publish."
      action={
        <div className="flex items-center gap-2">
          <Link href="/create" className="rounded-lg border border-slate-300 px-3 py-2 text-sm hover:bg-slate-50">
            Quay lại Create
          </Link>
          <Link href={`/p/${params.draftId}`} className="rounded-lg bg-slate-900 px-3 py-2 text-sm text-white hover:bg-slate-700">
            Xem public preview
          </Link>
        </div>
      }
    >
      <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold">Quick Edit Modules</h3>
          <p className="mt-1 text-sm text-slate-600">Các mô-đun cốt lõi để sửa nhanh mà vẫn giữ chất lượng thiết kế.</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {quickEditModules.map((module) => (
              <article key={module.title} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <h4 className="text-sm font-semibold text-slate-900">{module.title}</h4>
                <p className="mt-1 text-sm leading-6 text-slate-600">{module.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-amber-200 bg-amber-50 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-amber-900">Quality Gate Checklist</h3>
          <ul className="mt-3 space-y-2 text-sm text-amber-900">
            {qualityChecklist.map((item) => (
              <li key={item} className="rounded-md bg-white/70 p-3">
                • {item}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </AppShell>
  );
}
