"use client";

import { useRouter } from "next/navigation";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";

export const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createBrowserSupabaseClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="rounded-full border border-joie-text/20 px-4 py-2 text-[11px] uppercase tracking-[0.3em] text-joie-text/60"
    >
      Logout
    </button>
  );
};
