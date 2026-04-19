"use client";
import { useState } from "react";
import { salesData } from "@/data/products";
import { formatRupiah } from "@/lib/utils";
import { TrendingUp } from "lucide-react";

export default function RevenueChart() {
  const [hovered, setHovered] = useState<number | null>(null);
  const max = Math.max(...salesData.map(d => d.revenue));
  const total = salesData.reduce((s, d) => s + d.revenue, 0);
  const lastMonth = salesData[salesData.length - 1];
  const prevMonth = salesData[salesData.length - 2];
  const growth = Math.round(((lastMonth.revenue - prevMonth.revenue) / prevMonth.revenue) * 100);

  return (
    <div className="bg-[var(--surface)] rounded-2xl border border-[var(--border)] p-5 h-full flex flex-col card-lift">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <p className="text-xs font-bold text-[var(--text2)] uppercase tracking-widest mb-1">Revenue Bulanan</p>
          <p className="text-2xl font-black text-[var(--text)]" style={{ fontFamily: "Cabinet Grotesk, sans-serif" }}>
            {formatRupiah(total)}
          </p>
          <div className="flex items-center gap-1.5 mt-1">
            <div className="flex items-center gap-1 px-2 py-0.5 bg-emerald-100 dark:bg-emerald-500/15 rounded-full">
              <TrendingUp className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
              <span className="text-[11px] font-black text-emerald-600 dark:text-emerald-400">+{growth}%</span>
            </div>
            <span className="text-[11px] text-[var(--text2)]">vs bulan lalu</span>
          </div>
        </div>
        <span className="text-[11px] font-bold text-indigo-500 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">2025</span>
      </div>

      {/* Chart bars */}
      <div className="flex-1 flex items-end gap-2 min-h-[120px]">
        {salesData.map((d, i) => {
          const pct = (d.revenue / max) * 100;
          const isActive = hovered === i;
          const isLast = i === salesData.length - 1;
          return (
            <div key={d.month} className="flex-1 flex flex-col items-center gap-2 group cursor-pointer"
              onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}>
              {/* Tooltip */}
              <div className={`text-center transition-all duration-200 ${isActive ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
                <div className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-[10px] font-black px-2 py-1 rounded-lg whitespace-nowrap shadow-xl">
                  {formatRupiah(d.revenue)}
                </div>
              </div>
              {/* Bar */}
              <div className="w-full flex items-end" style={{ height: "100px" }}>
                <div
                  className="w-full rounded-t-xl transition-all duration-500 ease-out"
                  style={{
                    height: `${pct}%`,
                    background: isLast || isActive
                      ? "linear-gradient(to top, #6366f1, #8b5cf6)"
                      : "linear-gradient(to top, #e0e7ff, #c7d2fe)",
                    boxShadow: (isLast || isActive) ? "0 -4px 20px rgba(99,102,241,0.4)" : "none",
                  }}
                />
              </div>
              <span className="text-[10px] font-bold text-[var(--text2)]">{d.month}</span>
            </div>
          );
        })}
      </div>

      {/* Transactions sparkline row */}
      <div className="mt-4 pt-4 border-t border-[var(--border)] flex items-center justify-between">
        <div>
          <p className="text-[10px] text-[var(--text2)] uppercase font-bold tracking-widest">Total Transaksi</p>
          <p className="text-lg font-black text-[var(--text)]" style={{ fontFamily: "Cabinet Grotesk, sans-serif" }}>
            {salesData.reduce((s, d) => s + d.transactions, 0).toLocaleString()}
          </p>
        </div>
        <div className="flex items-end gap-0.5 h-8">
          {salesData.map((d, i) => {
            const maxTx = Math.max(...salesData.map(x => x.transactions));
            const h = Math.round((d.transactions / maxTx) * 28);
            return (
              <div key={d.month} className="w-2 rounded-sm transition-all"
                style={{ height: `${h}px`, background: i === salesData.length - 1 ? "#10b981" : "#d1fae5" }} />
            );
          })}
        </div>
      </div>
    </div>
  );
}
