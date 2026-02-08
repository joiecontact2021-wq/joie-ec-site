import { notFound } from "next/navigation";
import Link from "next/link";
import { getActiveProducts, getProductById, getProductBySlug } from "@/lib/products";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import { ProductActions } from "@/components/store/ProductActions";

export const dynamic = "force-dynamic";
export const dynamicParams = true;

export default async function ProductPage({
  params,
  searchParams,
}: {
  params: { slug: string } | Promise<{ slug: string }>;
  searchParams?: { id?: string; debug?: string } | Promise<{ id?: string; debug?: string }>;
}) {
  const isUuid = (value: string) =>
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value);
  const resolvedParams = await Promise.resolve(params);
  const resolvedSearchParams = await Promise.resolve(searchParams);
  const decodedSlug = decodeURIComponent(resolvedParams.slug);
  const separatorIndex = decodedSlug.lastIndexOf("--");
  const slugPart =
    separatorIndex >= 0 ? decodedSlug.slice(0, separatorIndex) : decodedSlug;
  const idFromSlug =
    separatorIndex >= 0 ? decodedSlug.slice(separatorIndex + 2) : undefined;
  const debugEnabled = resolvedSearchParams?.debug === "1";

  const fallbackId = isUuid(slugPart) ? slugPart : undefined;
  const requestedId = resolvedSearchParams?.id ?? idFromSlug ?? fallbackId;
  let product =
    (requestedId ? await getProductById(requestedId) : null) ??
    (await getProductBySlug(slugPart));
  if (!product) {
    const normalized = slugPart.trim().toLowerCase();
    const products = await getActiveProducts();
    product =
      (requestedId ? products.find((item) => item.id === requestedId) : null) ??
      products.find((item) => item.slug?.trim().toLowerCase() === normalized) ??
      null;
  }

  if (!product) {
    if (debugEnabled) {
      let adminError: string | null = null;
      let adminByIdFound = false;
      let adminBySlugFound = false;
      let adminCount: number | null = null;
      let adminSample: { id: string; slug: string | null; is_active: boolean | null }[] = [];

      try {
        const admin = createAdminSupabaseClient();
        const { data: sampleData, error: sampleError, count } = await admin
          .from("products")
          .select("id,slug,is_active", { count: "exact" })
          .limit(8);
        if (sampleError) {
          adminError = sampleError.message;
        } else {
          adminCount = count ?? null;
          adminSample = (sampleData ?? []) as typeof adminSample;
        }

        if (requestedId) {
          const { data: byIdData, error: byIdError } = await admin
            .from("products")
            .select("id")
            .eq("id", requestedId)
            .maybeSingle();
          if (byIdError) {
            adminError = adminError ?? byIdError.message;
          }
          adminByIdFound = Boolean(byIdData);
        }

        if (slugPart) {
          const { data: bySlugData, error: bySlugError } = await admin
            .from("products")
            .select("id")
            .eq("slug", slugPart)
            .maybeSingle();
          if (bySlugError) {
            adminError = adminError ?? bySlugError.message;
          }
          adminBySlugFound = Boolean(bySlugData);
        }
      } catch (error) {
        adminError = error instanceof Error ? error.message : "Admin client error";
      }

      const debugInfo = {
        slug: params.slug,
        decodedSlug,
        slugPart,
        requestedId,
        hasSupabaseUrl: Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL),
        hasAnonKey: Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
        hasServiceRole: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY),
        adminError,
        adminByIdFound,
        adminBySlugFound,
        adminCount,
        adminSample,
      };

      return (
        <div className="space-y-6">
          <nav className="font-ui text-[14px] tracking-[0.3em] text-joie-text/60 sm:text-[15px]">
            <Link href="/" className="hover:text-joie-text">
              ホーム
            </Link>{" "}
            / 商品詳細 (Debug)
          </nav>
          <div className="rounded-3xl border border-black/10 bg-white/70 p-6 text-sm text-joie-text/80">
            <p className="mb-3 text-xs uppercase tracking-[0.3em] text-joie-text/50">
              Debug Info
            </p>
            <pre className="whitespace-pre-wrap break-all text-[12px] leading-relaxed">
              {JSON.stringify(debugInfo, null, 2)}
            </pre>
          </div>
        </div>
      );
    }

    notFound();
  }

  return (
    <div className="space-y-8">
      <nav className="font-ui text-[14px] tracking-[0.3em] text-joie-text/60 sm:text-[15px]">
        <Link href="/" className="hover:text-joie-text">
          ホーム
        </Link>{" "}
        /{" "}
        <Link href="/" className="hover:text-joie-text">
          商品一覧
        </Link>{" "}
        / {product.name}
      </nav>

      <div className="grid gap-10 md:grid-cols-2">
        <div className="aspect-square w-full overflow-hidden bg-[#f8f8f8]">
          {product.image_url ? (
            <img
              src={product.image_url}
              alt={product.name}
              className="h-full w-full object-contain"
              loading="lazy"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-joie-text/40">
              No Image
            </div>
          )}
        </div>

        <div className="space-y-5">
          <p className="text-[10px] uppercase tracking-[0.4em] text-joie-text/60">
            {product.category || "Product"}
          </p>
          <h1 className="text-2xl tracking-[0.04em] text-joie-text">{product.name}</h1>
          <p className="text-sm leading-relaxed text-joie-text/70">
            {product.description || "丁寧につくられたヘアケアプロダクトです。"}
          </p>
          <ProductActions product={product} />
          <div className="text-[11px] leading-relaxed text-joie-text/60">
            <p>配送目安: 3営業日以内に発送</p>
            <p>返品: 商品到着後7日以内にご連絡ください</p>
          </div>
        </div>
      </div>
    </div>
  );
}
