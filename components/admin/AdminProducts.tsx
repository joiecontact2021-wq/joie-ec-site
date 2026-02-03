"use client";

import { useEffect, useMemo, useState } from "react";
import type { Product } from "@/lib/types";
import { formatJPY } from "@/lib/utils";
import { LogoutButton } from "@/components/admin/LogoutButton";

type Draft = {
  name: string;
  price: string;
  description: string;
  image_url: string;
  category: string;
  stock: string;
  is_active: boolean;
  sort_order: string;
  slug: string;
};

const emptyDraft: Draft = {
  name: "",
  price: "",
  description: "",
  image_url: "",
  category: "",
  stock: "",
  is_active: true,
  sort_order: "",
  slug: "",
};

export const AdminProducts = ({ userEmail }: { userEmail: string }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [draft, setDraft] = useState<Draft>(emptyDraft);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/admin/products");
      const data = await response.json();
      if (!response.ok) throw new Error(data?.error || "Failed to load");
      setProducts(data.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "読み込みに失敗しました");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleCreate = async () => {
    setLoading(true);
    setError(null);
    setMessage(null);
    try {
      const response = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(draft),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.error || "Failed to create");
      setDraft(emptyDraft);
      setMessage("商品を追加しました。");
      setProducts((prev) => [data.data, ...prev]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "保存に失敗しました");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (id: string, patch: Partial<Draft>) => {
    setLoading(true);
    setError(null);
    setMessage(null);
    try {
      const response = await fetch(`/api/admin/products/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patch),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.error || "Failed to update");
      setProducts((prev) => prev.map((product) => (product.id === id ? data.data : product)));
      setMessage("更新しました。");
    } catch (err) {
      setError(err instanceof Error ? err.message : "更新に失敗しました");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("この商品を削除しますか？")) return;
    setLoading(true);
    setError(null);
    setMessage(null);
    try {
      const response = await fetch(`/api/admin/products/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.error || "Failed to delete");
      setProducts((prev) => prev.filter((product) => product.id !== id));
      setMessage("削除しました。");
    } catch (err) {
      setError(err instanceof Error ? err.message : "削除に失敗しました");
    } finally {
      setLoading(false);
    }
  };

  const stats = useMemo(() => {
    const active = products.filter((product) => product.is_active).length;
    return { total: products.length, active };
  }, [products]);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-white/70 bg-white/70 p-6 text-sm">
        <div>
          <p className="text-[11px] uppercase tracking-[0.3em] text-joie-text/50">Signed in as</p>
          <p className="text-joie-text/80">{userEmail}</p>
        </div>
        <div className="text-xs text-joie-text/60">
          公開中 {stats.active} / 全体 {stats.total}
        </div>
        <LogoutButton />
      </div>

      <div className="rounded-3xl border border-white/70 bg-white/70 p-6">
        <h2 className="text-lg font-serif text-joie-ink">新規商品を追加</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <label className="text-xs uppercase tracking-[0.3em] text-joie-text/50">
            商品名
            <input
              value={draft.name}
              onChange={(event) => setDraft((prev) => ({ ...prev, name: event.target.value }))}
              className="mt-2 w-full rounded-2xl border border-joie-mist/70 bg-white/70 px-4 py-3 text-sm"
            />
          </label>
          <label className="text-xs uppercase tracking-[0.3em] text-joie-text/50">
            価格 (JPY)
            <input
              value={draft.price}
              onChange={(event) => setDraft((prev) => ({ ...prev, price: event.target.value }))}
              className="mt-2 w-full rounded-2xl border border-joie-mist/70 bg-white/70 px-4 py-3 text-sm"
            />
          </label>
          <label className="text-xs uppercase tracking-[0.3em] text-joie-text/50">
            カテゴリー
            <input
              value={draft.category}
              onChange={(event) => setDraft((prev) => ({ ...prev, category: event.target.value }))}
              className="mt-2 w-full rounded-2xl border border-joie-mist/70 bg-white/70 px-4 py-3 text-sm"
            />
          </label>
          <label className="text-xs uppercase tracking-[0.3em] text-joie-text/50">
            在庫
            <input
              value={draft.stock}
              onChange={(event) => setDraft((prev) => ({ ...prev, stock: event.target.value }))}
              className="mt-2 w-full rounded-2xl border border-joie-mist/70 bg-white/70 px-4 py-3 text-sm"
            />
          </label>
          <label className="text-xs uppercase tracking-[0.3em] text-joie-text/50 md:col-span-2">
            画像URL
            <input
              value={draft.image_url}
              onChange={(event) => setDraft((prev) => ({ ...prev, image_url: event.target.value }))}
              className="mt-2 w-full rounded-2xl border border-joie-mist/70 bg-white/70 px-4 py-3 text-sm"
            />
          </label>
          <label className="text-xs uppercase tracking-[0.3em] text-joie-text/50 md:col-span-2">
            説明文
            <textarea
              value={draft.description}
              onChange={(event) => setDraft((prev) => ({ ...prev, description: event.target.value }))}
              className="mt-2 min-h-[120px] w-full rounded-2xl border border-joie-mist/70 bg-white/70 px-4 py-3 text-sm"
            />
          </label>
          <label className="text-xs uppercase tracking-[0.3em] text-joie-text/50">
            スラッグ (任意)
            <input
              value={draft.slug}
              onChange={(event) => setDraft((prev) => ({ ...prev, slug: event.target.value }))}
              className="mt-2 w-full rounded-2xl border border-joie-mist/70 bg-white/70 px-4 py-3 text-sm"
            />
          </label>
          <label className="text-xs uppercase tracking-[0.3em] text-joie-text/50">
            表示順
            <input
              value={draft.sort_order}
              onChange={(event) => setDraft((prev) => ({ ...prev, sort_order: event.target.value }))}
              className="mt-2 w-full rounded-2xl border border-joie-mist/70 bg-white/70 px-4 py-3 text-sm"
            />
          </label>
          <label className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-joie-text/50">
            <input
              type="checkbox"
              checked={draft.is_active}
              onChange={(event) => setDraft((prev) => ({ ...prev, is_active: event.target.checked }))}
              className="h-4 w-4"
            />
            公開する
          </label>
        </div>
        {error ? <p className="mt-4 text-xs text-red-600">{error}</p> : null}
        {message ? <p className="mt-4 text-xs text-emerald-700">{message}</p> : null}
        <button
          type="button"
          onClick={handleCreate}
          disabled={loading}
          className="mt-6 rounded-full bg-joie-text px-6 py-3 text-xs uppercase tracking-[0.3em] text-white transition hover:opacity-80 disabled:opacity-60"
        >
          {loading ? "Saving..." : "商品を追加"}
        </button>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-serif text-joie-ink">既存の商品</h2>
        {loading && products.length === 0 ? (
          <p className="text-sm text-joie-text/60">読み込み中...</p>
        ) : null}
        {products.map((product) => (
          <div key={product.id} className="rounded-3xl border border-white/70 bg-white/70 p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-joie-text/50">{product.category || ""}</p>
                <h3 className="text-lg font-serif text-joie-ink">{product.name}</h3>
              </div>
              <div className="text-sm text-joie-text/70">{formatJPY(product.price)}</div>
            </div>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <label className="text-xs uppercase tracking-[0.3em] text-joie-text/50">
                商品名
                <input
                  defaultValue={product.name}
                  onBlur={(event) => handleUpdate(product.id, { name: event.target.value })}
                  className="mt-2 w-full rounded-2xl border border-joie-mist/70 bg-white/70 px-4 py-3 text-sm"
                />
              </label>
              <label className="text-xs uppercase tracking-[0.3em] text-joie-text/50">
                価格 (JPY)
                <input
                  defaultValue={product.price}
                  onBlur={(event) => handleUpdate(product.id, { price: event.target.value })}
                  className="mt-2 w-full rounded-2xl border border-joie-mist/70 bg-white/70 px-4 py-3 text-sm"
                />
              </label>
              <label className="text-xs uppercase tracking-[0.3em] text-joie-text/50">
                カテゴリー
                <input
                  defaultValue={product.category ?? ""}
                  onBlur={(event) => handleUpdate(product.id, { category: event.target.value })}
                  className="mt-2 w-full rounded-2xl border border-joie-mist/70 bg-white/70 px-4 py-3 text-sm"
                />
              </label>
              <label className="text-xs uppercase tracking-[0.3em] text-joie-text/50">
                在庫
                <input
                  defaultValue={product.stock ?? ""}
                  onBlur={(event) => handleUpdate(product.id, { stock: event.target.value })}
                  className="mt-2 w-full rounded-2xl border border-joie-mist/70 bg-white/70 px-4 py-3 text-sm"
                />
              </label>
              <label className="text-xs uppercase tracking-[0.3em] text-joie-text/50 md:col-span-2">
                画像URL
                <input
                  defaultValue={product.image_url ?? ""}
                  onBlur={(event) => handleUpdate(product.id, { image_url: event.target.value })}
                  className="mt-2 w-full rounded-2xl border border-joie-mist/70 bg-white/70 px-4 py-3 text-sm"
                />
              </label>
              <label className="text-xs uppercase tracking-[0.3em] text-joie-text/50 md:col-span-2">
                説明文
                <textarea
                  defaultValue={product.description ?? ""}
                  onBlur={(event) => handleUpdate(product.id, { description: event.target.value })}
                  className="mt-2 min-h-[120px] w-full rounded-2xl border border-joie-mist/70 bg-white/70 px-4 py-3 text-sm"
                />
              </label>
              <label className="text-xs uppercase tracking-[0.3em] text-joie-text/50">
                スラッグ
                <input
                  defaultValue={product.slug}
                  onBlur={(event) => handleUpdate(product.id, { slug: event.target.value })}
                  className="mt-2 w-full rounded-2xl border border-joie-mist/70 bg-white/70 px-4 py-3 text-sm"
                />
              </label>
              <label className="text-xs uppercase tracking-[0.3em] text-joie-text/50">
                表示順
                <input
                  defaultValue={product.sort_order ?? ""}
                  onBlur={(event) => handleUpdate(product.id, { sort_order: event.target.value })}
                  className="mt-2 w-full rounded-2xl border border-joie-mist/70 bg-white/70 px-4 py-3 text-sm"
                />
              </label>
              <label className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-joie-text/50">
                <input
                  type="checkbox"
                  defaultChecked={product.is_active}
                  onChange={(event) => handleUpdate(product.id, { is_active: event.target.checked })}
                  className="h-4 w-4"
                />
                公開
              </label>
            </div>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-4 text-xs text-joie-text/50">
              <span>Slug: {product.slug}</span>
              <button
                type="button"
                onClick={() => handleDelete(product.id)}
                className="text-xs uppercase tracking-[0.3em] text-red-500"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
