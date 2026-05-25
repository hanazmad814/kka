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
  audience: string;
  products: string[];
  features: string[];
};

const productGroups: ProductGroup[] = [
  {
    group: 'Wedding & Invitation Products',
    audience: 'Cá nhân, gia đình, tổ chức cưới hỏi và event.',
    products: ['Wedding Website', 'Digital Wedding Invitation', 'Save The Date', 'RSVP Page', 'Engagement Invitation', 'Birthday Invitation', 'Baby Shower Invitation', 'Graduation Invitation', 'Event Invitation', 'Family Invitation', 'Traditional Invitation', 'Luxury Invitation', 'Minimal Invitation', 'Animated Invitation', 'Interactive Invitation'],
    features: ['Countdown', 'RSVP Form', 'Love Story Timeline', 'Photo Gallery', 'Google Maps Venue', 'Gift/Banking Section', 'Background Music', 'Multi-page Invite', 'Mobile-first']
  },
  {
    group: 'Business Showcase Products',
    audience: 'Doanh nghiệp, startup, agency, cá nhân kinh doanh dịch vụ.',
    products: ['Business Landing Page', 'Company Website', 'Portfolio Website', 'Agency Site', 'Freelancer Portfolio', 'Startup Landing Page', 'SaaS Landing Page', 'Personal Brand Website', 'Coach Website', 'Consultant Website', 'Real Estate Showcase', 'Law Firm Website', 'Medical Clinic Site', 'Beauty Salon Site', 'Gym/Fitness Site', 'Education Center Site'],
    features: ['Services Section', 'Testimonials', 'Pricing', 'Contact Form', 'Booking CTA', 'Team Section', 'FAQ', 'Social Links', 'SEO-ready', 'Responsive']
  },
  {
    group: 'Restaurant & Food Products',
    audience: 'Nhà hàng, cafe, bakery, food brand, delivery kitchen.',
    products: ['Restaurant Website', 'Cafe Landing Page', 'Digital Menu', 'QR Menu', 'Food Catalog', 'Delivery Landing Page', 'Bakery Website', 'Bar & Lounge Website', 'Street Food Landing Page', 'Fine Dining Website'],
    features: ['Menu Builder', 'Food Gallery', 'Reservation CTA', 'Delivery CTA', 'Google Maps', 'Working Hours', 'Featured Dishes', 'Promotion Banner']
  },
  {
    group: 'E-commerce & Catalog Products',
    audience: 'Bán hàng online, catalog thương hiệu, collection showcase.',
    products: ['Product Catalog', 'Product Showcase', 'Mini E-commerce Site', 'Collection Landing Page', 'Flash Sale Page', 'Product Launch Page', 'Fashion Lookbook', 'Beauty Catalog', 'Furniture Catalog', 'Jewelry Showcase'],
    features: ['Product Grid', 'CTA Buttons', 'Promotion Banner', 'Price Cards', 'Product Variants', 'Featured Collections', 'Mobile Shopping Layout']
  },
  {
    group: 'Event & Campaign Products',
    audience: 'Ban tổ chức sự kiện, cộng đồng, chương trình truyền thông.',
    products: ['Event Landing Page', 'Concert Page', 'Conference Page', 'Workshop Page', 'Webinar Landing Page', 'Festival Website', 'Meetup Page', 'Registration Page', 'Ticket Event Page', 'Community Event Site'],
    features: ['Event Schedule', 'Speaker Section', 'Registration Form', 'Countdown', 'Venue Map', 'Ticket CTA', 'Sponsor Section']
  },
  {
    group: 'Marketing & Conversion Products',
    audience: 'Marketer, sales team, growth campaign, launch campaign.',
    products: ['Sales Page', 'Lead Generation Page', 'Funnel Landing Page', 'Product Launch Funnel', 'Waitlist Page', 'App Download Page', 'Affiliate Landing Page', 'Campaign Landing Page', 'Promo Landing Page', 'Viral Campaign Page'],
    features: ['Strong CTA', 'Conversion Layout', 'Pricing Table', 'Comparison Section', 'Sticky CTA', 'Email Capture', 'Analytics Ready']
  },
  {
    group: 'Social & Creator Products',
    audience: 'Creator, influencer, nghệ sĩ, streamer, podcast host.',
    products: ['Link In Bio', 'Creator Landing Page', 'Influencer Portfolio', 'Media Kit', 'Streamer Page', 'YouTube Creator Site', 'TikTok Creator Page', 'Podcast Landing Page', 'Music Artist Page'],
    features: ['Social Links', 'Embedded Videos', 'Streaming Links', 'Sponsor CTA', 'Contact Section', 'Media Gallery']
  },
  {
    group: 'Forms & Utility Products',
    audience: 'Workflow intake, booking, form-based operations.',
    products: ['Booking Page', 'Appointment Page', 'Reservation Page', 'Contact Form Page', 'RSVP Form', 'Registration Form', 'Survey Page', 'Feedback Page', 'Lead Capture Form', 'Application Form'],
    features: ['Form Builder', 'Validation', 'Multi-step Form', 'Calendar Integration', 'Email Collection', 'Submission Tracking']
  },
  {
    group: 'Print & Digital Design Products',
    audience: 'Thiết kế social/print cho marketing và nhận diện.',
    products: ['Poster', 'Brochure', 'Flyer', 'Banner', 'Social Post', 'Instagram Story', 'Facebook Cover', 'Menu Print', 'Invitation Card', 'Business Card'],
    features: ['Auto Layout', 'Smart Typography', 'Design Tokens', 'Print-safe Export', 'Social Size Presets']
  }
];

const totalProducts = productGroups.reduce((sum, group) => sum + group.products.length, 0);
const totalFeatures = productGroups.reduce((sum, group) => sum + group.features.length, 0);

export default function PublicProductPage({ params }: PublicProductPageProps) {
  if (!params.slug) notFound();

  return (
    <AppShell
      title={`Published Product: ${params.slug}`}
      description="Public renderer chuyên nghiệp cho toàn bộ danh mục sản phẩm outcome-first: hiển thị nhanh, responsive và sẵn sàng tối ưu chuyển đổi."
      action={
        <div className="flex flex-wrap items-center gap-2">
          <Link href="/create" className="rounded-lg border border-slate-300 px-3 py-2 text-sm hover:bg-slate-50">
            Tạo sản phẩm mới
          </Link>
          <Link href={`/editor/quick/${params.slug}`} className="rounded-lg bg-slate-900 px-3 py-2 text-sm text-white hover:bg-slate-700">
            Quick edit lại
          </Link>
        </div>
      }
    >
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4"><p className="text-xs text-slate-500">Product groups</p><p className="mt-1 text-2xl font-bold">{productGroups.length}</p></div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4"><p className="text-xs text-slate-500">Product types</p><p className="mt-1 text-2xl font-bold">{totalProducts}</p></div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4"><p className="text-xs text-slate-500">Feature capabilities</p><p className="mt-1 text-2xl font-bold">{totalFeatures}</p></div>
        </div>

        <div className="mt-5 grid gap-4 2xl:grid-cols-2">
          {productGroups.map((group) => (
            <article key={group.group} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <h4 className="text-base font-semibold text-slate-900">{group.group}</h4>
              <p className="mt-1 text-sm text-slate-600">{group.audience}</p>

              <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-slate-500">Products ({group.products.length})</p>
              <ul className="mt-2 flex flex-wrap gap-1.5 text-xs text-slate-700">
                {group.products.map((product) => (
                  <li key={product} className="rounded-full border border-slate-200 bg-white px-2.5 py-1">{product}</li>
                ))}
              </ul>

              <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-slate-500">Features ({group.features.length})</p>
              <ul className="mt-2 grid gap-1 text-sm text-slate-700 sm:grid-cols-2">
                {group.features.map((feature) => (
                  <li key={feature} className="rounded-md bg-white px-2 py-1">• {feature}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
