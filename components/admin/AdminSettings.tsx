"use client";

import { useEffect, useState } from "react";

export const AdminSettings = () => {
  const [shippingFee, setShippingFee] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchSettings = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/admin/settings?key=shipping_fee");
      const data = await response.json();
      if (!response.ok) throw new Error(data?.error || "Failed to load");
      if (data?.data?.value !== null && data?.data?.value !== undefined) {
        setShippingFee(String(data.data.value));
      } else {
        setShippingFee("600");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "読み込みに失敗しました");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleSave = async () => {
    setLoading(true);
    setError(null);
    setMessage(null);
    try {
      const response = await fetch("/api/admin/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: "shipping_fee", value: shippingFee }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.error || "Failed to save");
      setShippingFee(data.data.value ?? shippingFee);
      setMessage("送料を更新しました。");
    } catch (err) {
      setError(err instanceof Error ? err.message : "更新に失敗しました");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4 rounded-3xl border border-white/70 bg-white/70 p-6">
      <div>
        <h2 className="text-lg font-serif text-joie-ink">送料設定</h2>
        <p className="mt-1 text-xs text-joie-text/60">
          送料は数量に関係なく一律で加算されます。
        </p>
      </div>

      <label className="text-xs uppercase tracking-[0.3em] text-joie-text/50">
        送料 (JPY)
        <input
          value={shippingFee}
          onChange={(event) => setShippingFee(event.target.value)}
          className="mt-2 w-full max-w-[240px] rounded-2xl border border-joie-mist/70 bg-white/70 px-4 py-3 text-sm"
        />
      </label>

      {error ? <p className="text-xs text-red-600">{error}</p> : null}
      {message ? <p className="text-xs text-emerald-700">{message}</p> : null}

      <button
        type="button"
        onClick={handleSave}
        disabled={loading}
        className="rounded-full bg-joie-text px-6 py-3 text-xs uppercase tracking-[0.3em] text-white transition hover:opacity-80 disabled:opacity-60"
      >
        送料を保存
      </button>
    </div>
  );
};
