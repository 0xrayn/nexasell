"use client";
import { salesData } from "@/data/products";
import { formatRupiah } from "@/lib/utils";

export default function RevenueChart() {
  const max = Math.max(...salesData.map((d) => d.revenue));
  const total = salesData.reduce((s, d) => s + d.revenue, 0);

  return (
    <div className="bg-white dark:bg-[var(--card)] rounded-2xl p-4 sm:p-5 border border-black/[0.06] dark:border-white/[0.06] h-full">
      <div className="flex items-start justify-between mb-5">
        <div>
          <h3 className="font-bold text-sm text-gray-900 dark:text-white mb-0.5">Monthly Revenue</h3>
          <p className="text-xs text-gray-400">Last 7 months</p>
        </div>
        <span className="text-[11px] font-bold text-indigo-500 bg-indigo-50 dark:bg-indigo-500/10 px-2.5 py-1 rounded-full flex-shrink-0">2025</span>
      </div>

      {/* Bars — flex, no overflow */}
      <div className="flex items-end gap-1.5 sm:gap-2 h-32 sm:h-36 mb-2">
        {salesData.map((d, i) => {
          const pct = (d.revenue / max) * 100;
          const isLast = i === salesData.length - 1;
          return (
            <div key={d.month} className="flex-1 flex flex-col items-center gap-1 group min-w-0">
              <div className="relative w-full flex-1 flex items-end overflow-hidden">
                <div
                  className="w-full rounded-t-lg transition-all duration-700 ease-out group-hover:opacity-80"
                  style={{
                    height: `${pct}%`,
                    background: isLast
                      ? "linear-gradient(to top, #6366f1, #a78bfa)"
                      : "linear-gradient(to top, #ddd6fe, #ede9fe)",
                  }}
                />
              </div>
              <span className="text-[9px] sm:text-[10px] text-gray-400 font-medium">{d.month}</span>
            </div>
          );
        })}
      </div>

      <div className="pt-3 border-t border-black/[0.05] dark:border-white/[0.05] flex justify-between items-center">
        <span className="text-xs text-gray-400">Total 7 months</span>
        <span className="text-sm font-black text-gray-900 dark:text-white" style={{ fontFamily: 'Syne, sans-serif' }}>{formatRupiah(total)}</span>
      </div>
    </div>
  );
}
