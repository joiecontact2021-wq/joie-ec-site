import { NextResponse } from "next/server";
import { requireAdminUser } from "@/lib/auth";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { user, error } = await requireAdminUser();
  if (!user) {
    return NextResponse.json({ error: error?.message || "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const updates: Record<string, unknown> = {};

  if (body?.is_active !== undefined) {
    updates.is_active = Boolean(body.is_active);
  }

  const admin = createAdminSupabaseClient();
  const { data, error: updateError } = await admin
    .from("coupons")
    .update(updates)
    .eq("id", id)
    .select("id,code,discount_type,amount,is_active,stripe_coupon_id,created_at")
    .single();

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 });
  }

  return NextResponse.json({ data });
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { user, error } = await requireAdminUser();
  if (!user) {
    return NextResponse.json({ error: error?.message || "Unauthorized" }, { status: 401 });
  }

  const admin = createAdminSupabaseClient();
  const { error: deleteError } = await admin.from("coupons").delete().eq("id", id);

  if (deleteError) {
    return NextResponse.json({ error: deleteError.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
