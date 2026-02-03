import { createServerSupabaseClient } from "@/lib/supabase/server";

const normalizeEmail = (value?: string | null) =>
  value?.trim().toLowerCase() ?? "";

export const getAdminEmails = () => {
  const raw = process.env.ADMIN_EMAILS || "";
  return raw
    .split(",")
    .map((email) => normalizeEmail(email))
    .filter(Boolean);
};

export const isAdminEmail = (email?: string | null) => {
  const admins = getAdminEmails();
  if (admins.length === 0) {
    return true;
  }
  return admins.includes(normalizeEmail(email));
};

export const requireAdminUser = async () => {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    return { user: null, error: error ?? new Error("Unauthorized") };
  }

  if (!isAdminEmail(data.user.email)) {
    return { user: null, error: new Error("Forbidden") };
  }

  return { user: data.user, error: null };
};
