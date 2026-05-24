import Link from 'next/link';
import { AppShell } from '../components/AppShell';

export default function HomePage() {
  return (
    <AppShell
      title="Smart Product Builder"
      description="Nhập dữ liệu, chọn loại sản phẩm, chọn phong cách và để hệ thống tự sinh các phương án tốt nhất để bạn publish nhanh trong vài phút."
      action={
        <Link
          href="/create"
          className="inline-flex items-center rounded-lg bg-sky-600 px-4 py-2 text-sm font-medium text-white hover:bg-sky-700"
        >
          Bắt đầu tạo sản phẩm
        </Link>
      }
    >
      <section className="grid gap-4 md:grid-cols-3">
        {[
          'Input data',
          'Generate variants',
          'Select + Quick edit',
          'Quality check',
          'Publish'
        ].map((step, idx) => (
          <article key={step} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold text-sky-700">Step {idx + 1}</p>
            <h3 className="mt-2 font-semibold">{step}</h3>
          </article>
        ))}
      </section>
    </AppShell>
  );
}
