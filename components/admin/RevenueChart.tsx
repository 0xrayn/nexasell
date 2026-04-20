"use client";
import { useState } from "react";
import { salesData } from "@/data/products";
import { formatRupiah } from "@/lib/utils";
import { TrendingUp } from "lucide-react";

export default function RevenueChart() {
  const [hov, setHov] = useState<number|null>(null);
  const max = Math.max(...salesData.map(d=>d.revenue));
  const total = salesData.reduce((s,d)=>s+d.revenue,0);
  const last = salesData[salesData.length-1];
  const prev = salesData[salesData.length-2];
  const growth = Math.round(((last.revenue-prev.revenue)/prev.revenue)*100);

  return (
    <div className="rounded-3xl p-5 sm:p-6 h-full" style={{ background:"var(--surface)", border:"1px solid var(--border)" }}>
      <div className="flex items-start justify-between mb-6">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.18em] mb-1.5" style={{ color:"var(--text3)" }}>Revenue Bulanan</p>
          <p className="font-black text-2xl" style={{ color:"var(--text)", fontFamily:"Outfit,sans-serif" }}>{formatRupiah(total)}</p>
          <div className="flex items-center gap-2 mt-1.5">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-black"
              style={{ background:"rgba(16,185,129,0.1)", color:"#10b981", border:"1px solid rgba(16,185,129,0.2)" }}>
              <TrendingUp className="w-3 h-3" />+{growth}%
            </span>
            <span className="text-[11px]" style={{ color:"var(--text3)" }}>vs bulan lalu</span>
          </div>
        </div>
        <span className="text-[11px] font-bold px-3 py-1 rounded-full" style={{ color:"#6366f1", background:"rgba(99,102,241,0.08)", border:"1px solid rgba(99,102,241,0.15)" }}>2025</span>
      </div>

      {/* Bars */}
      <div className="flex items-end gap-2 sm:gap-3 mb-4" style={{ height:128 }}>
        {salesData.map((d,i)=>{
          const pct=(d.revenue/max)*100;
          const isHov=hov===i;
          const isLast=i===salesData.length-1;
          const hi=isLast||isHov;
          return(
            <div key={d.month} className="flex-1 flex flex-col items-center gap-2 cursor-default relative"
              onMouseEnter={()=>setHov(i)} onMouseLeave={()=>setHov(null)}>
              {/* Tooltip */}
              <div className="absolute -top-9 left-1/2 -translate-x-1/2 text-[10px] font-black px-2 py-1.5 rounded-xl shadow-lg whitespace-nowrap z-10 transition-all duration-150"
                style={{ background:"var(--text)", color:"var(--surface)", opacity:isHov?1:0, transform:isHov?"translateX(-50%) translateY(0)":"translateX(-50%) translateY(4px)" }}>
                {formatRupiah(d.revenue)}
              </div>
              <div className="w-full flex items-end" style={{ height:96 }}>
                <div className="w-full rounded-t-2xl transition-all duration-400 relative overflow-hidden"
                  style={{
                    height:`${pct}%`,
                    background:hi?"linear-gradient(to top,#6366f1,#a78bfa)":"linear-gradient(to top,#e0e7ff,#c7d2fe)",
                    boxShadow:hi?"0 -6px 20px rgba(99,102,241,0.45)":"none",
                    transform:isHov?"scaleX(0.88)":"scaleX(1)",
                  }}>
                  {hi && <div className="absolute inset-0 bar-shimmer" />}
                </div>
              </div>
              <span className="text-[10px] font-semibold" style={{ color:"var(--text3)" }}>{d.month}</span>
            </div>
          );
        })}
      </div>

      {/* Footer sparkline */}
      <div className="pt-4 flex items-center justify-between" style={{ borderTop:"1px solid var(--border)" }}>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest mb-0.5" style={{ color:"var(--text3)" }}>Total Transaksi</p>
          <p className="font-black text-lg" style={{ color:"var(--text)", fontFamily:"Outfit,sans-serif" }}>
            {salesData.reduce((s,d)=>s+d.transactions,0).toLocaleString()}
          </p>
        </div>
        <div className="flex items-end gap-1" style={{ height:32 }}>
          {salesData.map((d,i)=>{
            const mxT=Math.max(...salesData.map(x=>x.transactions));
            const h=Math.round((d.transactions/mxT)*28);
            const isLast=i===salesData.length-1;
            return <div key={d.month} className="w-3 rounded-sm" style={{ height:h, background:isLast?"#10b981":"#d1fae5" }} />;
          })}
        </div>
      </div>
    </div>
  );
}
