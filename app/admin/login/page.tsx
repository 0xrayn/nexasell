"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Zap, ShieldCheck, Lock, Mail } from "lucide-react";
import Link from "next/link";

export default function AdminLogin() {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: "admin@nexasell.id", password: "admin123" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push("/admin");
    }, 1200);
  };

  return (
    <div className="min-h-screen flex" style={{ background: "var(--bg)" }}>
      {/* Left panel — branding */}
      <div className="hidden lg:flex flex-col justify-between w-[45%] p-12 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg,#09061e 0%,#130a36 50%,#0a1128 100%)" }}>
        {/* Ambient blobs */}
        <div className="absolute top-0 left-0 w-96 h-96 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle,rgba(99,102,241,0.2) 0%,transparent 70%)", transform: "translate(-30%,-30%)" }} />
        <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle,rgba(139,92,246,0.18) 0%,transparent 70%)", transform: "translate(20%,20%)" }} />
        {/* Rings */}
        <div className="absolute top-1/2 left-1/2 w-80 h-80 rounded-full border border-white/5"
          style={{ transform: "translate(-50%,-50%)" }} />
        <div className="absolute top-1/2 left-1/2 w-52 h-52 rounded-full border border-indigo-500/15"
          style={{ transform: "translate(-50%,-50%)" }} />

        <div className="relative z-10">
          <Link href="/" className="inline-flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl flex items-center justify-center"
              style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)", boxShadow: "0 4px 20px rgba(99,102,241,0.45)" }}>
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="font-black text-xl text-white" style={{ fontFamily: "Outfit,sans-serif" }}>
              Nexa<span style={{ color: "#818cf8" }}>Sell</span>
            </span>
          </Link>
        </div>

        <div className="relative z-10">
          <div className="w-14 h-14 rounded-3xl flex items-center justify-center mb-6"
            style={{ background: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.3)" }}>
            <ShieldCheck className="w-7 h-7" style={{ color: "#818cf8" }} />
          </div>
          <h2 className="text-3xl font-black text-white mb-3" style={{ fontFamily: "Outfit,sans-serif" }}>
            Admin Panel
          </h2>
          <p className="text-sm leading-relaxed max-w-xs" style={{ color: "rgba(255,255,255,0.45)" }}>
            Kelola produk, pantau penjualan, dan analisis performa toko Anda dalam satu dashboard.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-3">
            {[
              { v: "16+", l: "Produk Aktif" },
              { v: "1.6K", l: "Transaksi" },
              { v: "Rp141M", l: "Revenue" },
              { v: "1.2K", l: "Pelanggan" },
            ].map(({ v, l }) => (
              <div key={l} className="p-3 rounded-2xl" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <p className="text-base font-black text-white" style={{ fontFamily: "Outfit,sans-serif" }}>{v}</p>
                <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.4)" }}>{l}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="relative z-10 text-[11px]" style={{ color: "rgba(255,255,255,0.25)" }}>
          © 2026 NexaSell · Admin Portal
        </p>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-8">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="flex lg:hidden items-center gap-3 mb-8">
            <div className="w-9 h-9 rounded-2xl flex items-center justify-center"
              style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)", boxShadow: "0 4px 16px rgba(99,102,241,0.35)" }}>
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="font-black text-xl" style={{ color: "var(--text)", fontFamily: "Outfit,sans-serif" }}>
              Nexa<span style={{ color: "#6366f1" }}>Sell</span>
            </span>
          </div>

          <div className="mb-8">
            <h1 className="font-black text-2xl sm:text-3xl mb-2" style={{ color: "var(--text)", fontFamily: "Outfit,sans-serif" }}>
              Selamat Datang 👋
            </h1>
            <p className="text-sm" style={{ color: "var(--text2)" }}>Masuk ke Admin Panel NexaSell</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-xs font-bold mb-2" style={{ color: "var(--text2)" }}>Email</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "var(--text3)" }} />
                <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} required
                  className="w-full pl-11 pr-4 py-3 rounded-2xl text-sm font-medium outline-none transition-all"
                  style={{ background: "var(--surface2)", border: "1.5px solid var(--border)", color: "var(--text)" }}
                  onFocus={e => (e.target.style.borderColor = "#6366f1")}
                  onBlur={e => (e.target.style.borderColor = "var(--border)")} />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-bold mb-2" style={{ color: "var(--text2)" }}>Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "var(--text3)" }} />
                <input type={show ? "text" : "password"} value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} required
                  className="w-full pl-11 pr-12 py-3 rounded-2xl text-sm font-medium outline-none transition-all"
                  style={{ background: "var(--surface2)", border: "1.5px solid var(--border)", color: "var(--text)" }}
                  onFocus={e => (e.target.style.borderColor = "#6366f1")}
                  onBlur={e => (e.target.style.borderColor = "var(--border)")} />
                <button type="button" onClick={() => setShow(s => !s)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center"
                  style={{ color: "var(--text3)" }}>
                  {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <div className="flex justify-end mt-1.5">
                <button type="button" className="text-xs font-semibold" style={{ color: "#6366f1" }}>Lupa password?</button>
              </div>
            </div>

            {/* Hint */}
            <div className="p-3 rounded-2xl text-xs" style={{ background: "rgba(99,102,241,0.07)", border: "1px solid rgba(99,102,241,0.15)", color: "var(--text2)" }}>
              Demo: <span className="font-bold" style={{ color: "#6366f1" }}>admin@nexasell.id</span> / <span className="font-bold" style={{ color: "#6366f1" }}>admin123</span>
            </div>

            <button type="submit" disabled={loading}
              className="w-full py-3.5 rounded-2xl text-white font-black text-sm flex items-center justify-center gap-2 transition-all active:scale-95"
              style={{ background: "linear-gradient(135deg,#6366f1,#7c3aed)", boxShadow: "0 4px 20px rgba(99,102,241,0.4)", opacity: loading ? 0.8 : 1 }}>
              {loading ? (
                <>
                  <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  Masuk...
                </>
              ) : "Masuk ke Admin Panel →"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link href="/cashier/login" className="text-xs font-semibold" style={{ color: "#10b981" }}>
              Pergi ke Cashier Station →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
