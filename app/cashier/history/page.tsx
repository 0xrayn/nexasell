"use client";
import { useState } from "react";
import { Search, CheckCircle, Clock, AlertCircle, Receipt, TrendingUp } from "lucide-react";
import { recentTransactions } from "@/data/products";
import { formatRupiah } from "@/lib/utils";

export default function CashierHistory() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = recentTransactions.filter((t) => {
    const matchSearch = t.customer.toLowerCase().includes(search.toLowerCase()) || t.id.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || t.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const totalToday = recentTransactions.filter((t) => t.date === "2025-04-18").reduce((s, t) => s + t.total, 0);
  const completedToday = recentTransactions.filter((t) => t.date === "2025-04-18" && t.status === "completed").length;

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Transaction History</h1>
        <p className="text-sm text-gray-400 mt-0.5">All transactions handled at this station</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[
          { label: "Today's Revenue", value: formatRupiah(totalToday), icon: TrendingUp, color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-900/20" },
          { label: "Completed Today", value: completedToday, icon: CheckCircle, color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-50 dark:bg-blue-900/20" },
          { label: "Pending", value: recentTransactions.filter(t => t.status === "pending").length, icon: Clock, color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-900/20" },
          { label: "Total Transactions", value: recentTransactions.length, icon: Receipt, color: "text-indigo-600 dark:text-indigo-400", bg: "bg-indigo-50 dark:bg-indigo-900/20" },
        ].map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-100 dark:border-gray-700">
              <div className={`${s.bg} p-2 rounded-lg w-fit mb-2`}>
                <Icon className={`w-4 h-4 ${s.color}`} />
              </div>
              <p className="text-xl font-bold text-gray-900 dark:text-gray-100">{s.value}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{s.label}</p>
            </div>
          );
        })}
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700">
        {/* Filters */}
        <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by customer or ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-sm outline-none focus:ring-2 focus:ring-emerald-500 text-gray-900 dark:text-gray-100"
            />
          </div>
          <div className="flex gap-2">
            {["all", "completed", "pending", "refunded"].map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all ${
                  statusFilter === s
                    ? "bg-emerald-600 text-white"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide border-b border-gray-100 dark:border-gray-700">
                <th className="text-left px-4 py-3">ID</th>
                <th className="text-left px-4 py-3">Customer</th>
                <th className="text-left px-4 py-3 hidden sm:table-cell">Items</th>
                <th className="text-left px-4 py-3">Total</th>
                <th className="text-left px-4 py-3 hidden md:table-cell">Date</th>
                <th className="text-left px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-gray-700/50">
              {filtered.map((trx) => (
                <tr key={trx.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-700/20 transition-colors">
                  <td className="px-4 py-3 text-xs font-mono font-semibold text-gray-500 dark:text-gray-400">{trx.id}</td>
                  <td className="px-4 py-3 text-sm font-semibold text-gray-900 dark:text-gray-100">{trx.customer}</td>
                  <td className="px-4 py-3 text-sm text-gray-500 hidden sm:table-cell">{trx.items} items</td>
                  <td className="px-4 py-3 text-sm font-bold text-gray-900 dark:text-gray-100">{formatRupiah(trx.total)}</td>
                  <td className="px-4 py-3 text-xs text-gray-500 dark:text-gray-400 hidden md:table-cell">{trx.date}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full ${
                      trx.status === "completed" ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400" :
                      trx.status === "pending" ? "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400" :
                      "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"
                    }`}>
                      {trx.status === "completed" ? <CheckCircle className="w-3 h-3" /> :
                       trx.status === "pending" ? <Clock className="w-3 h-3" /> :
                       <AlertCircle className="w-3 h-3" />}
                      {trx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 gap-2">
              <Receipt className="w-10 h-10 text-gray-200 dark:text-gray-700" />
              <p className="text-sm text-gray-400">No transactions found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
