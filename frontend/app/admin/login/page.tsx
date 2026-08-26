"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        const fallback = res.status === 401 ? "Username atau password salah." : "Terjadi kesalahan pada server. Coba lagi.";
        setError(body?.error ?? fallback);
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch {
      setError("Tidak bisa terhubung ke server. Coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-brand-dark px-4 text-white">
      <form
        className="w-full max-w-sm space-y-1 rounded-[20px] border border-white/10 bg-brand-surface p-8"
        onSubmit={handleSubmit}
      >
        <div className="text-2xl font-extrabold">
          BID<span className="text-brand-primary">TECH</span>
        </div>
        <p className="mb-4 text-sm text-zinc-400">Admin Dashboard</p>

        {error ? (
          <p className="mb-2 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs text-red-300">
            {error}
          </p>
        ) : null}

        <label className="mt-2 block text-xs text-zinc-400" htmlFor="username">
          Username
        </label>
        <input
          className="mt-1 w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2.5 text-sm text-white outline-none focus:border-lime-300/50"
          id="username"
          autoFocus
          autoComplete="username"
          onChange={(e) => setUsername(e.target.value)}
          required
          value={username}
        />

        <label className="mt-3 block text-xs text-zinc-400" htmlFor="password">
          Password
        </label>
        <div className="relative mt-1">
          <input
            className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2.5 pr-10 text-sm text-white outline-none focus:border-lime-300/50"
            id="password"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
            required
            type={showPassword ? "text" : "password"}
            value={password}
          />
          <button
            className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white transition"
            onClick={() => setShowPassword(!showPassword)}
            type="button"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        </div>

        <button
          className="mt-5 w-full rounded-full bg-brand-primary py-2.5 text-sm font-bold text-[#052e00] transition disabled:opacity-60"
          disabled={loading}
          type="submit"
        >
          {loading ? "Memproses…" : "Masuk"}
        </button>
      </form>
    </main>
  );
}
