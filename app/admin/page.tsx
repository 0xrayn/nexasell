"use client";
import { Package, ShoppingBag, TrendingUp, Users, ArrowUpRight, Clock, Star } from "lucide-react";
import { products, salesData, recentTransactions } from "@/data/products";
import { formatRupiah } from "@/lib/utils";
import RevenueChart from "@/components/admin/RevenueChart";
import Link from "next/link";

const totalRevenue = salesData.reduce((s, d) => s + d.revenue, 0);
const totalTransactions = salesData.reduce((s, d) => s + d.transactions, 0);

const stats = [
  { label: "Total Products", value: products.length, suffix: "", icon: Package, color: "from-blue-500 to-blue-600", light: "bg-blue-50 dark:bg-blue-900/20", text: "text-blue-600 dark:text-blue-400", change: "+3 this month", up: true },
  { label: "Total Revenue", value: formatRupiah(totalRevenue), suffix: "", icon: TrendingUp, color: "from-indigo-500 to-indigo-600", light: "bg-indigo-50 dark:bg-indigo-900/20", text: "text-indigo-600 dark:text-indigo-400", change: "+18% vs last period", up: true },
  { label: "Transactions", value: totalTransactions, suffix: "", icon: ShoppingBag, color: "from-emerald-500 to-emerald-600", light: "bg-emerald-50 dark:bg-emerald-900/20", text: "text-emerald-600 dark:text-emerald-400", change: "+12% this month", up: true },
  { label: "Customers", value: "1,284", suffix: "", icon: Users, color: "from-violet-500 to-violet-600", light: "bg-violet-50 dark:bg-violet-900/20", text: "text-violet-600 dark:text-violet-400", change: "+89 new this week", up: true },
];

export default function AdminDashboard() {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-7">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Dashboard</h1>
        <p className="text-sm text-gray-400 mt-0.5">Welcome back, Admin! Here&apos;s what&apos;s happening in your store.</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4 mb-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-5 border border-gray-100 dark:border-gray-700 hover:shadow-md dark:hover:shadow-black/20 transition-all">
              <div className="flex items-start justify-between mb-3">
                <div className={`${stat.light} p-2.5 rounded-xl`}>
                  <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${stat.text}`} />
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-gray-300 dark:text-gray-600" />
              </div>
              <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100 leading-none mb-1 truncate">{stat.value}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">{stat.label}</p>
              <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">{stat.change}</p>
            </div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-6">
        <div className="xl:col-span-2">
          <RevenueChart />
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">Top Selling</h3>
            <Link href="/admin/products" className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline">See all</Link>
          </div>
          <div className="space-y-3">
            {products.sort((a, b) => b.sold - a.sold).slice(0, 6).map((p, i) => (
              <div key={p.id} className="flex items-center gap-3">
                <span className="text-xs font-bold text-gray-300 dark:text-gray-600 w-4 flex-shrink-0">#{i + 1}</span>
                <img src={p.image} alt={p.name} className="w-9 h-9 object-cover rounded-lg flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-gray-900 dark:text-gray-100 line-clamp-1">{p.name}</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                    <span className="text-[10px] text-gray-400">{p.rating} · {p.sold} sold</span>
                  </div>
                </div>
                <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 flex-shrink-0">{formatRupiah(p.price)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Transactions */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-gray-400" />
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">Recent Transactions</h3>
          </div>
          <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 px-2.5 py-1 rounded-full">{recentTransactions.length} total</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide border-b border-gray-100 dark:border-gray-700">
                <th className="text-left px-5 py-3">Transaction ID</th>
                <th className="text-left px-5 py-3">Customer</th>
                <th className="text-left px-5 py-3 hidden sm:table-cell">Items</th>
                <th className="text-left px-5 py-3">Total</th>
                <th className="text-left px-5 py-3 hidden md:table-cell">Cashier</th>
                <th className="text-left px-5 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-gray-700/50">
              {recentTransactions.map((trx) => (
                <tr key={trx.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-700/20 transition-colors">
                  <td className="px-5 py-3.5 text-xs font-mono font-semibold text-gray-500 dark:text-gray-400">{trx.id}</td>
                  <td className="px-5 py-3.5 text-sm font-semibold text-gray-900 dark:text-gray-100">{trx.customer}</td>
                  <td className="px-5 py-3.5 text-sm text-gray-500 hidden sm:table-cell">{trx.items} items</td>
                  <td className="px-5 py-3.5 text-sm font-bold text-gray-900 dark:text-gray-100">{formatRupiah(trx.total)}</td>
                  <td className="px-5 py-3.5 text-sm text-gray-500 hidden md:table-cell">{trx.cashier}</td>
                  <td className="px-5 py-3.5">
                    <span className={`inline-flex items-center text-[11px] font-semibold px-2.5 py-1 rounded-full ${
                      trx.status === "completed" ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400" :
                      trx.status === "pending" ? "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400" :
                      "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"
                    }`}>
                      {trx.status === "completed" ? "✓ " : trx.status === "pending" ? "⟳ " : "↩ "}
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
