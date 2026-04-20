"use client";
import { Package, ShoppingBag, TrendingUp, Users, Clock, Star } from "lucide-react";
import { products, salesData, recentTransactions } from "@/data/products";
import { formatRupiah } from "@/lib/utils";
import RevenueChart from "@/components/admin/RevenueChart";
import Link from "next/link";

const totalRevenue = salesData.reduce((s, d) => s + d.revenue, 0);
const totalTx = salesData.reduce((s, d) => s + d.transactions, 0);

const stats = [
  { label: "Total Produk",  sub: "+3 bulan ini",         value: String(products.length), icon: Package,    from: "#3b82f6", to: "#6366f1", glow: "rgba(99,102,241,0.35)" },
  { label: "Total Revenue", sub: "+18% dari bulan lalu",  value: formatRupiah(totalRevenue), icon: TrendingUp, from: "#8b5cf6", to: "#d946ef", glow: "rgba(139,92,246,0.35)" },
  { label: "Total Pesanan", sub: "+256 bulan ini",        value: totalTx.toLocaleString(), icon: ShoppingBag, from: "#10b981", to: "#06b6d4", glow: "rgba(16,185,129,0.35)" },
  { label: "Pelanggan",     sub: "+89 minggu ini",        value: "1.284",                  icon: Users,       from: "#f59e0b", to: "#ef4444", glow: "rgba(245,158,11,0.35)" },
];

export default function AdminDashboard() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 w-full max-w-full" style={{ background: "var(--bg)", minHeight: "100vh" }}>

      {/* Header */}
      <div className="flex items-start justify-between mb-7 anim-slide-up">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-1" style={{ color: "var(--text3)" }}>Overview</p>
          <h1 className="font-black text-2xl sm:text-3xl" style={{ color: "var(--text)", fontFamily: "Outfit,sans-serif" }}>Dashboard</h1>
          <p className="text-sm mt-0.5" style={{ color: "var(--text2)" }}>Selamat datang kembali, Admin 👋</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-2 rounded-2xl" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
          <span className="w-2 h-2 rounded-full bg-emerald-400 anim-pulse" />
          <span className="text-xs font-semibold" style={{ color: "var(--text2)" }}>Live</span>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4 mb-6">
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={s.label}
              className="relative overflow-hidden rounded-3xl p-5 text-white anim-slide-up"
              style={{
                background: `linear-gradient(135deg, ${s.from}, ${s.to})`,
                boxShadow: `0 8px 32px ${s.glow}`,
                animationDelay: `${i * 0.07}s`,
              }}>
              {/* Decorative circles */}
              <div className="absolute -top-8 -right-8 w-28 h-28 rounded-full" style={{ background: "rgba(255,255,255,0.1)" }} />
              <div className="absolute -bottom-6 -left-4 w-20 h-20 rounded-full" style={{ background: "rgba(255,255,255,0.07)" }} />

              <div className="relative z-10">
                <div className="w-9 h-9 rounded-2xl flex items-center justify-center mb-3" style={{ background: "rgba(255,255,255,0.2)" }}>
                  <Icon className="w-4 h-4 text-white" />
                </div>
                {/* Value with clamp to prevent overflow */}
                <p className="font-black text-white leading-none mb-1 overflow-hidden" style={{ fontSize: "clamp(14px, 2.8vw, 22px)", fontFamily: "Outfit,sans-serif", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>
                  {s.value}
                </p>
                <p className="text-xs font-semibold mb-1" style={{ color: "rgba(255,255,255,0.8)" }}>{s.label}</p>
                <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.6)" }}>{s.sub}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-5">
        <div className="xl:col-span-2 anim-slide-up d2"><RevenueChart /></div>

        <div className="rounded-3xl p-5 anim-slide-up d3" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
          <div className="flex items-center justify-between mb-5">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.18em] mb-0.5" style={{ color: "var(--text3)" }}>Ranking</p>
              <p className="font-black text-sm" style={{ color: "var(--text)" }}>Top Produk</p>
            </div>
            <Link href="/admin/products" className="text-[11px] font-bold px-3 py-1.5 rounded-xl transition-all"
              style={{ color: "#6366f1", background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.15)" }}>
              Semua →
            </Link>
          </div>
          <div className="space-y-3.5">
            {products.sort((a,b)=>b.sold-a.sold).slice(0,5).map((p,i) => (
              <div key={p.id} className="flex items-center gap-3">
                <div className="relative flex-shrink-0">
                  <img src={p.image} alt={p.name} className="w-10 h-10 object-cover rounded-2xl" />
                  <div className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full text-[9px] font-black flex items-center justify-center shadow-md"
                    style={{
                      background: i===0?"linear-gradient(135deg,#f59e0b,#d97706)":i===1?"linear-gradient(135deg,#94a3b8,#64748b)":i===2?"linear-gradient(135deg,#b45309,#92400e)":"var(--surface3,#e2e8f0)",
                      color: i<3?"#fff":"var(--text3)",
                    }}>{i+1}</div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold line-clamp-1" style={{ color: "var(--text)" }}>{p.name}</p>
                  <div className="flex items-center gap-1">
                    <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                    <span className="text-[10px]" style={{ color: "var(--text3)" }}>{p.sold} terjual</span>
                  </div>
                </div>
                <p className="text-[11px] font-black flex-shrink-0" style={{ color: "var(--text)" }}>{formatRupiah(p.price)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Transactions */}
      <div className="rounded-3xl overflow-hidden anim-slide-up d4" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
        <div className="flex items-center justify-between px-5 sm:px-6 py-4" style={{ borderBottom: "1px solid var(--border)" }}>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "var(--surface2)", border: "1px solid var(--border)" }}>
              <Clock className="w-4 h-4" style={{ color: "var(--text2)" }} />
            </div>
            <div>
              <p className="font-black text-sm" style={{ color: "var(--text)" }}>Transaksi Terbaru</p>
              <p className="text-[10px]" style={{ color: "var(--text3)" }}>Real-time data</p>
            </div>
          </div>
          <span className="text-[10px] font-bold px-2.5 py-1 rounded-full" style={{ background: "var(--surface2)", color: "var(--text3)", border: "1px solid var(--border)" }}>
            {recentTransactions.length} records
          </span>
        </div>
        <div className="overflow-x-auto w-full">
          <table className="w-full" style={{ minWidth: 520 }}>
            <thead>
              <tr style={{ background: "var(--surface2)", borderBottom: "1px solid var(--border)" }}>
                {["ID","Pelanggan","Item","Total","Kasir","Status"].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-[10px] font-black uppercase tracking-wider" style={{ color: "var(--text3)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentTransactions.map((t, idx) => (
                <tr key={t.id}
                  style={{ borderBottom: "1px solid var(--border)", background: idx % 2 === 0 ? "transparent" : "var(--surface2)" }}
                  onMouseEnter={e => (e.currentTarget.style.background = "rgba(99,102,241,0.04)")}
                  onMouseLeave={e => (e.currentTarget.style.background = idx % 2 === 0 ? "transparent" : "var(--surface2)")}>
                  <td className="px-5 py-3.5 text-[11px] font-mono font-bold" style={{ color: "var(--text3)" }}>{t.id}</td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full text-white text-[10px] font-black flex items-center justify-center flex-shrink-0"
                        style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)" }}>{t.customer[0]}</div>
                      <span className="text-sm font-semibold" style={{ color: "var(--text)" }}>{t.customer}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-xs" style={{ color: "var(--text2)" }}>{t.items} item</td>
                  <td className="px-5 py-3.5 text-sm font-black whitespace-nowrap" style={{ color: "var(--text)" }}>{formatRupiah(t.total)}</td>
                  <td className="px-5 py-3.5 text-xs" style={{ color: "var(--text2)" }}>{t.cashier}</td>
                  <td className="px-5 py-3.5">
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-black px-2.5 py-1.5 rounded-full"
                      style={t.status==="completed"?{background:"rgba(16,185,129,0.1)",color:"#10b981",border:"1px solid rgba(16,185,129,0.2)"}:t.status==="pending"?{background:"rgba(245,158,11,0.1)",color:"#f59e0b",border:"1px solid rgba(245,158,11,0.2)"}:{background:"rgba(239,68,68,0.1)",color:"#ef4444",border:"1px solid rgba(239,68,68,0.2)"}}>
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: t.status==="completed"?"#10b981":t.status==="pending"?"#f59e0b":"#ef4444" }} />
                      {t.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
