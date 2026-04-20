"use client";
import { useState, useMemo } from "react";
import { Search, SlidersHorizontal, ShoppingBag, Star, Zap, TrendingUp, Shield, Truck, ArrowRight, Flame, Sparkles, ChevronRight } from "lucide-react";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import ProductCard from "@/components/customer/ProductCard";
import { products, categories } from "@/data/products";
import { formatRupiah } from "@/lib/utils";
import Link from "next/link";

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [activeCat, setActiveCat] = useState("all");
  const [sortBy, setSortBy] = useState("popular");

  const filtered = useMemo(() => {
    let list = [...products];
    if (activeCat !== "all") list = list.filter(p => p.category === activeCat);
    if (search.trim()) list = list.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
    if (sortBy === "popular") list.sort((a, b) => b.sold - a.sold);
    else if (sortBy === "price-asc") list.sort((a, b) => a.price - b.price);
    else if (sortBy === "price-desc") list.sort((a, b) => b.price - a.price);
    else list.sort((a, b) => b.rating - a.rating);
    return list;
  }, [search, activeCat, sortBy]);

  const saleProducts = products.filter(p => p.badge === "Sale" || p.originalPrice).slice(0, 4);
  const bestSellers = products.filter(p => p.badge === "Best Seller").slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--bg)" }}>
      <Navbar />

      {/* ═══ HERO ═══ */}
      <section className="relative overflow-hidden" style={{ background: "#07050f", minHeight: 520 }}>
        {/* Multi-layer atmospheric background */}
        <div className="absolute inset-0" style={{
          backgroundImage: [
            "radial-gradient(ellipse 80% 60% at 20% 50%, rgba(99,102,241,0.22) 0%, transparent 60%)",
            "radial-gradient(ellipse 60% 80% at 80% 20%, rgba(139,92,246,0.16) 0%, transparent 55%)",
            "radial-gradient(ellipse 40% 40% at 50% 90%, rgba(59,130,246,0.1) 0%, transparent 55%)",
          ].join(","),
        }} />

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)",
          backgroundSize: "60px 60px",
        }} />

        {/* Floating particles */}
        {[
          { w:6, h:6, t:"15%", l:"10%", d:"0s", dur:"6s", op:0.4 },
          { w:4, h:4, t:"70%", l:"5%",  d:"1s", dur:"8s", op:0.3 },
          { w:8, h:8, t:"30%", l:"85%", d:"2s", dur:"7s", op:0.35 },
          { w:5, h:5, t:"80%", l:"80%", d:"0.5s", dur:"9s", op:0.25 },
          { w:3, h:3, t:"50%", l:"50%", d:"1.5s", dur:"5s", op:0.2 },
        ].map((p, i) => (
          <div key={i} className="absolute rounded-full anim-float pointer-events-none"
            style={{ width:p.w, height:p.h, top:p.t, left:p.l, animationDelay:p.d, animationDuration:p.dur,
              background:`radial-gradient(circle,rgba(129,140,248,${p.op}),transparent)`, animationIterationCount:"infinite" }} />
        ))}

        {/* Orbit rings */}
        <div className="absolute hidden lg:block pointer-events-none"
          style={{ top:"50%", right:"12%", width:320, height:320, borderRadius:"50%",
            border:"1px solid rgba(99,102,241,0.12)", transform:"translateY(-50%)",
            animation:"heroSpin 25s linear infinite" }} />
        <div className="absolute hidden lg:block pointer-events-none"
          style={{ top:"50%", right:"12%", width:210, height:210, borderRadius:"50%",
            border:"1px dashed rgba(139,92,246,0.15)", transform:"translateY(-50%)",
            animation:"heroSpin 16s linear infinite reverse" }} />
        <style>{`
          @keyframes heroSpin { to { transform: translateY(-50%) rotate(360deg); } }
        `}</style>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-12 items-center">

            {/* ── LEFT ── */}
            <div className="anim-slide-up">
              {/* Animated badge */}
              <div className="inline-flex items-center gap-2.5 mb-6 px-4 py-2 rounded-full"
                style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", backdropFilter: "blur(12px)" }}>
                <span className="flex items-center gap-1">
                  {[0,1,2].map(i=>(
                    <span key={i} className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 anim-pulse"
                      style={{ animationDelay:`${i*0.3}s` }} />
                  ))}
                </span>
                <Flame className="w-3.5 h-3.5 text-orange-400" />
                <span className="text-xs font-bold" style={{ color:"rgba(255,255,255,0.75)" }}>Flash Sale aktif sekarang</span>
                <span className="text-[10px] font-black px-2 py-0.5 rounded-full"
                  style={{ background:"rgba(251,191,36,0.18)", color:"#fbbf24", border:"1px solid rgba(251,191,36,0.3)" }}>HEMAT 25%</span>
              </div>

              {/* Headline */}
              <h1 className="font-black leading-[1.06] mb-5 text-white"
                style={{ fontSize:"clamp(2.2rem,5vw,3.8rem)", fontFamily:"Outfit,sans-serif" }}>
                Belanja Lebih<br />
                <span className="relative inline-block">
                  <span className="anim-gradient" style={{
                    backgroundImage: "linear-gradient(90deg,#818cf8 0%,#c4b5fd 35%,#f9a8d4 65%,#818cf8 100%)",
                    backgroundSize: "300% 100%",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}>Cerdas & Hemat.</span>
                </span>
              </h1>
              <p className="text-sm sm:text-base leading-relaxed mb-8 max-w-md"
                style={{ color:"rgba(255,255,255,0.45)" }}>
                Ribuan produk pilihan dari 6 kategori. Harga transparan, kualitas terjamin, pengiriman cepat.
              </p>

              {/* Search */}
              <div className="flex items-center gap-2 p-1.5 rounded-2xl mb-8 max-w-md"
                style={{ background:"rgba(255,255,255,0.07)", border:"1px solid rgba(255,255,255,0.13)", backdropFilter:"blur(16px)" }}>
                <Search className="ml-2.5 w-4 h-4 flex-shrink-0" style={{ color:"rgba(255,255,255,0.38)" }} />
                <input type="text" placeholder="Cari produk impianmu…"
                  value={search} onChange={e=>setSearch(e.target.value)}
                  className="flex-1 bg-transparent text-white text-sm font-medium outline-none px-2 py-2.5"
                  style={{ caretColor:"#818cf8" }} />
                <button className="flex-shrink-0 flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-white text-xs font-black transition-all"
                  style={{ background:"linear-gradient(135deg,#6366f1,#7c3aed)", boxShadow:"0 4px 16px rgba(99,102,241,0.5)" }}>
                  Cari <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-4 sm:gap-6">
                {[
                  { icon:ShoppingBag, v:`${products.length}+`, l:"Produk Aktif" },
                  { icon:Star, v:"4.8★", l:"Rating Rata-rata" },
                  { icon:TrendingUp, v:`${(products.reduce((s,p)=>s+p.sold,0)/1000).toFixed(0)}K+`, l:"Total Terjual" },
                ].map(({ icon:Icon, v, l }) => (
                  <div key={l} className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                      style={{ background:"rgba(99,102,241,0.15)", border:"1px solid rgba(99,102,241,0.25)" }}>
                      <Icon className="w-3.5 h-3.5" style={{ color:"#818cf8" }} />
                    </div>
                    <div>
                      <p className="text-sm font-black text-white leading-none">{v}</p>
                      <p className="text-[10px] leading-none mt-0.5" style={{ color:"rgba(255,255,255,0.35)" }}>{l}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── RIGHT — Flash sale + best seller ── */}
            <div className="hidden lg:flex flex-col gap-3 anim-slide-up d2">

              {/* Flash sale panel */}
              <div className="rounded-3xl p-4 relative overflow-hidden"
                style={{ background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.1)", backdropFilter:"blur(16px)" }}>
                <div className="absolute inset-0 pointer-events-none"
                  style={{ background:"radial-gradient(ellipse at 70% 0%,rgba(99,102,241,0.12),transparent 60%)" }} />
                <div className="flex items-center gap-2 mb-4 relative z-10">
                  <div className="w-6 h-6 rounded-lg flex items-center justify-center"
                    style={{ background:"rgba(251,191,36,0.2)" }}>
                    <Flame className="w-3.5 h-3.5 text-amber-400" />
                  </div>
                  <span className="text-xs font-black text-white">Flash Sale</span>
                  <div className="ml-auto px-2.5 py-1 rounded-full text-[10px] font-black"
                    style={{ background:"rgba(251,191,36,0.15)", color:"#fbbf24", border:"1px solid rgba(251,191,36,0.25)" }}>
                    ⏰ 08:42:15
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 relative z-10">
                  {saleProducts.map(p => (
                    <Link key={p.id} href={`/customer/products/${p.id}`}
                      className="flex items-center gap-2 p-2.5 rounded-2xl transition-all"
                      style={{ background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.08)" }}
                      onMouseEnter={e=>(e.currentTarget.style.background="rgba(255,255,255,0.1)")}
                      onMouseLeave={e=>(e.currentTarget.style.background="rgba(255,255,255,0.05)")}>
                      <img src={p.image} alt={p.name} className="w-10 h-10 rounded-xl object-cover flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="text-[11px] font-bold text-white line-clamp-1 mb-0.5">{p.name}</p>
                        <p className="text-[11px] font-black" style={{ color:"#86efac" }}>{formatRupiah(p.price)}</p>
                        {p.originalPrice && <p className="text-[9px] line-through" style={{ color:"rgba(255,255,255,0.3)" }}>{formatRupiah(p.originalPrice)}</p>}
                      </div>
                    </Link>
                  ))}
                </div>
                <Link href="/" className="flex items-center justify-center gap-1.5 mt-3 py-2 rounded-xl text-xs font-bold relative z-10 transition-all"
                  style={{ background:"rgba(99,102,241,0.2)", color:"#a5b4fc", border:"1px solid rgba(99,102,241,0.25)" }}
                  onMouseEnter={e=>(e.currentTarget.style.background="rgba(99,102,241,0.3)")}
                  onMouseLeave={e=>(e.currentTarget.style.background="rgba(99,102,241,0.2)")}>
                  Lihat Semua Flash Sale <ChevronRight className="w-3 h-3" />
                </Link>
              </div>

              {/* Best sellers mini */}
              <div className="rounded-3xl p-4"
                style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)", backdropFilter:"blur(12px)" }}>
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-[10px] font-black uppercase tracking-wider" style={{ color:"rgba(255,255,255,0.45)" }}>Best Sellers</span>
                </div>
                <div className="space-y-2">
                  {bestSellers.map((p,i)=>(
                    <Link key={p.id} href={`/customer/products/${p.id}`}
                      className="flex items-center gap-3 transition-all"
                      onMouseEnter={e=>(e.currentTarget.style.opacity="0.8")}
                      onMouseLeave={e=>(e.currentTarget.style.opacity="1")}>
                      <span className="w-5 text-center text-xs font-black" style={{ color:"rgba(255,255,255,0.3)" }}>#{i+1}</span>
                      <img src={p.image} alt={p.name} className="w-9 h-9 rounded-xl object-cover flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-white line-clamp-1">{p.name}</p>
                        <p className="text-[10px]" style={{ color:"rgba(255,255,255,0.38)" }}>{p.sold} terjual</p>
                      </div>
                      <p className="text-xs font-black text-white flex-shrink-0">{formatRupiah(p.price)}</p>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Trust badges */}
              <div className="grid grid-cols-3 gap-2">
                {[
                  { icon:Shield, t:"Aman & Terpercaya", c:"#34d399", bg:"rgba(16,185,129,0.12)", bc:"rgba(16,185,129,0.2)" },
                  { icon:Truck,  t:"Gratis Ongkir",     c:"#60a5fa", bg:"rgba(59,130,246,0.12)", bc:"rgba(59,130,246,0.2)" },
                  { icon:Zap,    t:"Fast Checkout",     c:"#f59e0b", bg:"rgba(245,158,11,0.12)", bc:"rgba(245,158,11,0.2)" },
                ].map(({ icon:Icon, t, c, bg, bc })=>(
                  <div key={t} className="flex flex-col items-center gap-2 p-3 rounded-2xl"
                    style={{ background:bg, border:`1px solid ${bc}` }}>
                    <Icon className="w-4 h-4" style={{ color:c }} />
                    <span className="text-[9px] font-semibold text-center leading-tight" style={{ color:"rgba(255,255,255,0.55)" }}>{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom fade to bg */}
        <div className="absolute bottom-0 inset-x-0 h-24 pointer-events-none"
          style={{ background:"linear-gradient(to top,var(--bg),transparent)" }} />
      </section>

      {/* ═══ PRODUCTS ═══ */}
      <section className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-8">
        {/* Category pills */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-5" style={{ scrollbarWidth:"none" }}>
          {categories.map(cat=>(
            <button key={cat.id} onClick={()=>setActiveCat(cat.id)}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap flex-shrink-0 transition-all duration-200"
              style={activeCat===cat.id
                ? { background:"linear-gradient(135deg,#6366f1,#7c3aed)", color:"#fff", boxShadow:"0 4px 14px rgba(99,102,241,0.32)", transform:"scale(1.04)" }
                : { background:"var(--surface)", color:"var(--text2)", border:"1px solid var(--border)" }
              }>
              <span className="text-sm">{cat.icon}</span> {cat.name}
            </button>
          ))}
        </div>

        {/* Toolbar */}
        <div className="flex items-center justify-between mb-5">
          <p className="text-sm font-semibold" style={{ color:"var(--text2)" }}>
            <span className="font-black" style={{ color:"var(--text)" }}>{filtered.length}</span> produk
            {activeCat!=="all" && <span className="font-bold capitalize ml-1" style={{ color:"#6366f1" }}>· {activeCat}</span>}
          </p>
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-3.5 h-3.5" style={{ color:"var(--text3)" }} />
            <select value={sortBy} onChange={e=>setSortBy(e.target.value)}
              className="text-xs rounded-xl px-3 py-2 font-semibold outline-none"
              style={{ background:"var(--surface)", border:"1px solid var(--border)", color:"var(--text2)" }}>
              <option value="popular">Terpopuler</option>
              <option value="rating">Rating Tertinggi</option>
              <option value="price-asc">Termurah</option>
              <option value="price-desc">Termahal</option>
            </select>
          </div>
        </div>

        {filtered.length===0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="text-5xl">🔍</div>
            <p className="font-bold" style={{ color:"var(--text2)" }}>Produk tidak ditemukan</p>
            <button onClick={()=>{ setSearch(""); setActiveCat("all"); }}
              className="px-6 py-2.5 rounded-xl text-sm font-bold text-white"
              style={{ background:"linear-gradient(135deg,#6366f1,#8b5cf6)", boxShadow:"0 4px 14px rgba(99,102,241,0.3)" }}>
              Reset Filter
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
            {filtered.map((p,i)=>(
              <div key={p.id} className="anim-slide-up" style={{ animationDelay:`${Math.min(i*0.04,0.5)}s` }}>
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}
