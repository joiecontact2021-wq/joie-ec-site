import { cookies } from "next/headers";
import { createServerClient, type CookieOptions } from "@supabase/ssr";

export const createServerSupabaseClient = async () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error("Missing Supabase env vars: NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY");
  }

  const cookieStore = await cookies();

  return createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return typeof cookieStore.getAll === "function" ? cookieStore.getAll() : [];
      },
      setAll(cookiesToSet: { name: string; value: string; options: CookieOptions }[]) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            if (typeof cookieStore.set === "function") {
              cookieStore.set(name, value, options);
            }
          });
        } catch {
          // Server Components can be read-only.
        }
      },
    },
  });
};
