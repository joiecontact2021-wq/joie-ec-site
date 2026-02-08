import { NextRequest, NextResponse } from "next/server";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import { createServerSupabaseClient } from "@/lib/supabase/server";

const normalizeSlug = (value: string | null) => {
  if (!value) return "";
  let decoded = value;
  try {
    decoded = decodeURIComponent(value);
  } catch {
    decoded = value;
  }
  return decoded.trim().normalize("NFC").toLowerCase();
};

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const id = url.searchParams.get("id")?.trim() || null;
  const slug = url.searchParams.get("slug")?.trim() || null;
  const normalizedSlug = normalizeSlug(slug);

  const env = {
    hasSupabaseUrl: Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL),
    hasAnonKey: Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
    hasServiceRole: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY),
  };

  const adminInfo = {
    error: null as string | null,
    count: null as number | null,
    byId: false,
    bySlug: false,
    sample: [] as { id: string; slug: string | null; is_active: boolean | null }[],
  };

  const anonInfo = {
    error: null as string | null,
    count: null as number | null,
    byId: false,
    bySlug: false,
    sample: [] as { id: string; slug: string | null; is_active: boolean | null }[],
  };

  try {
    if (!env.hasSupabaseUrl || !env.hasServiceRole) {
      adminInfo.error = "Missing service role env";
    } else {
      const admin = createAdminSupabaseClient();
      const { data: sampleData, error: sampleError, count } = await admin
        .from("products")
        .select("id,slug,is_active", { count: "exact" })
        .limit(8);
      if (sampleError) {
        adminInfo.error = sampleError.message;
      } else {
        adminInfo.count = count ?? null;
        adminInfo.sample = (sampleData ?? []) as typeof adminInfo.sample;
      }

      if (id) {
        const { data, error } = await admin
          .from("products")
          .select("id")
          .eq("id", id)
          .maybeSingle();
        if (error) adminInfo.error = adminInfo.error ?? error.message;
        adminInfo.byId = Boolean(data);
      }

      if (normalizedSlug) {
        const { data, error } = await admin
          .from("products")
          .select("id")
          .eq("slug", normalizedSlug)
          .maybeSingle();
        if (error) adminInfo.error = adminInfo.error ?? error.message;
        adminInfo.bySlug = Boolean(data);
      }
    }
  } catch (error) {
    adminInfo.error = error instanceof Error ? error.message : "Admin query failed";
  }

  try {
    if (!env.hasSupabaseUrl || !env.hasAnonKey) {
      anonInfo.error = "Missing anon env";
    } else {
      const supabase = await createServerSupabaseClient();
      const { data: sampleData, error: sampleError, count } = await supabase
        .from("products")
        .select("id,slug,is_active", { count: "exact" })
        .limit(8);
      if (sampleError) {
        anonInfo.error = sampleError.message;
      } else {
        anonInfo.count = count ?? null;
        anonInfo.sample = (sampleData ?? []) as typeof anonInfo.sample;
      }

      if (id) {
        const { data, error } = await supabase
          .from("products")
          .select("id")
          .eq("id", id)
          .maybeSingle();
        if (error) anonInfo.error = anonInfo.error ?? error.message;
        anonInfo.byId = Boolean(data);
      }

      if (normalizedSlug) {
        const { data, error } = await supabase
          .from("products")
          .select("id")
          .eq("slug", normalizedSlug)
          .maybeSingle();
        if (error) anonInfo.error = anonInfo.error ?? error.message;
        anonInfo.bySlug = Boolean(data);
      }
    }
  } catch (error) {
    anonInfo.error = error instanceof Error ? error.message : "Anon query failed";
  }

  return NextResponse.json({
    requested: { id, slug, normalizedSlug },
    env,
    admin: adminInfo,
    anon: anonInfo,
    timestamp: new Date().toISOString(),
  });
}
