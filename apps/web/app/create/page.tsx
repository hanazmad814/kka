import { AppShell } from '../../components/AppShell';

export default function CreatePage() {
  return (
    <AppShell
      title="Create Wizard"
      description="Entry page cho luồng tạo sản phẩm outcome-first. Wizard chi tiết sẽ xử lý product type, data input, style và generated variants."
    >
      <section className="rounded-xl border border-dashed border-slate-300 bg-white p-6 text-sm text-slate-600">
        Placeholder: Wizard sẽ được mount tại đây để thực hiện luồng Input → Generate → Select.
      </section>
    </AppShell>
  );
}
