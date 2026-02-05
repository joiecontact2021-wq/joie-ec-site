import { Suspense } from "react";
import { AdminLoginForm } from "@/components/admin/AdminLoginForm";

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-lg rounded-3xl border border-white/70 bg-white/70 p-10 text-sm text-joie-text/60">
          Loading...
        </div>
      }
    >
      <AdminLoginForm />
    </Suspense>
  );
}
