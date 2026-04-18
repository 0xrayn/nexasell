"use client";
import { Package, ShoppingBag, TrendingUp, Users, ArrowUpRight, Clock, Star } from "lucide-react";
import { products, salesData, recentTransactions } from "@/data/products";
import { formatRupiah } from "@/lib/utils";
import RevenueChart from "@/components/admin/RevenueChart";
import Link from "next/link";

const totalRevenue = salesData.reduce((s, d) => s + d.revenue, 0);
const totalTransactions = salesData.reduce((s, d) => s + d.transactions, 0);

export default function AdminDashboard() {
  const stats = [
    { label: "Products", value: String(products.length), icon: Package, gradient: "from-blue-500 to-cyan-500", bg: "bg-blue-50 dark:bg-blue-500/10", text: "text-blue-600 dark:text-blue-400", change: "+3 this month" },
    { label: "Revenue", value: formatRupiah(totalRevenue), icon: TrendingUp, gradient: "from-violet-500 to-indigo-500", bg: "bg-violet-50 dark:bg-violet-500/10", text: "text-violet-600 dark:text-violet-400", change: "+18% vs last" },
    { label: "Orders", value: String(totalTransactions), icon: ShoppingBag, gradient: "from-emerald-500 to-teal-500", bg: "bg-emerald-50 dark:bg-emerald-500/10", text: "text-emerald-600 dark:text-emerald-400", change: "+12% this month" },
    { label: "Customers", value: "1,284", icon: Users, gradient: "from-rose-500 to-pink-500", bg: "bg-rose-50 dark:bg-rose-500/10", text: "text-rose-600 dark:text-rose-400", change: "+89 new" },
  ];

  return (
    <div className="p-4 sm:p-6 w-full max-w-full">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-1.5 h-5 bg-gradient-to-b from-indigo-500 to-violet-500 rounded-full" />
          <h1 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white" style={{ fontFamily: 'Syne, sans-serif' }}>Dashboard</h1>
        </div>
        <p className="text-sm text-gray-400 ml-3.5">Welcome back, Admin 👋</p>
      </div>

      {/* Stats — 2 cols on mobile, 4 on desktop */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 mb-6">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="relative overflow-hidden bg-white dark:bg-[var(--card)] rounded-2xl p-4 border border-black/[0.06] dark:border-white/[0.06] hover:shadow-lg dark:hover:shadow-black/30 transition-all group">
              {/* gradient corner blob */}
              <div className={`absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br ${s.gradient} opacity-10 rounded-full group-hover:opacity-20 transition-opacity`} />
              <div className="flex items-start justify-between mb-3">
                <div className={`${s.bg} p-2 rounded-xl`}>
                  <Icon className={`w-4 h-4 ${s.text}`} />
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-gray-300 dark:text-gray-600" />
              </div>
              <p className="text-lg sm:text-xl font-black text-gray-900 dark:text-white mb-0.5 truncate" style={{ fontFamily: 'Syne, sans-serif' }}>{s.value}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{s.label}</p>
              <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold mt-1.5">{s.change}</p>
            </div>
          );
        })}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-5">
        <div className="xl:col-span-2 min-w-0">
          <RevenueChart />
        </div>
        <div className="bg-white dark:bg-[var(--card)] rounded-2xl p-4 border border-black/[0.06] dark:border-white/[0.06] min-w-0">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-sm text-gray-900 dark:text-white">Top Products</h3>
            <Link href="/admin/products" className="text-xs text-indigo-500 hover:underline font-medium">View all</Link>
          </div>
          <div className="space-y-3">
            {products.sort((a, b) => b.sold - a.sold).slice(0, 6).map((p, i) => (
              <div key={p.id} className="flex items-center gap-2.5 min-w-0">
                <span className="text-xs font-black text-gray-300 dark:text-gray-600 w-4 flex-shrink-0">#{i + 1}</span>
                <img src={p.image} alt={p.name} className="w-8 h-8 object-cover rounded-lg flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-gray-900 dark:text-gray-100 line-clamp-1">{p.name}</p>
                  <div className="flex items-center gap-1">
                    <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400 flex-shrink-0" />
                    <span className="text-[10px] text-gray-400">{p.sold} sold</span>
                  </div>
                </div>
                <span className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 flex-shrink-0">{formatRupiah(p.price)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Transactions table */}
      <div className="bg-white dark:bg-[var(--card)] rounded-2xl border border-black/[0.06] dark:border-white/[0.06] overflow-hidden">
        <div className="flex items-center justify-between px-4 sm:px-5 py-4 border-b border-black/[0.06] dark:border-white/[0.06]">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <h3 className="font-bold text-sm text-gray-900 dark:text-white">Recent Transactions</h3>
          </div>
          <span className="text-[10px] font-semibold bg-gray-100 dark:bg-white/[0.06] text-gray-500 dark:text-gray-400 px-2 py-1 rounded-full">{recentTransactions.length} records</span>
        </div>
        {/* Responsive table wrapper */}
        <div className="overflow-x-auto w-full">
          <table className="w-full min-w-[500px]">
            <thead>
              <tr className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider border-b border-black/[0.04] dark:border-white/[0.04]">
                <th className="text-left px-4 sm:px-5 py-3">ID</th>
                <th className="text-left px-4 sm:px-5 py-3">Customer</th>
                <th className="text-left px-4 sm:px-5 py-3 hidden sm:table-cell">Items</th>
                <th className="text-left px-4 sm:px-5 py-3">Total</th>
                <th className="text-left px-4 sm:px-5 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentTransactions.map((trx) => (
                <tr key={trx.id} className="border-b border-black/[0.03] dark:border-white/[0.03] hover:bg-gray-50/60 dark:hover:bg-white/[0.02] transition-colors last:border-0">
                  <td className="px-4 sm:px-5 py-3 text-[11px] font-mono font-semibold text-gray-400">{trx.id}</td>
                  <td className="px-4 sm:px-5 py-3 text-sm font-semibold text-gray-900 dark:text-gray-100">{trx.customer}</td>
                  <td className="px-4 sm:px-5 py-3 text-xs text-gray-500 hidden sm:table-cell">{trx.items} items</td>
                  <td className="px-4 sm:px-5 py-3 text-sm font-bold text-gray-900 dark:text-gray-100 whitespace-nowrap">{formatRupiah(trx.total)}</td>
                  <td className="px-4 sm:px-5 py-3">
                    <span className={`inline-flex items-center text-[10px] font-bold px-2 py-1 rounded-full whitespace-nowrap ${
                      trx.status === "completed" ? "bg-emerald-100 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-400" :
                      trx.status === "pending" ? "bg-amber-100 dark:bg-amber-500/15 text-amber-700 dark:text-amber-400" :
                      "bg-red-100 dark:bg-red-500/15 text-red-700 dark:text-red-400"
                    }`}>{trx.status}</span>
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
