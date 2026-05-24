import type { ReactNode } from 'react';
import Link from 'next/link';

type AppShellProps = {
  children: ReactNode;
  title?: string;
  description?: string;
  action?: ReactNode;
};

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/create', label: 'Create' }
];

const pipeline = ['Input Data', 'Generate 3-6 Variants', 'Select', 'Quick Edit', 'Quality Check', 'Publish'];

export function AppShell({ children, title, description, action }: AppShellProps) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto w-full max-w-6xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">Smart Product Builder</p>
              <h1 className="text-base font-semibold sm:text-lg">Outcome-first · Editor-second platform</h1>
              <p className="mt-1 text-xs text-slate-500">Tạo sản phẩm hoàn chỉnh trong vài phút cho non-designer và non-developer.</p>
            </div>
            <nav className="flex flex-wrap items-center gap-2 text-sm">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href} className="rounded-md px-3 py-2 hover:bg-slate-100">
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {pipeline.map((step) => (
              <span key={step} className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs text-slate-700">
                {step}
              </span>
            ))}
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {(title || description || action) && (
          <section className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                {title && <h2 className="text-2xl font-bold tracking-tight">{title}</h2>}
                {description && <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">{description}</p>}
              </div>
              {action ? <div>{action}</div> : null}
            </div>
          </section>
        )}

        {children}
      </main>
    </div>
  );
}
