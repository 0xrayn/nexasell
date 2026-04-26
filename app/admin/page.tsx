"use client";
import { useState, useEffect } from "react";
import { Package, ShoppingBag, TrendingUp, Users, Clock, Star, ArrowUpRight, Zap, Plus, Eye, BarChart2, RefreshCw } from "lucide-react";
import { products, salesData, recentTransactions } from "@/data/products";
import { formatRupiah } from "@/lib/utils";
import RevenueChart from "@/components/admin/RevenueChart";
import Link from "next/link";

const totalRevenue = salesData.reduce((s, d) => s + d.revenue, 0);
const totalTx = salesData.reduce((s, d) => s + d.transactions, 0);

const stats = [
  { label: "Total Produk",  sub: "+3 bulan ini",        value: String(products.length), icon: Package,    from: "#3b82f6", to: "#6366f1", glow: "rgba(99,102,241,0.3)",  trend: "+3" },
  { label: "Total Revenue", sub: "+18% dari bulan lalu", value: formatRupiah(totalRevenue), icon: TrendingUp, from: "#8b5cf6", to: "#d946ef", glow: "rgba(139,92,246,0.3)", trend: "+18%" },
  { label: "Total Pesanan", sub: "+256 bulan ini",       value: totalTx.toLocaleString(), icon: ShoppingBag, from: "#10b981", to: "#06b6d4", glow: "rgba(16,185,129,0.3)",  trend: "+256" },
  { label: "Pelanggan",     sub: "+89 minggu ini",       value: "1.284",                 icon: Users,       from: "#f59e0b", to: "#ef4444", glow: "rgba(245,158,11,0.3)",  trend: "+89" },
];

const quickActions = [
  { label: "Tambah Produk", href: "/admin/products/add", icon: Plus,     color: "#6366f1", bg: "rgba(99,102,241,0.1)" },
  { label: "Lihat Produk",  href: "/admin/products",     icon: Package,  color: "#3b82f6", bg: "rgba(59,130,246,0.1)" },
  { label: "Analitik",      href: "/admin/analytics",    icon: BarChart2,color: "#06b6d4", bg: "rgba(6,182,212,0.1)"  },
  { label: "Laporan",       href: "/admin/analytics",    icon: Eye,      color: "#10b981", bg: "rgba(16,185,129,0.1)" },
];

export default function AdminDashboard() {
  const [now, setNow] = useState(new Date());
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const refresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1200);
  };

  const timeStr = now.toLocaleTimeString("id-ID", { hour:"2-digit", minute:"2-digit", second:"2-digit" });
  const dateStr = now.toLocaleDateString("id-ID", { weekday:"long", day:"numeric", month:"long", year:"numeric" });

  return (
    <div className="p-4 sm:p-6 lg:p-8 w-full max-w-full" style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <style>{`
        @keyframes fadeInUp { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(0.85)} }
        @keyframes spin { to{transform:rotate(360deg)} }
        @keyframes shimmer { from{background-position:-200% center} to{background-position:200% center} }
        @keyframes countUp { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        .stat-card { transition: transform 0.25s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.25s ease; }
        .stat-card:hover { transform: translateY(-5px) scale(1.01); }
        .quick-btn { transition: transform 0.2s cubic-bezier(0.34,1.56,0.64,1), background 0.2s, box-shadow 0.2s; }
        .quick-btn:hover { transform: translateY(-3px) scale(1.04); }
        .table-row { transition: background 0.15s ease; }
        .refresh-btn { transition: transform 0.3s ease, background 0.2s; }
        .refresh-btn:hover { background: var(--surface2) !important; }
        .a1 { animation: fadeInUp 0.5s cubic-bezier(0.16,1,0.3,1) both; }
        .a2 { animation: fadeInUp 0.5s cubic-bezier(0.16,1,0.3,1) 0.06s both; }
        .a3 { animation: fadeInUp 0.5s cubic-bezier(0.16,1,0.3,1) 0.12s both; }
        .a4 { animation: fadeInUp 0.5s cubic-bezier(0.16,1,0.3,1) 0.18s both; }
        .a5 { animation: fadeInUp 0.5s cubic-bezier(0.16,1,0.3,1) 0.24s both; }
        .a6 { animation: fadeInUp 0.5s cubic-bezier(0.16,1,0.3,1) 0.30s both; }
      `}</style>

      {/* ── HEADER ── */}
      <div className="flex items-start justify-between mb-8 a1">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <p className="text-[10px] font-black uppercase tracking-[0.22em]" style={{ color:"var(--text3)" }}>Dashboard</p>
            <span className="text-[10px] px-2 py-0.5 rounded-full font-bold" style={{ background:"rgba(99,102,241,0.1)",color:"#818cf8",border:"1px solid rgba(99,102,241,0.2)" }}>Admin</span>
          </div>
          <h1 className="font-black text-2xl sm:text-3xl" style={{ color:"var(--text)", fontFamily:"Outfit,sans-serif" }}>
            Selamat Datang 👋
          </h1>
          <p className="text-sm mt-0.5" style={{ color:"var(--text2)" }}>{dateStr}</p>
        </div>
        <div className="flex items-center gap-2.5">
          {/* Live clock */}
          <div className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-2xl"
            style={{ background:"var(--surface)",border:"1px solid var(--border)" }}>
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" style={{ animation:"pulse 2s ease-in-out infinite" }} />
            <span className="text-xs font-bold tabular-nums" style={{ color:"var(--text)" }}>{timeStr}</span>
          </div>
          {/* Refresh */}
          <button onClick={refresh} className="refresh-btn w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background:"var(--surface)",border:"1px solid var(--border)" }}>
            <RefreshCw className="w-3.5 h-3.5" style={{ color:"var(--text2)",
              animation:refreshing?"spin 0.6s linear infinite":"none" }} />
          </button>
        </div>
      </div>

      {/* ── STAT CARDS ── */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4 mb-6 a2">
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="stat-card relative overflow-hidden rounded-3xl p-5 text-white cursor-default"
              style={{ background:`linear-gradient(135deg,${s.from},${s.to})`, boxShadow:`0 6px 28px ${s.glow}`,
                animationDelay:`${i*0.06}s` }}>
              {/* Decorative */}
              <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full" style={{ background:"rgba(255,255,255,0.1)" }} />
              <div className="absolute -bottom-8 -left-6 w-24 h-24 rounded-full" style={{ background:"rgba(255,255,255,0.07)" }} />
              <div className="absolute top-4 right-4">
                <span className="text-[10px] font-black px-2 py-1 rounded-full" style={{ background:"rgba(255,255,255,0.2)" }}>
                  {s.trend}
                </span>
              </div>

              <div className="relative z-10">
                <div className="w-9 h-9 rounded-2xl flex items-center justify-center mb-4" style={{ background:"rgba(255,255,255,0.2)" }}>
                  <Icon className="w-4 h-4 text-white" />
                </div>
                <p className="font-black text-white leading-none mb-1 overflow-hidden"
                  style={{ fontSize:"clamp(14px,2.8vw,22px)", fontFamily:"Outfit,sans-serif", whiteSpace:"nowrap", textOverflow:"ellipsis" }}>
                  {s.value}
                </p>
                <p className="text-xs font-semibold mb-0.5" style={{ color:"rgba(255,255,255,0.85)" }}>{s.label}</p>
                <p className="text-[10px]" style={{ color:"rgba(255,255,255,0.55)" }}>{s.sub}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── QUICK ACTIONS ── */}
      <div className="mb-6 a3">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-black uppercase tracking-[0.18em]" style={{ color:"var(--text3)" }}>Aksi Cepat</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {quickActions.map(({ label, href, icon: Icon, color, bg }) => (
            <Link key={label} href={href} className="quick-btn flex items-center gap-3 p-4 rounded-2xl"
              style={{ background:"var(--surface)",border:"1px solid var(--border)" }}>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background:bg,border:`1px solid ${color}25` }}>
                <Icon className="w-4 h-4" style={{ color }} />
              </div>
              <span className="text-sm font-bold leading-tight" style={{ color:"var(--text)" }}>{label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* ── CHARTS ROW ── */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-5 a4">
        <div className="xl:col-span-2"><RevenueChart /></div>

        {/* Top Products */}
        <div className="rounded-3xl p-5" style={{ background:"var(--surface)",border:"1px solid var(--border)" }}>
          <div className="flex items-center justify-between mb-5">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.18em] mb-0.5" style={{ color:"var(--text3)" }}>Ranking</p>
              <p className="font-black text-sm" style={{ color:"var(--text)" }}>Top Produk</p>
            </div>
            <Link href="/admin/products"
              className="text-[11px] font-bold px-3 py-1.5 rounded-xl"
              style={{ color:"#6366f1",background:"rgba(99,102,241,0.08)",border:"1px solid rgba(99,102,241,0.18)",
                transition:"background 0.2s" }}
              onMouseEnter={e=>(e.currentTarget.style.background="rgba(99,102,241,0.15)")}
              onMouseLeave={e=>(e.currentTarget.style.background="rgba(99,102,241,0.08)")}>
              Semua →
            </Link>
          </div>
          <div className="space-y-4">
            {products.sort((a,b)=>b.sold-a.sold).slice(0,5).map((p,i) => (
              <div key={p.id} className="flex items-center gap-3 group">
                <div className="relative flex-shrink-0">
                  <img src={p.image} alt={p.name} className="w-10 h-10 object-cover rounded-2xl" style={{ border:"1px solid var(--border)" }} />
                  <div className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full text-[9px] font-black flex items-center justify-center shadow-md"
                    style={{
                      background: i===0?"linear-gradient(135deg,#f59e0b,#d97706)":i===1?"linear-gradient(135deg,#94a3b8,#64748b)":i===2?"linear-gradient(135deg,#b45309,#92400e)":"var(--surface2)",
                      color: i<3?"#fff":"var(--text3)",
                    }}>{i+1}</div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold line-clamp-1 group-hover:text-indigo-400 transition-colors duration-200" style={{ color:"var(--text)" }}>{p.name}</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                    <span className="text-[10px]" style={{ color:"var(--text3)" }}>{p.sold} terjual</span>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-[11px] font-black" style={{ color:"var(--text)" }}>{formatRupiah(p.price)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── RECENT TRANSACTIONS TABLE ── */}
      <div className="rounded-3xl overflow-hidden a5" style={{ background:"var(--surface)",border:"1px solid var(--border)" }}>
        <div className="flex items-center justify-between px-5 sm:px-6 py-4" style={{ borderBottom:"1px solid var(--border)" }}>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background:"var(--surface2)",border:"1px solid var(--border)" }}>
              <Clock className="w-4 h-4" style={{ color:"var(--text2)" }} />
            </div>
            <div>
              <p className="font-black text-sm" style={{ color:"var(--text)" }}>Transaksi Terbaru</p>
              <p className="text-[10px]" style={{ color:"var(--text3)" }}>Real-time data</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" style={{ animation:"pulse 2s ease-in-out infinite" }} />
            <span className="text-[10px] font-bold px-2.5 py-1 rounded-full" style={{ background:"var(--surface2)",color:"var(--text3)",border:"1px solid var(--border)" }}>
              {recentTransactions.length} records
            </span>
          </div>
        </div>
        <div className="overflow-x-auto w-full">
          <table className="w-full" style={{ minWidth:540 }}>
            <thead>
              <tr style={{ background:"var(--surface2)",borderBottom:"1px solid var(--border)" }}>
                {["ID","Pelanggan","Item","Total","Kasir","Status"].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-[10px] font-black uppercase tracking-wider" style={{ color:"var(--text3)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentTransactions.map((t, idx) => (
                <tr key={t.id} className="table-row" style={{ borderBottom:"1px solid var(--border)" }}
                  onMouseEnter={e=>(e.currentTarget.style.background="rgba(99,102,241,0.04)")}
                  onMouseLeave={e=>(e.currentTarget.style.background="transparent")}>
                  <td className="px-5 py-4 text-[11px] font-mono font-bold" style={{ color:"var(--text3)" }}>{t.id}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full text-white text-[10px] font-black flex items-center justify-center flex-shrink-0"
                        style={{ background:"linear-gradient(135deg,#6366f1,#8b5cf6)" }}>{t.customer[0]}</div>
                      <span className="text-sm font-semibold" style={{ color:"var(--text)" }}>{t.customer}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-xs" style={{ color:"var(--text2)" }}>{t.items} item</td>
                  <td className="px-5 py-4 text-sm font-black whitespace-nowrap" style={{ color:"var(--text)" }}>{formatRupiah(t.total)}</td>
                  <td className="px-5 py-4 text-xs" style={{ color:"var(--text2)" }}>{t.cashier}</td>
                  <td className="px-5 py-4">
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-black px-2.5 py-1.5 rounded-full"
                      style={t.status==="completed"
                        ? { background:"rgba(16,185,129,0.1)",color:"#10b981",border:"1px solid rgba(16,185,129,0.2)" }
                        : t.status==="pending"
                        ? { background:"rgba(245,158,11,0.1)",color:"#f59e0b",border:"1px solid rgba(245,158,11,0.2)" }
                        : { background:"rgba(239,68,68,0.1)",color:"#ef4444",border:"1px solid rgba(239,68,68,0.2)" }}>
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background:t.status==="completed"?"#10b981":t.status==="pending"?"#f59e0b":"#ef4444" }} />
                      {t.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-3 flex items-center justify-between" style={{ borderTop:"1px solid var(--border)" }}>
          <span className="text-[11px]" style={{ color:"var(--text3)" }}>Menampilkan {recentTransactions.length} transaksi terbaru</span>
          <Link href="/admin/analytics" className="flex items-center gap-1 text-[11px] font-bold"
            style={{ color:"#6366f1",transition:"gap 0.2s" }}
            onMouseEnter={e=>(e.currentTarget.style.gap="6px")}
            onMouseLeave={e=>(e.currentTarget.style.gap="4px")}>
            Lihat semua <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
