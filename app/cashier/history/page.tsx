"use client";
import { useState } from "react";
import { Search, CheckCircle, Clock, AlertCircle, Receipt, TrendingUp } from "lucide-react";
import { recentTransactions } from "@/data/products";
import { formatRupiah } from "@/lib/utils";

export default function CashierHistory() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = recentTransactions.filter(t => {
    const matchS = t.customer.toLowerCase().includes(search.toLowerCase()) || t.id.toLowerCase().includes(search.toLowerCase());
    const matchSt = statusFilter === "all" || t.status === statusFilter;
    return matchS && matchSt;
  });

  const todayTrx = recentTransactions.filter(t => t.date === "2025-04-18");
  const todayTotal = todayTrx.reduce((s, t) => s + t.total, 0);
  const todayCompleted = todayTrx.filter(t => t.status === "completed").length;

  const statCards = [
    {
      label: "Pendapatan Hari Ini",
      value: formatRupiah(todayTotal),
      sub: `dari ${todayTrx.length} transaksi`,
      icon: TrendingUp,
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-50 dark:bg-emerald-500/10",
      border: "border-emerald-100 dark:border-emerald-500/20",
    },
    {
      label: "Selesai",
      value: String(todayCompleted),
      sub: "transaksi completed",
      icon: CheckCircle,
      color: "text-blue-500",
      bg: "bg-blue-50 dark:bg-blue-500/10",
      border: "border-blue-100 dark:border-blue-500/20",
    },
    {
      label: "Menunggu",
      value: String(recentTransactions.filter(t => t.status === "pending").length),
      sub: "transaksi pending",
      icon: Clock,
      color: "text-amber-500",
      bg: "bg-amber-50 dark:bg-amber-500/10",
      border: "border-amber-100 dark:border-amber-500/20",
    },
    {
      label: "Total Transaksi",
      value: String(recentTransactions.length),
      sub: "semua waktu",
      icon: Receipt,
      color: "text-violet-500",
      bg: "bg-violet-50 dark:bg-violet-500/10",
      border: "border-violet-100 dark:border-violet-500/20",
    },
  ];

  return (
    <div className="p-4 sm:p-6 w-full max-w-full">

      {/* Page Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-1.5 h-6 bg-gradient-to-b from-emerald-500 to-teal-500 rounded-full" />
          <h1 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white" style={{ fontFamily: "Syne, sans-serif" }}>
            Riwayat Transaksi
          </h1>
        </div>
        <p className="text-sm text-gray-400 ml-3.5">Semua transaksi di kasir ini</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 mb-6">
        {statCards.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className={`bg-[var(--surface)] rounded-2xl p-4 border ${s.border} hover:shadow-md dark:hover:shadow-black/20 transition-all`}>
              <div className={`${s.bg} p-2.5 rounded-xl w-fit mb-3`}>
                <Icon className={`w-4 h-4 ${s.color}`} />
              </div>
              <p className="text-lg sm:text-xl font-black text-gray-900 dark:text-white leading-none mb-1 truncate" style={{ fontFamily: "Syne, sans-serif" }}>
                {s.value}
              </p>
              <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">{s.label}</p>
              <p className="text-[10px] text-gray-400 mt-0.5">{s.sub}</p>
            </div>
          );
        })}
      </div>

      {/* Table */}
      <div className="bg-[var(--surface)] rounded-2xl border border-black/[0.06] dark:border-white/[0.06] overflow-hidden">
        {/* Filters */}
        <div className="p-3 sm:p-4 border-b border-black/[0.06] dark:border-white/[0.06] flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
            <input type="text" placeholder="Cari nama / ID..." value={search} onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-black/[0.08] dark:border-white/[0.08] bg-gray-50 dark:bg-white/[0.04] text-sm outline-none focus:ring-2 focus:ring-emerald-500/40 text-gray-900 dark:text-gray-100" />
          </div>
          <div className="flex gap-1.5 flex-wrap">
            {["all","completed","pending","refunded"].map(s => (
              <button key={s} onClick={() => setStatusFilter(s)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all whitespace-nowrap ${
                  statusFilter===s ? "bg-emerald-500 text-white shadow-sm" : "bg-gray-100 dark:bg-white/[0.06] text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-white/[0.1]"
                }`}>
                {s === "all" ? "Semua" : s}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto w-full">
          <table className="w-full min-w-[480px]">
            <thead>
              <tr className="text-[10px] font-black text-gray-400 uppercase tracking-wider border-b border-black/[0.04] dark:border-white/[0.04]">
                <th className="text-left px-4 sm:px-5 py-3">ID</th>
                <th className="text-left px-4 sm:px-5 py-3">Pelanggan</th>
                <th className="text-left px-4 sm:px-5 py-3 hidden sm:table-cell">Item</th>
                <th className="text-left px-4 sm:px-5 py-3">Total</th>
                <th className="text-left px-4 sm:px-5 py-3 hidden md:table-cell">Tanggal</th>
                <th className="text-left px-4 sm:px-5 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(trx => (
                <tr key={trx.id} className="border-b border-black/[0.03] dark:border-white/[0.03] hover:bg-gray-50/50 dark:hover:bg-white/[0.02] transition-colors last:border-0">
                  <td className="px-4 sm:px-5 py-3.5 text-[11px] font-mono font-bold text-gray-400">{trx.id}</td>
                  <td className="px-4 sm:px-5 py-3.5 text-sm font-semibold text-gray-900 dark:text-gray-100">{trx.customer}</td>
                  <td className="px-4 sm:px-5 py-3.5 text-xs text-gray-400 hidden sm:table-cell">{trx.items} item</td>
                  <td className="px-4 sm:px-5 py-3.5 text-sm font-black text-gray-900 dark:text-white whitespace-nowrap">{formatRupiah(trx.total)}</td>
                  <td className="px-4 sm:px-5 py-3.5 text-xs text-gray-400 hidden md:table-cell">{trx.date}</td>
                  <td className="px-4 sm:px-5 py-3.5">
                    <span className={`inline-flex items-center gap-1 text-[10px] font-black px-2.5 py-1 rounded-full whitespace-nowrap ${
                      trx.status==="completed" ? "bg-emerald-100 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-400" :
                      trx.status==="pending" ? "bg-amber-100 dark:bg-amber-500/15 text-amber-700 dark:text-amber-400" :
                      "bg-red-100 dark:bg-red-500/15 text-red-600"
                    }`}>
                      {trx.status==="completed" ? <CheckCircle className="w-2.5 h-2.5" /> : trx.status==="pending" ? <Clock className="w-2.5 h-2.5" /> : <AlertCircle className="w-2.5 h-2.5" />}
                      {trx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center py-14 gap-2">
              <Receipt className="w-10 h-10 text-gray-200 dark:text-gray-700" />
              <p className="text-sm text-gray-400">Tidak ada transaksi</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
