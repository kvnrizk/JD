'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

export default function AdminLogin() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await api.post("/auth/login", form);
      router.push("/admin");
    } catch (err) {
      setError(err?.response?.data?.error || "Identifiants incorrects");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6" style={{ background: "#0B0B0C" }}>
      <div className="w-full max-w-sm">
        <div className="font-serif-display text-3xl text-white mb-2 text-center">
          Dr Joseph Dardas
        </div>
        <div className="overline text-center mb-12">Espace administration</div>

        <form onSubmit={submit} className="space-y-6 border border-white/10 p-8 bg-[#141416]">
          <div>
            <label className="overline mb-2 block text-white/55">Adresse e-mail</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full bg-transparent border-0 border-b border-white/15 focus:border-[#D4AF37] outline-none py-2.5 text-white font-light transition-colors"
              required
              autoComplete="email"
              data-testid="login-email"
            />
          </div>
          <div>
            <label className="overline mb-2 block text-white/55">Mot de passe</label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full bg-transparent border-0 border-b border-white/15 focus:border-[#D4AF37] outline-none py-2.5 text-white font-light transition-colors"
              required
              autoComplete="current-password"
              data-testid="login-password"
            />
          </div>

          {error && (
            <div className="text-red-400 text-sm border border-red-400/20 px-4 py-3 bg-red-400/05" data-testid="login-error">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-gold w-full justify-center"
            data-testid="login-submit"
          >
            {loading ? "Connexion…" : "Se connecter →"}
          </button>
        </form>
      </div>
    </div>
  );
}
