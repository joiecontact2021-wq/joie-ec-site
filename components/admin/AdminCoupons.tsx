"use client";

import { useEffect, useState } from "react";

type Coupon = {
  id: string;
  code: string;
  discount_type: "percent" | "amount";
  amount: number;
  is_active: boolean;
  stripe_coupon_id: string;
  created_at: string;
};

type Draft = {
  code: string;
  discount_type: "percent" | "amount";
  amount: string;
};

const emptyDraft: Draft = {
  code: "",
  discount_type: "percent",
  amount: "",
};

export const AdminCoupons = () => {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [draft, setDraft] = useState<Draft>(emptyDraft);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchCoupons = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/admin/coupons");
      const data = await response.json();
      if (!response.ok) throw new Error(data?.error || "Failed to load");
      setCoupons(data.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "読み込みに失敗しました");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const handleCreate = async () => {
    setLoading(true);
    setError(null);
    setMessage(null);
    try {
      const response = await fetch("/api/admin/coupons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(draft),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.error || "Failed to create");
      setCoupons((prev) => [data.data, ...prev]);
      setDraft(emptyDraft);
      setMessage("クーポンを作成しました。");
    } catch (err) {
      setError(err instanceof Error ? err.message : "作成に失敗しました");
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = async (id: string, is_active: boolean) => {
    setLoading(true);
    setError(null);
    setMessage(null);
    try {
      const response = await fetch(`/api/admin/coupons/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_active }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.error || "Failed to update");
      setCoupons((prev) => prev.map((coupon) => (coupon.id === id ? data.data : coupon)));
    } catch (err) {
      setError(err instanceof Error ? err.message : "更新に失敗しました");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("このクーポンを削除しますか？")) return;
    setLoading(true);
    setError(null);
    setMessage(null);
    try {
      const response = await fetch(`/api/admin/coupons/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.error || "Failed to delete");
      setCoupons((prev) => prev.filter((coupon) => coupon.id !== id));
      setMessage("削除しました。");
    } catch (err) {
      setError(err instanceof Error ? err.message : "削除に失敗しました");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 rounded-3xl border border-white/70 bg-white/70 p-6">
      <div>
        <h2 className="text-lg font-serif text-joie-ink">クーポン管理</h2>
        <p className="mt-1 text-xs text-joie-text/60">
          クーポンは作成後に割引種別・金額を変更できません。変更が必要な場合は新規作成してください。
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <label className="text-xs uppercase tracking-[0.3em] text-joie-text/50">
          コード
          <input
            value={draft.code}
            onChange={(event) => setDraft((prev) => ({ ...prev, code: event.target.value }))}
            className="mt-2 w-full rounded-2xl border border-joie-mist/70 bg-white/70 px-4 py-3 text-sm"
            placeholder="JOIE10"
          />
        </label>
        <label className="text-xs uppercase tracking-[0.3em] text-joie-text/50">
          割引種別
          <select
            value={draft.discount_type}
            onChange={(event) =>
              setDraft((prev) => ({ ...prev, discount_type: event.target.value as Draft["discount_type"] }))
            }
            className="mt-2 w-full rounded-2xl border border-joie-mist/70 bg-white/70 px-4 py-3 text-sm"
          >
            <option value="percent">％ 割引</option>
            <option value="amount">定額割引 (JPY)</option>
          </select>
        </label>
        <label className="text-xs uppercase tracking-[0.3em] text-joie-text/50">
          割引額
          <input
            value={draft.amount}
            onChange={(event) => setDraft((prev) => ({ ...prev, amount: event.target.value }))}
            className="mt-2 w-full rounded-2xl border border-joie-mist/70 bg-white/70 px-4 py-3 text-sm"
            placeholder={draft.discount_type === "percent" ? "10" : "500"}
          />
        </label>
      </div>

      {error ? <p className="text-xs text-red-600">{error}</p> : null}
      {message ? <p className="text-xs text-emerald-700">{message}</p> : null}

      <button
        type="button"
        onClick={handleCreate}
        disabled={loading}
        className="rounded-full bg-joie-text px-6 py-3 text-xs uppercase tracking-[0.3em] text-white transition hover:opacity-80 disabled:opacity-60"
      >
        クーポンを作成
      </button>

      <div className="space-y-3">
        {loading && coupons.length === 0 ? <p className="text-xs text-joie-text/60">読み込み中...</p> : null}
        {coupons.map((coupon) => (
          <div
            key={coupon.id}
            className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-joie-mist/70 bg-white/60 p-4 text-xs"
          >
            <div>
              <p className="text-[11px] uppercase tracking-[0.3em] text-joie-text/50">Code</p>
              <p className="text-sm text-joie-text">{coupon.code}</p>
              <p className="text-[11px] text-joie-text/60">
                {coupon.discount_type === "percent"
                  ? `${coupon.amount}% OFF`
                  : `¥ ${coupon.amount.toLocaleString("ja-JP")} OFF`}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => handleToggle(coupon.id, !coupon.is_active)}
                className="rounded-full border border-black/40 px-4 py-2 text-[11px] tracking-[0.2em] text-joie-text"
              >
                {coupon.is_active ? "無効化" : "有効化"}
              </button>
              <button
                type="button"
                onClick={() => handleDelete(coupon.id)}
                className="text-[11px] uppercase tracking-[0.3em] text-red-500"
              >
                削除
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
