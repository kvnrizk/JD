'use client';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import ClinicsAdmin from "@/components/admin/ClinicsAdmin";
import ResultsAdmin from "@/components/admin/ResultsAdmin";

const TABS = [
  { id: "clinics", label: "Cliniques" },
  { id: "results", label: "Résultats" },
];

export default function AdminPage() {
  const router = useRouter();
  const [session, setSession] = useState(null);
  const [checking, setChecking] = useState(true);
  const [tab, setTab] = useState("clinics");

  useEffect(() => {
    api.get("/auth/me")
      .then((r) => setSession(r.data))
      .catch(() => router.replace("/admin/login"))
      .finally(() => setChecking(false));
  }, [router]);

  const logout = async () => {
    await api.post("/auth/logout", {});
    router.replace("/admin/login");
  };

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#0B0B0C" }}>
        <div className="overline text-white/40">Vérification…</div>
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="min-h-screen" style={{ background: "#0B0B0C" }}>
      {/* Header */}
      <header className="border-b border-white/10 sticky top-0 z-40 backdrop-blur-xl bg-[#0B0B0C]/80">
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
          <div className="flex items-baseline gap-4">
            <span className="font-serif-display text-xl text-white">Administration</span>
            <span className="overline hidden md:inline" style={{ color: "#71717A" }}>Dr Joseph Dardas</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-white/40 text-xs hidden md:inline">{session.email}</span>
            <button
              onClick={logout}
              className="btn-ghost text-xs px-4 py-2"
              data-testid="admin-logout"
            >
              Déconnexion
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        {/* Tabs */}
        <div className="flex gap-1 mb-12 border-b border-white/10">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-6 py-3 text-sm tracking-wider transition-colors duration-300 ${
                tab === t.id
                  ? "text-[#D4AF37] border-b-2 border-[#D4AF37] -mb-px"
                  : "text-white/50 hover:text-white"
              }`}
              data-testid={`admin-tab-${t.id}`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === "clinics" && <ClinicsAdmin />}
        {tab === "results" && <ResultsAdmin />}
      </div>
    </div>
  );
}
