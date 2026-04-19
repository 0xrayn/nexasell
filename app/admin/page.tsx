"use client";
import { Package, ShoppingBag, TrendingUp, Users, Clock, Star, ArrowUpRight, Zap } from "lucide-react";
import { products, salesData, recentTransactions } from "@/data/products";
import { formatRupiah } from "@/lib/utils";
import RevenueChart from "@/components/admin/RevenueChart";
import Link from "next/link";

const totalRevenue = salesData.reduce((s, d) => s + d.revenue, 0);
const totalTransactions = salesData.reduce((s, d) => s + d.transactions, 0);

const stats = [
  {
    label: "Total Produk", value: String(products.length), change: "+3 bulan ini",
    icon: Package, up: true,
    gradient: "from-blue-600 to-cyan-500",
    glow: "shadow-blue-500/25",
    iconBg: "bg-blue-500",
  },
  {
    label: "Total Revenue", value: formatRupiah(totalRevenue), change: "+18% dari bulan lalu",
    icon: TrendingUp, up: true,
    gradient: "from-indigo-600 to-violet-500",
    glow: "shadow-indigo-500/25",
    iconBg: "bg-indigo-500",
  },
  {
    label: "Total Pesanan", value: totalTransactions.toLocaleString(), change: "+256 bulan ini",
    icon: ShoppingBag, up: true,
    gradient: "from-emerald-600 to-teal-500",
    glow: "shadow-emerald-500/25",
    iconBg: "bg-emerald-500",
  },
  {
    label: "Pelanggan", value: "1.284", change: "+89 minggu ini",
    icon: Users, up: true,
    gradient: "from-rose-600 to-pink-500",
    glow: "shadow-rose-500/25",
    iconBg: "bg-rose-500",
  },
];

export default function AdminDashboard() {
  return (
    <div className="p-4 sm:p-6 w-full max-w-full">

      {/* Page header */}
      <div className="flex items-center justify-between mb-7">
        <div>
          <p className="text-xs font-bold text-[var(--text2)] uppercase tracking-widest mb-1">Overview</p>
          <h1 className="text-2xl sm:text-3xl font-black text-[var(--text)]" style={{ fontFamily: "Cabinet Grotesk, sans-serif" }}>
            Dashboard
          </h1>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-[var(--surface)] border border-[var(--border)] rounded-2xl">
          <div className="w-2 h-2 rounded-full bg-emerald-500 anim-pulse-dot" />
          <span className="text-xs font-bold text-[var(--text2)]">Live Data</span>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4 mb-6">
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={s.label}
              className={`relative overflow-hidden rounded-2xl p-5 text-white bg-gradient-to-br ${s.gradient} shadow-lg ${s.glow} anim-slide-up delay-${i + 1} card-lift`}
            >
              {/* Pattern overlay */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 left-0 w-20 h-20 rounded-full bg-white -translate-x-1/2 translate-y-1/2" />
              </div>
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-white/60" />
                </div>
                <p className="text-2xl sm:text-3xl font-black leading-none mb-1 truncate" style={{ fontFamily: "Cabinet Grotesk, sans-serif" }}>
                  {s.value}
                </p>
                <p className="text-sm text-white/80 font-semibold mb-1">{s.label}</p>
                <div className="flex items-center gap-1">
                  <Zap className="w-3 h-3 text-white/70" />
                  <p className="text-[11px] text-white/70 font-medium">{s.change}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-5">
        <div className="xl:col-span-2 min-w-0 anim-slide-up delay-2">
          <RevenueChart />
        </div>

        {/* Top Products */}
        <div className="bg-[var(--surface)] rounded-2xl border border-[var(--border)] p-5 card-lift anim-slide-up delay-3">
          <div className="flex items-center justify-between mb-5">
            <p className="text-xs font-black text-[var(--text2)] uppercase tracking-widest">Top Produk</p>
            <Link href="/admin/products" className="text-[11px] font-bold text-indigo-500 hover:underline">Lihat Semua</Link>
          </div>
          <div className="space-y-3.5">
            {products.sort((a, b) => b.sold - a.sold).slice(0, 5).map((p, i) => (
              <div key={p.id} className="flex items-center gap-3">
                <div className="relative flex-shrink-0">
                  <img src={p.image} alt={p.name} className="w-10 h-10 object-cover rounded-xl" />
                  {i < 3 && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-white text-[8px] font-black flex items-center justify-center">
                      {i + 1}
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-[var(--text)] line-clamp-1">{p.name}</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                    <span className="text-[10px] text-[var(--text2)]">{p.sold} terjual</span>
                  </div>
                </div>
                <span className="text-[11px] font-black text-[var(--text)] flex-shrink-0">{formatRupiah(p.price)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Transactions */}
      <div className="bg-[var(--surface)] rounded-2xl border border-[var(--border)] overflow-hidden anim-slide-up delay-4">
        <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border)]">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[var(--text2)]" />
            <p className="font-black text-sm text-[var(--text)]">Transaksi Terbaru</p>
          </div>
          <span className="text-[10px] font-black bg-[var(--surface2)] border border-[var(--border)] text-[var(--text2)] px-2.5 py-1 rounded-full">
            {recentTransactions.length} records
          </span>
        </div>
        <div className="overflow-x-auto w-full">
          <table className="w-full min-w-[520px]">
            <thead>
              <tr className="text-[10px] font-black text-[var(--text2)] uppercase tracking-wider border-b border-[var(--border)]/50">
                <th className="text-left px-5 py-3">ID</th>
                <th className="text-left px-5 py-3">Pelanggan</th>
                <th className="text-left px-5 py-3 hidden sm:table-cell">Item</th>
                <th className="text-left px-5 py-3">Total</th>
                <th className="text-left px-5 py-3 hidden md:table-cell">Kasir</th>
                <th className="text-left px-5 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentTransactions.map((trx) => (
                <tr key={trx.id} className="border-b border-[var(--border)]/40 hover:bg-[var(--surface2)] transition-colors last:border-0">
                  <td className="px-5 py-3.5 text-[11px] font-mono font-bold text-[var(--text2)]">{trx.id}</td>
                  <td className="px-5 py-3.5 text-sm font-bold text-[var(--text)]">{trx.customer}</td>
                  <td className="px-5 py-3.5 text-xs text-[var(--text2)] hidden sm:table-cell">{trx.items} item</td>
                  <td className="px-5 py-3.5 text-sm font-black text-[var(--text)] whitespace-nowrap">{formatRupiah(trx.total)}</td>
                  <td className="px-5 py-3.5 text-xs text-[var(--text2)] hidden md:table-cell">{trx.cashier}</td>
                  <td className="px-5 py-3.5">
                    <span className={`inline-flex items-center gap-1 text-[10px] font-black px-2.5 py-1 rounded-full whitespace-nowrap ${
                      trx.status === "completed" ? "bg-emerald-100 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-400" :
                      trx.status === "pending"   ? "bg-amber-100 dark:bg-amber-500/15 text-amber-700 dark:text-amber-400" :
                                                   "bg-red-100 dark:bg-red-500/15 text-red-600 dark:text-red-400"
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                        trx.status === "completed" ? "bg-emerald-500" : trx.status === "pending" ? "bg-amber-500" : "bg-red-500"
                      }`} />
                      {trx.status}
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
