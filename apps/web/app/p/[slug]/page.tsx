import { notFound } from 'next/navigation';
import Link from 'next/link';
import { AppShell } from '../../../components/AppShell';

type PublicProductPageProps = {
  params: {
    slug: string;
  };
};

type ProductGroup = {
  group: string;
  products: string[];
};

const productGroups: ProductGroup[] = [
  {
    group: 'Wedding & Invitation',
    products: ['Wedding Website', 'Digital Wedding Invitation', 'RSVP Page', 'Save The Date', 'Event Invitation']
  },
  {
    group: 'Business Showcase',
    products: ['Business Landing Page', 'Company Website', 'Portfolio Website', 'Agency Site', 'Startup Landing Page']
  },
  {
    group: 'Restaurant & Food',
    products: ['Restaurant Website', 'Cafe Landing Page', 'Digital Menu', 'QR Menu', 'Food Catalog']
  },
  {
    group: 'E-commerce & Catalog',
    products: ['Product Catalog', 'Mini E-commerce Site', 'Collection Landing Page', 'Flash Sale Page', 'Product Launch Page']
  },
  {
    group: 'Event & Campaign',
    products: ['Event Landing Page', 'Conference Page', 'Workshop Page', 'Webinar Landing Page', 'Registration Page']
  },
  {
    group: 'Marketing & Conversion',
    products: ['Sales Page', 'Lead Generation Page', 'Funnel Landing Page', 'Waitlist Page', 'Campaign Landing Page']
  },
  {
    group: 'Social & Creator',
    products: ['Link In Bio', 'Creator Landing Page', 'Media Kit', 'Podcast Landing Page', 'Music Artist Page']
  },
  {
    group: 'Forms & Utility',
    products: ['Booking Page', 'Appointment Page', 'Reservation Page', 'Survey Page', 'Application Form']
  },
  {
    group: 'Print & Digital Design',
    products: ['Poster', 'Brochure', 'Flyer', 'Invitation Card', 'Business Card']
  }
];

export default function PublicProductPage({ params }: PublicProductPageProps) {
  if (!params.slug) {
    notFound();
  }

  return (
    <AppShell
      title={`Public Product: ${params.slug}`}
      description="Trang public published theo định hướng outcome-first: render nhanh sản phẩm hoàn chỉnh, responsive, sẵn sàng chia sẻ link."
      action={
        <div className="flex items-center gap-2">
          <Link href="/create" className="rounded-lg border border-slate-300 px-3 py-2 text-sm hover:bg-slate-50">
            Tạo sản phẩm mới
          </Link>
          <Link
            href={`/editor/quick/${params.slug}`}
            className="rounded-lg bg-slate-900 px-3 py-2 text-sm text-white hover:bg-slate-700"
          >
            Quick edit lại
          </Link>
        </div>
      }
    >
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold">Danh mục sản phẩm hỗ trợ</h3>
        <p className="mt-1 text-sm text-slate-600">
          Public renderer này được thiết kế để phục vụ toàn bộ nhóm sản phẩm trong mô hình Smart Product Builder.
        </p>
        <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {productGroups.map((group) => (
            <article key={group.group} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <h4 className="text-sm font-semibold text-slate-900">{group.group}</h4>
              <ul className="mt-2 space-y-1 text-sm text-slate-600">
                {group.products.map((product) => (
                  <li key={product}>• {product}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
