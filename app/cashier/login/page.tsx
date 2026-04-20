"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Zap, CreditCard, Lock, User } from "lucide-react";
import Link from "next/link";

export default function CashierLogin() {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ username: "siti", password: "cashier123" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); router.push("/cashier"); }, 1200);
  };

  return (
    <div className="min-h-screen flex" style={{ background: "var(--bg)" }}>
      {/* Left branding */}
      <div className="hidden lg:flex flex-col justify-between w-[45%] p-12 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg,#051c14 0%,#07291e 50%,#071a18 100%)" }}>
        <div className="absolute top-0 left-0 w-96 h-96 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle,rgba(16,185,129,0.2) 0%,transparent 70%)", transform: "translate(-30%,-30%)" }} />
        <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle,rgba(6,182,212,0.15) 0%,transparent 70%)", transform: "translate(20%,20%)" }} />

        <div className="relative z-10">
          <Link href="/" className="inline-flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl flex items-center justify-center"
              style={{ background: "linear-gradient(135deg,#10b981,#06b6d4)", boxShadow: "0 4px 20px rgba(16,185,129,0.45)" }}>
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="font-black text-xl text-white" style={{ fontFamily: "Outfit,sans-serif" }}>
              Nexa<span style={{ color: "#34d399" }}>Sell</span>
            </span>
          </Link>
        </div>

        <div className="relative z-10">
          <div className="w-14 h-14 rounded-3xl flex items-center justify-center mb-6"
            style={{ background: "rgba(16,185,129,0.15)", border: "1px solid rgba(16,185,129,0.3)" }}>
            <CreditCard className="w-7 h-7" style={{ color: "#34d399" }} />
          </div>
          <h2 className="text-3xl font-black text-white mb-3" style={{ fontFamily: "Outfit,sans-serif" }}>Cashier Station</h2>
          <p className="text-sm leading-relaxed max-w-xs" style={{ color: "rgba(255,255,255,0.45)" }}>
            Proses transaksi dengan cepat, hitung kembalian otomatis, dan layani pelanggan lebih efisien.
          </p>
          <div className="mt-8 p-4 rounded-3xl" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <p className="text-xs font-bold text-white/60 mb-2">Shift Aktif Hari Ini</p>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-black text-white"
                style={{ background: "linear-gradient(135deg,#10b981,#06b6d4)" }}>S</div>
              <div>
                <p className="text-sm font-bold text-white">Siti Rahayu</p>
                <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.4)" }}>Shift Pagi · 07:00 – 15:00</p>
              </div>
              <div className="ml-auto w-2 h-2 rounded-full bg-emerald-400" />
            </div>
          </div>
        </div>
        <p className="relative z-10 text-[11px]" style={{ color: "rgba(255,255,255,0.25)" }}>© 2026 NexaSell · Cashier Portal</p>
      </div>

      {/* Right form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-8">
        <div className="w-full max-w-md">
          <div className="flex lg:hidden items-center gap-3 mb-8">
            <div className="w-9 h-9 rounded-2xl flex items-center justify-center"
              style={{ background: "linear-gradient(135deg,#10b981,#06b6d4)", boxShadow: "0 4px 16px rgba(16,185,129,0.35)" }}>
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="font-black text-xl" style={{ color: "var(--text)", fontFamily: "Outfit,sans-serif" }}>
              Nexa<span style={{ color: "#10b981" }}>Sell</span>
            </span>
          </div>

          <div className="mb-8">
            <h1 className="font-black text-2xl sm:text-3xl mb-2" style={{ color: "var(--text)", fontFamily: "Outfit,sans-serif" }}>
              Mulai Shift 👋
            </h1>
            <p className="text-sm" style={{ color: "var(--text2)" }}>Masuk ke Cashier Station NexaSell</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold mb-2" style={{ color: "var(--text2)" }}>Username</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "var(--text3)" }} />
                <input type="text" value={form.username} onChange={e => setForm(f => ({ ...f, username: e.target.value }))} required
                  className="w-full pl-11 pr-4 py-3 rounded-2xl text-sm font-medium outline-none transition-all"
                  style={{ background: "var(--surface2)", border: "1.5px solid var(--border)", color: "var(--text)" }}
                  onFocus={e => (e.target.style.borderColor = "#10b981")}
                  onBlur={e => (e.target.style.borderColor = "var(--border)")} />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold mb-2" style={{ color: "var(--text2)" }}>Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "var(--text3)" }} />
                <input type={show ? "text" : "password"} value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} required
                  className="w-full pl-11 pr-12 py-3 rounded-2xl text-sm font-medium outline-none transition-all"
                  style={{ background: "var(--surface2)", border: "1.5px solid var(--border)", color: "var(--text)" }}
                  onFocus={e => (e.target.style.borderColor = "#10b981")}
                  onBlur={e => (e.target.style.borderColor = "var(--border)")} />
                <button type="button" onClick={() => setShow(s => !s)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2" style={{ color: "var(--text3)" }}>
                  {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="p-3 rounded-2xl text-xs" style={{ background: "rgba(16,185,129,0.07)", border: "1px solid rgba(16,185,129,0.18)", color: "var(--text2)" }}>
              Demo: <span className="font-bold" style={{ color: "#10b981" }}>siti</span> / <span className="font-bold" style={{ color: "#10b981" }}>cashier123</span>
            </div>

            <button type="submit" disabled={loading}
              className="w-full py-3.5 rounded-2xl text-white font-black text-sm flex items-center justify-center gap-2 transition-all active:scale-95"
              style={{ background: "linear-gradient(135deg,#10b981,#059669)", boxShadow: "0 4px 20px rgba(16,185,129,0.4)", opacity: loading ? 0.8 : 1 }}>
              {loading ? (
                <><div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />Masuk...</>
              ) : "Mulai Shift →"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link href="/admin/login" className="text-xs font-semibold" style={{ color: "#6366f1" }}>
              Pergi ke Admin Panel →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
