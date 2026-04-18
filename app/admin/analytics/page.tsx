"use client";
import { TrendingUp, TrendingDown, ShoppingBag, Users, Package, BarChart3 } from "lucide-react";
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
  const maxCatRevenue = Math.max(...catEntries.map(([, v]) => v.revenue));

  const statusCounts = recentTransactions.reduce((acc, t) => {
    acc[t.status] = (acc[t.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-7">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Analytics</h1>
        <p className="text-sm text-gray-400 mt-0.5">Detailed performance insights for your store</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
        {[
          { label: "Avg Order Value", value: formatRupiah(recentTransactions.reduce((s,t) => s+t.total,0)/recentTransactions.length), icon: ShoppingBag, trend: "+8%", up: true, color: "text-indigo-600 dark:text-indigo-400", bg: "bg-indigo-50 dark:bg-indigo-900/20" },
          { label: "Conversion Rate", value: "3.4%", icon: TrendingUp, trend: "+0.5%", up: true, color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-900/20" },
          { label: "Return Rate", value: "2.1%", icon: TrendingDown, trend: "-0.3%", up: false, color: "text-red-500", bg: "bg-red-50 dark:bg-red-900/20" },
          { label: "Active Products", value: products.filter(p => p.stock > 0).length.toString(), icon: Package, trend: "all stocked", up: true, color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-900/20" },
        ].map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div key={kpi.label} className="bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-5 border border-gray-100 dark:border-gray-700">
              <div className={`${kpi.bg} p-2.5 rounded-xl w-fit mb-3`}>
                <Icon className={`w-4 h-4 ${kpi.color}`} />
              </div>
              <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">{kpi.value}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{kpi.label}</p>
              <span className={`text-[11px] font-semibold ${kpi.up ? "text-emerald-600 dark:text-emerald-400" : "text-red-500"}`}>{kpi.trend}</span>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 mb-5">
        {/* Revenue Bar Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-indigo-500" />
                Revenue Trend
              </h3>
              <p className="text-xs text-gray-400 mt-0.5">Monthly revenue (Rp)</p>
            </div>
          </div>
          <div className="space-y-2.5">
            {salesData.map((d, i) => {
              const pct = (d.revenue / maxRevenue) * 100;
              const isLast = i === salesData.length - 1;
              return (
                <div key={d.month} className="flex items-center gap-3">
                  <span className="text-xs font-semibold text-gray-400 w-7 flex-shrink-0">{d.month}</span>
                  <div className="flex-1 h-7 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
                    <div
                      className="h-full rounded-lg flex items-center transition-all duration-700"
                      style={{
                        width: `${pct}%`,
                        background: isLast ? "linear-gradient(to right, #6366f1, #a5b4fc)" : "linear-gradient(to right, #c7d2fe, #e0e7ff)",
                      }}
                    />
                  </div>
                  <span className="text-xs font-bold text-gray-700 dark:text-gray-300 w-24 text-right flex-shrink-0">{formatRupiah(d.revenue)}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Transaction Volume */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-2 mb-5">
            <Users className="w-4 h-4 text-emerald-500" />
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">Transaction Volume</h3>
          </div>
          <div className="flex items-end gap-2 h-40">
            {salesData.map((d, i) => {
              const pct = (d.transactions / maxTx) * 100;
              const isLast = i === salesData.length - 1;
              return (
                <div key={d.month} className="flex-1 flex flex-col items-center gap-1 group cursor-default">
                  <span className="text-[10px] text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">{d.transactions}</span>
                  <div className="relative w-full flex-1 flex items-end">
                    <div
                      className="w-full rounded-t-lg transition-all"
                      style={{
                        height: `${pct}%`,
                        background: isLast ? "linear-gradient(to top, #10b981, #6ee7b7)" : "linear-gradient(to top, #d1fae5, #ecfdf5)",
                      }}
                    />
                  </div>
                  <span className="text-[10px] text-gray-400">{d.month}</span>
                </div>
              );
            })}
          </div>
          <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700 flex justify-between text-sm">
            <span className="text-gray-500">Total Transactions</span>
            <span className="font-bold text-gray-900 dark:text-gray-100">{salesData.reduce((s,d) => s+d.transactions,0).toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        {/* Category Breakdown */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700">
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">Revenue by Category</h3>
          <div className="space-y-3">
            {catEntries.map(([cat, data]) => {
              const pct = (data.revenue / maxCatRevenue) * 100;
              const icons: Record<string,string> = { food:"🍔", electronics:"📱", fashion:"👕", beauty:"💄", home:"🏠", sports:"⚽" };
              return (
                <div key={cat}>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-medium text-gray-700 dark:text-gray-300 capitalize flex items-center gap-1.5">
                      {icons[cat] || "📦"} {cat}
                    </span>
                    <div className="text-right">
                      <span className="font-bold text-gray-900 dark:text-gray-100">{formatRupiah(data.revenue)}</span>
                      <span className="text-gray-400 ml-2">({data.sold} sold)</span>
                    </div>
                  </div>
                  <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-indigo-400 to-indigo-600 rounded-full" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Order Status */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700">
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">Order Status Distribution</h3>
          <div className="space-y-3 mb-5">
            {Object.entries(statusCounts).map(([status, count]) => {
              const pct = (count / recentTransactions.length) * 100;
              const colors: Record<string,string> = {
                completed: "from-emerald-400 to-emerald-600",
                pending: "from-amber-400 to-amber-600",
                refunded: "from-red-400 to-red-600",
              };
              const bgs: Record<string,string> = {
                completed: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400",
                pending: "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400",
                refunded: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400",
              };
              return (
                <div key={status}>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className={`capitalize font-semibold px-2 py-0.5 rounded-full ${bgs[status]}`}>{status}</span>
                    <span className="text-gray-500 dark:text-gray-400">{count} orders ({pct.toFixed(0)}%)</span>
                  </div>
                  <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div className={`h-full bg-gradient-to-r ${colors[status]} rounded-full`} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-3 text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">Completion Rate</p>
            <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">
              {Math.round(((statusCounts.completed || 0) / recentTransactions.length) * 100)}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
