"use client";
import { TrendingUp, ShoppingBag, Users, Package } from "lucide-react";
import { salesData, products, recentTransactions } from "@/data/products";
import { formatRupiah } from "@/lib/utils";

export default function AnalyticsPage() {
  const maxRevenue = Math.max(...salesData.map((d) => d.revenue));
  const maxTx = Math.max(...salesData.map((d) => d.transactions));

  const categoryStats = products.reduce((acc, p) => {
    if (!acc[p.category]) acc[p.category] = { count: 0, revenue: 0, sold: 0 };
    acc[p.category].count++;
    acc[p.category].revenue += p.price * p.sold;
    acc[p.category].sold += p.sold;
    return acc;
  }, {} as Record<string, { count: number; revenue: number; sold: number }>);
  const catEntries = Object.entries(categoryStats).sort((a, b) => b[1].revenue - a[1].revenue);
  const maxCat = Math.max(...catEntries.map(([, v]) => v.revenue));

  const statusCounts = recentTransactions.reduce((acc, t) => {
    acc[t.status] = (acc[t.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const kpis = [
    { label: "Avg Order Value", value: formatRupiah(recentTransactions.reduce((s, t) => s + t.total, 0) / recentTransactions.length), icon: ShoppingBag, trend: "+8%", color: "text-indigo-500", bg: "bg-indigo-50 dark:bg-indigo-500/10" },
    { label: "Conversion Rate", value: "3.4%", icon: TrendingUp, trend: "+0.5%", color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-500/10" },
    { label: "Return Rate", value: "2.1%", icon: Package, trend: "-0.3%", color: "text-rose-500", bg: "bg-rose-50 dark:bg-rose-500/10" },
    { label: "Active SKUs", value: String(products.filter(p => p.stock > 0).length), icon: Users, trend: "all live", color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-500/10" },
  ];

  return (
    <div className="p-4 sm:p-6 w-full max-w-full">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-0.5">
          <div className="w-1.5 h-5 bg-gradient-to-b from-indigo-500 to-violet-500 rounded-full" />
          <h1 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white" style={{ fontFamily: 'Syne, sans-serif' }}>Analytics</h1>
        </div>
        <p className="text-sm text-gray-400 ml-3.5">Store performance insights</p>
      </div>

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 mb-5">
        {kpis.map((k) => {
          const Icon = k.icon;
          return (
            <div key={k.label} className="bg-[var(--surface)] rounded-2xl p-4 border border-black/[0.06] dark:border-white/[0.06]">
              <div className={`${k.bg} p-2 rounded-xl w-fit mb-3`}><Icon className={`w-4 h-4 ${k.color}`} /></div>
              <p className="text-lg sm:text-xl font-black text-gray-900 dark:text-white truncate" style={{ fontFamily: 'Syne, sans-serif' }}>{k.value}</p>
              <p className="text-xs text-gray-400 mt-0.5">{k.label}</p>
              <p className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 mt-1">{k.trend}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mb-4">
        {/* Revenue bars */}
        <div className="bg-[var(--surface)] rounded-2xl p-4 sm:p-5 border border-black/[0.06] dark:border-white/[0.06]">
          <h3 className="font-bold text-sm text-gray-900 dark:text-white mb-4">Revenue Trend</h3>
          <div className="space-y-2">
            {salesData.map((d, i) => {
              const pct = (d.revenue / maxRevenue) * 100;
              return (
                <div key={d.month} className="flex items-center gap-3 min-w-0">
                  <span className="text-xs font-bold text-gray-400 w-7 flex-shrink-0">{d.month}</span>
                  <div className="flex-1 h-6 bg-gray-100 dark:bg-white/[0.05] rounded-lg overflow-hidden min-w-0">
                    <div className="h-full rounded-lg transition-all duration-700"
                      style={{ width: `${pct}%`, background: i === salesData.length - 1 ? "linear-gradient(to right,#6366f1,#a78bfa)" : "linear-gradient(to right,#c7d2fe,#ddd6fe)" }} />
                  </div>
                  <span className="text-[10px] font-bold text-gray-600 dark:text-gray-300 flex-shrink-0 w-20 text-right">{formatRupiah(d.revenue)}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Transaction volume */}
        <div className="bg-[var(--surface)] rounded-2xl p-4 sm:p-5 border border-black/[0.06] dark:border-white/[0.06]">
          <h3 className="font-bold text-sm text-gray-900 dark:text-white mb-4">Transaction Volume</h3>
          <div className="flex items-end gap-1.5 sm:gap-2 h-28 mb-2">
            {salesData.map((d, i) => {
              const pct = (d.transactions / maxTx) * 100;
              return (
                <div key={d.month} className="flex-1 flex flex-col items-center gap-1 group">
                  <div className="relative w-full flex-1 flex items-end">
                    <div className="w-full rounded-t-lg transition-all" style={{ height: `${pct}%`, background: i === salesData.length - 1 ? "linear-gradient(to top,#10b981,#6ee7b7)" : "linear-gradient(to top,#d1fae5,#ecfdf5)" }} />
                  </div>
                  <span className="text-[9px] text-gray-400">{d.month}</span>
                </div>
              );
            })}
          </div>
          <div className="pt-3 border-t border-black/[0.05] dark:border-white/[0.05] flex justify-between text-sm">
            <span className="text-gray-400 text-xs">Total</span>
            <span className="font-black text-gray-900 dark:text-white text-sm">{salesData.reduce((s, d) => s + d.transactions, 0).toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {/* Category */}
        <div className="bg-[var(--surface)] rounded-2xl p-4 sm:p-5 border border-black/[0.06] dark:border-white/[0.06]">
          <h3 className="font-bold text-sm text-gray-900 dark:text-white mb-4">Revenue by Category</h3>
          <div className="space-y-3">
            {catEntries.map(([cat, data]) => {
              const pct = (data.revenue / maxCat) * 100;
              const icons: Record<string, string> = { food: "🍔", electronics: "📱", fashion: "👕", beauty: "💄", home: "🏠", sports: "⚽" };
              return (
                <div key={cat} className="min-w-0">
                  <div className="flex items-center justify-between text-xs mb-1 gap-2">
                    <span className="font-semibold text-gray-700 dark:text-gray-300 capitalize flex items-center gap-1.5 truncate">{icons[cat] || "📦"} {cat}</span>
                    <span className="text-gray-400 flex-shrink-0">{data.sold} sold</span>
                  </div>
                  <div className="h-2 bg-gray-100 dark:bg-white/[0.05] rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-indigo-400 to-violet-500 rounded-full" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Order status */}
        <div className="bg-[var(--surface)] rounded-2xl p-4 sm:p-5 border border-black/[0.06] dark:border-white/[0.06]">
          <h3 className="font-bold text-sm text-gray-900 dark:text-white mb-4">Order Status</h3>
          <div className="space-y-3 mb-4">
            {Object.entries(statusCounts).map(([status, count]) => {
              const pct = (count / recentTransactions.length) * 100;
              const colors: Record<string, string> = { completed: "from-emerald-400 to-emerald-600", pending: "from-amber-400 to-amber-500", refunded: "from-red-400 to-red-500" };
              const badges: Record<string, string> = { completed: "bg-emerald-100 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-400", pending: "bg-amber-100 dark:bg-amber-500/15 text-amber-700 dark:text-amber-400", refunded: "bg-red-100 dark:bg-red-500/15 text-red-600" };
              return (
                <div key={status} className="min-w-0">
                  <div className="flex items-center justify-between mb-1 gap-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full capitalize ${badges[status]}`}>{status}</span>
                    <span className="text-xs text-gray-400 flex-shrink-0">{count} ({pct.toFixed(0)}%)</span>
                  </div>
                  <div className="h-2 bg-gray-100 dark:bg-white/[0.05] rounded-full overflow-hidden">
                    <div className={`h-full bg-gradient-to-r ${colors[status]} rounded-full`} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-500/10 dark:to-teal-500/10 rounded-xl p-3 text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">Completion Rate</p>
            <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400" style={{ fontFamily: 'Syne, sans-serif' }}>
              {Math.round(((statusCounts.completed || 0) / recentTransactions.length) * 100)}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
