import { notFound } from 'next/navigation';
import Link from 'next/link';
import { AppShell } from '../../../components/AppShell';

type PublicProductPageProps = {
  params: {
    slug: string;
  };
};

export default function PublicProductPage({ params }: PublicProductPageProps) {
  if (!params.slug) {
    notFound();
  }

  return (
    <AppShell
      title={`Public Product: ${params.slug}`}
      description="Placeholder cho public page đã publish. Trong production sẽ render snapshot từ published repository theo slug/domain mapping."
      action={
        <Link href="/create" className="rounded-lg border border-slate-300 px-3 py-2 text-sm hover:bg-slate-50">
          Tạo sản phẩm mới
        </Link>
      }
    >
      <section className="rounded-xl border border-dashed border-slate-300 bg-white p-6 text-sm text-slate-600">
        Placeholder: nội dung landing/event/menu/catalog public sẽ render tại đây.
      </section>
    </AppShell>
  );
}
