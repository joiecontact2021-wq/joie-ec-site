"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";

export const AdminLoginForm = () => {
  const router = useRouter();
  const params = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const reason = params.get("error");

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const supabase = createBrowserSupabaseClient();
      if (password) {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (signInError) throw signInError;
        router.push("/admin");
      } else {
        const { error: otpError } = await supabase.auth.signInWithOtp({
          email,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback?next=/admin`,
          },
        });
        if (otpError) throw otpError;
        setMessage("ログインリンクを送信しました。メールをご確認ください。");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "ログインに失敗しました");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-lg rounded-3xl border border-white/70 bg-white/70 p-10">
      <p className="text-[11px] uppercase tracking-[0.4em] text-joie-text/50">Admin</p>
      <h1 className="mt-3 text-2xl font-serif text-joie-ink">管理画面ログイン</h1>
      <p className="mt-3 text-sm text-joie-text/70">
        メールアドレスのみでログインリンクを送信できます。パスワードを入力すると即時ログインできます。
      </p>
      <p className="mt-2 text-xs text-joie-text/60">管理者として許可されたメールのみログインできます。</p>
      {reason === "forbidden" ? (
        <p className="mt-4 text-xs text-red-600">管理者権限がありません。</p>
      ) : null}
      <form onSubmit={handleLogin} className="mt-6 space-y-4">
        <div>
          <label className="text-xs uppercase tracking-[0.3em] text-joie-text/50">Email</label>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            className="mt-2 w-full rounded-2xl border border-joie-mist/70 bg-white/70 px-4 py-3 text-sm"
          />
        </div>
        <div>
          <label className="text-xs uppercase tracking-[0.3em] text-joie-text/50">Password (optional)</label>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="mt-2 w-full rounded-2xl border border-joie-mist/70 bg-white/70 px-4 py-3 text-sm"
          />
        </div>
        {error ? <p className="text-xs text-red-600">{error}</p> : null}
        {message ? <p className="text-xs text-emerald-700">{message}</p> : null}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-joie-text px-5 py-3 text-xs uppercase tracking-[0.3em] text-white transition hover:opacity-80 disabled:opacity-60"
        >
          {loading ? "Sending..." : "Login"}
        </button>
      </form>
    </div>
  );
};
