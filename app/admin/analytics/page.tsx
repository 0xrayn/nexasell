"use client";
import { TrendingUp, ShoppingBag, Users, Package, ArrowUpRight } from "lucide-react";
import { salesData, products, recentTransactions } from "@/data/products";
import { formatRupiah } from "@/lib/utils";

export default function AnalyticsPage() {
  const maxR = Math.max(...salesData.map(d=>d.revenue));
  const maxT = Math.max(...salesData.map(d=>d.transactions));
  const catStats = products.reduce((a,p)=>{
    if(!a[p.category])a[p.category]={revenue:0,sold:0};
    a[p.category].revenue+=p.price*p.sold; a[p.category].sold+=p.sold; return a;
  },{} as Record<string,{revenue:number;sold:number}>);
  const cats = Object.entries(catStats).sort((a,b)=>b[1].revenue-a[1].revenue);
  const maxC = Math.max(...cats.map(([,v])=>v.revenue));
  const statusMap = recentTransactions.reduce((a,t)=>{ a[t.status]=(a[t.status]||0)+1; return a; },{} as Record<string,number>);
  const catIcons: Record<string,string> = {food:"🍔",electronics:"📱",fashion:"👕",beauty:"💄",home:"🏠",sports:"⚽"};
  const catGrads = ["linear-gradient(135deg,#6366f1,#8b5cf6)","linear-gradient(135deg,#3b82f6,#06b6d4)","linear-gradient(135deg,#10b981,#059669)","linear-gradient(135deg,#f43f5e,#ec4899)","linear-gradient(135deg,#f59e0b,#ef4444)","linear-gradient(135deg,#8b5cf6,#6366f1)"];

  const kpis = [
    { label:"Avg Order Value", value:formatRupiah(Math.round(recentTransactions.reduce((s,t)=>s+t.total,0)/recentTransactions.length)), icon:ShoppingBag, from:"#6366f1",to:"#8b5cf6", change:"+8%" },
    { label:"Conversion Rate",  value:"3.4%",   icon:TrendingUp, from:"#10b981",to:"#06b6d4", change:"+0.5%" },
    { label:"Return Rate",       value:"2.1%",   icon:Package,    from:"#f43f5e",to:"#ec4899", change:"-0.3%" },
    { label:"Active SKUs",       value:`${products.filter(p=>p.stock>0).length}`,  icon:Users, from:"#f59e0b",to:"#ef4444", change:"all live" },
  ];

  const Card = ({ children, className="" }: { children: React.ReactNode; className?: string }) => (
    <div className={`rounded-3xl p-5 sm:p-6 ${className}`} style={{ background:"var(--surface)", border:"1px solid var(--border)" }}>
      {children}
    </div>
  );

  return (
    <div className="p-4 sm:p-6 lg:p-8 w-full max-w-full anim-fade" style={{ background:"var(--bg)", minHeight:"100vh" }}>
      <div className="mb-7">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-1" style={{ color:"var(--text3)" }}>Insights</p>
        <h1 className="font-black text-2xl sm:text-3xl" style={{ color:"var(--text)", fontFamily:"Outfit,sans-serif" }}>Analytics</h1>
        <p className="text-sm mt-0.5" style={{ color:"var(--text2)" }}>Performa toko secara mendalam</p>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4 mb-6">
        {kpis.map((k,i) => {
          const Icon = k.icon;
          return (
            <div key={k.label} className="relative overflow-hidden rounded-3xl p-5 text-white anim-slide-up"
              style={{ background:`linear-gradient(135deg,${k.from},${k.to})`, boxShadow:`0 8px 28px ${k.from}44`, animationDelay:`${i*0.06}s` }}>
              <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full" style={{ background:"rgba(255,255,255,0.1)" }} />
              <div className="relative z-10">
                <div className="w-9 h-9 rounded-2xl flex items-center justify-center mb-3" style={{ background:"rgba(255,255,255,0.2)" }}>
                  <Icon className="w-4 h-4 text-white" />
                </div>
                <p className="font-black text-xl text-white leading-none mb-0.5" style={{ fontFamily:"Outfit,sans-serif" }}>{k.value}</p>
                <p className="text-xs font-semibold mb-1.5" style={{ color:"rgba(255,255,255,0.75)" }}>{k.label}</p>
                <div className="flex items-center gap-1">
                  <ArrowUpRight className="w-3 h-3" style={{ color:"rgba(255,255,255,0.7)" }} />
                  <span className="text-[10px]" style={{ color:"rgba(255,255,255,0.65)" }}>{k.change}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mb-4">
        {/* Revenue horizontal bars */}
        <Card className="anim-slide-up d2">
          <p className="text-[10px] font-black uppercase tracking-[0.18em] mb-0.5" style={{ color:"var(--text3)" }}>Revenue</p>
          <p className="font-black text-sm mb-5" style={{ color:"var(--text)" }}>Tren Bulanan</p>
          <div className="space-y-3">
            {salesData.map((d,i)=>{
              const pct=(d.revenue/maxR)*100;
              const isLast=i===salesData.length-1;
              return(
                <div key={d.month} className="flex items-center gap-3">
                  <span className="text-xs font-bold w-7 flex-shrink-0 text-right" style={{ color:"var(--text3)" }}>{d.month}</span>
                  <div className="flex-1 h-7 rounded-full overflow-hidden" style={{ background:"var(--surface2)" }}>
                    <div className="h-full rounded-full relative overflow-hidden"
                      style={{ width:`${pct}%`, background:isLast?"linear-gradient(to right,#6366f1,#a78bfa)":"linear-gradient(to right,#c7d2fe,#ddd6fe)", transition:"width 0.8s ease" }}>
                      {isLast && <div className="absolute inset-0 bar-shimmer" />}
                    </div>
                  </div>
                  <span className="text-[11px] font-black w-24 text-right flex-shrink-0" style={{ color:"var(--text)" }}>{formatRupiah(d.revenue)}</span>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Tx column bars */}
        <Card className="anim-slide-up d3">
          <p className="text-[10px] font-black uppercase tracking-[0.18em] mb-0.5" style={{ color:"var(--text3)" }}>Transaksi</p>
          <p className="font-black text-sm mb-5" style={{ color:"var(--text)" }}>Volume Bulanan</p>
          <div className="flex items-end gap-2 sm:gap-3 h-36 mb-3">
            {salesData.map((d,i)=>{
              const pct=(d.transactions/maxT)*100;
              const isLast=i===salesData.length-1;
              return(
                <div key={d.month} className="flex-1 flex flex-col items-center gap-1.5">
                  <div className="w-full flex items-end" style={{ height:120 }}>
                    <div className="w-full rounded-t-2xl transition-all duration-700"
                      style={{ height:`${pct}%`, background:isLast?"linear-gradient(to top,#10b981,#34d399)":"linear-gradient(to top,#d1fae5,#a7f3d0)", boxShadow:isLast?"0 -4px 16px rgba(16,185,129,0.35)":"none" }} />
                  </div>
                  <span className="text-[10px] font-semibold" style={{ color:"var(--text3)" }}>{d.month}</span>
                </div>
              );
            })}
          </div>
          <div className="pt-3 flex justify-between" style={{ borderTop:"1px solid var(--border)" }}>
            <span className="text-xs" style={{ color:"var(--text3)" }}>Total Transaksi</span>
            <span className="text-sm font-black" style={{ color:"var(--text)", fontFamily:"Outfit,sans-serif" }}>{salesData.reduce((s,d)=>s+d.transactions,0).toLocaleString()}</span>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {/* Category */}
        <Card className="anim-slide-up d4">
          <p className="text-[10px] font-black uppercase tracking-[0.18em] mb-0.5" style={{ color:"var(--text3)" }}>Breakdown</p>
          <p className="font-black text-sm mb-5" style={{ color:"var(--text)" }}>Revenue per Kategori</p>
          <div className="space-y-4">
            {cats.map(([cat,data],i)=>{
              const pct=(data.revenue/maxC)*100;
              return(
                <div key={cat}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-xl flex items-center justify-center text-sm shadow-sm" style={{ background:catGrads[i%catGrads.length] }}>{catIcons[cat]||"📦"}</div>
                      <span className="text-xs font-bold capitalize" style={{ color:"var(--text)" }}>{cat}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[11px] font-black" style={{ color:"var(--text)" }}>{formatRupiah(data.revenue)}</span>
                      <span className="text-[10px] ml-2" style={{ color:"var(--text3)" }}>{data.sold} sold</span>
                    </div>
                  </div>
                  <div className="h-2 rounded-full overflow-hidden" style={{ background:"var(--surface2)" }}>
                    <div className="h-full rounded-full" style={{ width:`${pct}%`, background:catGrads[i%catGrads.length] }} />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Status */}
        <Card className="anim-slide-up d5">
          <p className="text-[10px] font-black uppercase tracking-[0.18em] mb-0.5" style={{ color:"var(--text3)" }}>Distribution</p>
          <p className="font-black text-sm mb-5" style={{ color:"var(--text)" }}>Status Pesanan</p>
          <div className="space-y-4 mb-5">
            {Object.entries(statusMap).map(([status,count])=>{
              const pct=(count/recentTransactions.length)*100;
              const cfg: Record<string,{bar:string,bg:string,color:string}> = {
                completed:{bar:"linear-gradient(to right,#10b981,#059669)",bg:"rgba(16,185,129,0.1)",color:"#10b981"},
                pending:{bar:"linear-gradient(to right,#f59e0b,#d97706)",bg:"rgba(245,158,11,0.1)",color:"#f59e0b"},
                refunded:{bar:"linear-gradient(to right,#ef4444,#dc2626)",bg:"rgba(239,68,68,0.1)",color:"#ef4444"},
              };
              const c=cfg[status]||cfg.refunded;
              return(
                <div key={status}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-black px-2.5 py-1 rounded-full capitalize" style={{ background:c.bg, color:c.color, border:`1px solid ${c.color}25` }}>{status}</span>
                    <span className="text-xs" style={{ color:"var(--text3)" }}>{count} ({pct.toFixed(0)}%)</span>
                  </div>
                  <div className="h-2 rounded-full overflow-hidden" style={{ background:"var(--surface2)" }}>
                    <div className="h-full rounded-full" style={{ width:`${pct}%`, background:c.bar }} />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="rounded-2xl p-5 text-center" style={{ background:"linear-gradient(135deg,rgba(16,185,129,0.08),rgba(6,182,212,0.08))", border:"1px solid rgba(16,185,129,0.15)" }}>
            <p className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color:"var(--text3)" }}>Completion Rate</p>
            <p className="font-black" style={{ fontSize:42, color:"#10b981", fontFamily:"Outfit,sans-serif", lineHeight:1 }}>
              {Math.round(((statusMap.completed||0)/recentTransactions.length)*100)}%
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
