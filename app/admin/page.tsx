import { redirect } from "next/navigation";
import { requireAdminUser } from "@/lib/auth";
import { AdminProducts } from "@/components/admin/AdminProducts";
import { AdminCoupons } from "@/components/admin/AdminCoupons";

export default async function AdminPage() {
  const { user } = await requireAdminUser();

  if (!user) {
    redirect("/admin/login?error=forbidden");
  }

  return (
    <div className="space-y-8">
      <div className="rounded-3xl border border-white/70 bg-white/70 p-8">
        <p className="text-[11px] uppercase tracking-[0.4em] text-joie-text/50">Admin</p>
        <h1 className="mt-3 text-3xl font-serif text-joie-ink">商品管理</h1>
        <p className="mt-2 text-sm text-joie-text/70">
          商品情報を追加・更新するとフロントに自動反映されます。
        </p>
      </div>
      <AdminProducts userEmail={user.email ?? ""} />
      <AdminCoupons />
    </div>
  );
}
