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
    audience: 'Dành cho cá nhân, event, cưới hỏi',
    products: [
      'Wedding Website',
      'Digital Wedding Invitation',
      'Save The Date',
      'RSVP Page',
      'Engagement Invitation',
      'Birthday Invitation',
      'Baby Shower Invitation',
      'Graduation Invitation',
      'Event Invitation',
      'Family Invitation',
      'Traditional Invitation',
      'Luxury Invitation',
      'Minimal Invitation',
      'Animated Invitation',
      'Interactive Invitation'
    ],
    features: ['Countdown', 'RSVP Form', 'Love Story Timeline', 'Photo Gallery', 'Google Maps Venue', 'Gift/Banking Section']
  },
  {
    group: 'Business Showcase Products',
    audience: 'Dành cho doanh nghiệp và cá nhân kinh doanh',
    products: [
      'Business Landing Page',
      'Company Website',
      'Portfolio Website',
      'Agency Site',
      'Freelancer Portfolio',
      'Startup Landing Page',
      'SaaS Landing Page',
      'Personal Brand Website',
      'Coach Website',
      'Consultant Website',
      'Real Estate Showcase',
      'Law Firm Website',
      'Medical Clinic Site',
      'Beauty Salon Site',
      'Gym/Fitness Site',
      'Education Center Site'
    ],
    features: ['Services Section', 'Testimonials', 'Pricing', 'Contact Form', 'Booking CTA', 'SEO-ready']
  },
  {
    group: 'Restaurant & Food Products',
    audience: 'Dành cho F&B',
    products: [
      'Restaurant Website',
      'Cafe Landing Page',
      'Digital Menu',
      'QR Menu',
      'Food Catalog',
      'Delivery Landing Page',
      'Bakery Website',
      'Bar & Lounge Website',
      'Street Food Landing Page',
      'Fine Dining Website'
    ],
    features: ['Menu Builder', 'Food Gallery', 'Reservation CTA', 'Delivery CTA', 'Google Maps', 'Promotion Banner']
  },
  {
    group: 'E-commerce & Catalog Products',
    audience: 'Dành cho bán hàng',
    products: [
      'Product Catalog',
      'Product Showcase',
      'Mini E-commerce Site',
      'Collection Landing Page',
      'Flash Sale Page',
      'Product Launch Page',
      'Fashion Lookbook',
      'Beauty Catalog',
      'Furniture Catalog',
      'Jewelry Showcase'
    ],
    features: ['Product Grid', 'CTA Buttons', 'Promotion Banner', 'Price Cards', 'Product Variants', 'Featured Collections']
  },
  {
    group: 'Event & Campaign Products',
    audience: 'Dành cho tổ chức sự kiện',
    products: [
      'Event Landing Page',
      'Concert Page',
      'Conference Page',
      'Workshop Page',
      'Webinar Landing Page',
      'Festival Website',
      'Meetup Page',
      'Registration Page',
      'Ticket Event Page',
      'Community Event Site'
    ],
    features: ['Event Schedule', 'Speaker Section', 'Registration Form', 'Countdown', 'Venue Map', 'Ticket CTA']
  },
  {
    group: 'Marketing & Conversion Products',
    audience: 'Dành cho marketing/sales',
    products: [
      'Sales Page',
      'Lead Generation Page',
      'Funnel Landing Page',
      'Product Launch Funnel',
      'Waitlist Page',
      'App Download Page',
      'Affiliate Landing Page',
      'Campaign Landing Page',
      'Promo Landing Page',
      'Viral Campaign Page'
    ],
    features: ['Strong CTA', 'Conversion Layout', 'Pricing Table', 'Comparison Section', 'Sticky CTA', 'Email Capture']
  },
  {
    group: 'Social & Creator Products',
    audience: 'Dành cho creator/influencer',
    products: [
      'Link In Bio',
      'Creator Landing Page',
      'Influencer Portfolio',
      'Media Kit',
      'Streamer Page',
      'YouTube Creator Site',
      'TikTok Creator Page',
      'Podcast Landing Page',
      'Music Artist Page'
    ],
    features: ['Social Links', 'Embedded Videos', 'Streaming Links', 'Sponsor CTA', 'Contact Section', 'Media Gallery']
  },
  {
    group: 'Forms & Utility Products',
    audience: 'Dành cho workflow và hành động',
    products: [
      'Booking Page',
      'Appointment Page',
      'Reservation Page',
      'Contact Form Page',
      'RSVP Form',
      'Registration Form',
      'Survey Page',
      'Feedback Page',
      'Lead Capture Form',
      'Application Form'
    ],
    features: ['Form Builder', 'Validation', 'Multi-step Form', 'Calendar Integration', 'Email Collection', 'Submission Tracking']
  },
  {
    group: 'Print & Digital Design Products',
    audience: 'Dành cho thiết kế in ấn/social',
    products: ['Poster', 'Brochure', 'Flyer', 'Banner', 'Social Post', 'Instagram Story', 'Facebook Cover', 'Menu Print', 'Invitation Card', 'Business Card'],
    features: ['Auto Layout', 'Smart Typography', 'Design Tokens', 'Print-safe Export', 'Social Size Presets']
  }
];

export default function PublicProductPage({ params }: PublicProductPageProps) {
  if (!params.slug) notFound();

  return (
    <AppShell
      title={`Published Product: ${params.slug}`}
      description="Public page hiển thị sản phẩm đã publish theo mô hình outcome-first: hoàn chỉnh nhanh, responsive, chia sẻ link ngay."
      action={
        <div className="flex items-center gap-2">
          <Link href="/create" className="rounded-lg border border-slate-300 px-3 py-2 text-sm hover:bg-slate-50">Tạo sản phẩm mới</Link>
          <Link href={`/editor/quick/${params.slug}`} className="rounded-lg bg-slate-900 px-3 py-2 text-sm text-white hover:bg-slate-700">Quick edit lại</Link>
        </div>
      }
    >
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold">Toàn bộ danh mục sản phẩm theo PR.md</h3>
        <p className="mt-1 text-sm text-slate-600">Renderer public này là lớp trình bày cho hệ thống generate → quick edit → quality check → publish.</p>
        <div className="mt-4 grid gap-4 xl:grid-cols-2">
          {productGroups.map((group) => (
            <article key={group.group} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <h4 className="text-sm font-semibold text-slate-900">{group.group}</h4>
              <p className="mt-1 text-xs uppercase tracking-wide text-slate-500">{group.audience}</p>
              <p className="mt-3 text-xs font-semibold text-slate-700">Products</p>
              <ul className="mt-1 flex flex-wrap gap-1 text-xs text-slate-600">
                {group.products.map((product) => (
                  <li key={product} className="rounded-full border border-slate-200 bg-white px-2 py-1">{product}</li>
                ))}
              </ul>
              <p className="mt-3 text-xs font-semibold text-slate-700">Core features</p>
              <ul className="mt-1 list-disc space-y-1 pl-4 text-sm text-slate-600">
                {group.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
