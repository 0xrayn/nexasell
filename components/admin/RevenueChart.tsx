"use client";
import { salesData } from "@/data/products";
import { formatRupiah } from "@/lib/utils";

export default function RevenueChart() {
  const max = Math.max(...salesData.map((d) => d.revenue));
  const totalRevenue = salesData.reduce((s, d) => s + d.revenue, 0);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700 h-full">
      <div className="flex items-start justify-between mb-5">
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-gray-100">Monthly Revenue</h3>
          <p className="text-xs text-gray-400 mt-0.5">Last 7 months overview</p>
        </div>
        <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 px-2.5 py-1 rounded-full">2025</span>
      </div>

      <div className="flex items-end gap-1.5 h-36 mb-1">
        {salesData.map((d, i) => {
          const pct = (d.revenue / max) * 100;
          const isLast = i === salesData.length - 1;
          return (
            <div key={d.month} className="flex-1 flex flex-col items-center gap-1 group">
              <div className="relative w-full flex-1 flex items-end">
                <div
                  className="w-full rounded-t-lg transition-all duration-500 group-hover:opacity-80"
                  style={{
                    height: `${pct}%`,
                    background: isLast
                      ? "linear-gradient(to top, #6366f1, #a5b4fc)"
                      : "linear-gradient(to top, #c7d2fe, #e0e7ff)",
                  }}
                />
              </div>
              <span className="text-[10px] text-gray-400 dark:text-gray-500 font-medium">{d.month}</span>
            </div>
          );
        })}
      </div>

      <div className="pt-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
        <span className="text-xs text-gray-500">Total 7 months</span>
        <span className="text-sm font-bold text-gray-900 dark:text-gray-100">{formatRupiah(totalRevenue)}</span>
      </div>
    </div>
  );
}
