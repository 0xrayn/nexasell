"use client";
import { useState, useMemo, useRef, useEffect } from "react";
import {
  Search, SlidersHorizontal, ShoppingBag, Star,
  TrendingUp, ArrowRight, Flame, Sparkles,
  X, Tag, ChevronRight, Package, Zap, Shield, Truck, BadgeCheck
} from "lucide-react";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import ProductCard from "@/components/customer/ProductCard";
import { products, categories } from "@/data/products";
import { formatRupiah } from "@/lib/utils";
import { useTheme } from "@/lib/ThemeContext";
import Link from "next/link";

export default function HomePage() {
  const { dark } = useTheme();
  const [inputVal, setInputVal] = useState("");
  const [search, setSearch] = useState("");
  const [activeCat, setActiveCat] = useState("all");
  const [sortBy, setSortBy] = useState("popular");
  const [hoveredStat, setHoveredStat] = useState<number | null>(null);
  const productRef = useRef<HTMLElement>(null);

  const handleSearch = () => {
    setSearch(inputVal.trim());
    if (inputVal.trim()) productRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };
  const clearSearch = () => { setInputVal(""); setSearch(""); };

  useEffect(() => {
    const handler = (e: Event) => {
      const q = (e as CustomEvent<string>).detail;
      setInputVal(q); setSearch(q);
      productRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    window.addEventListener("navbar-search", handler);
    return () => window.removeEventListener("navbar-search", handler);
  }, []);

  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get("q");
    if (q) { setInputVal(q); setSearch(q); }
  }, []);

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
  const totalSold = products.reduce((s, p) => s + p.sold, 0);

  const trustBadges = [
    { icon: Shield, label: "100% Aman", sub: "Transaksi terenkripsi", color: "#22c55e" },
    { icon: Truck, label: "Kirim Cepat", sub: "Ke seluruh Indonesia", color: "#3b82f6" },
    { icon: BadgeCheck, label: "Kualitas Terjamin", sub: "Produk original", color: "#a855f7" },
    { icon: Zap, label: "Flash Sale", sub: "Hemat hingga 40%", color: "#f59e0b" },
  ];

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--bg)" }}>
      <Navbar />

      <style>{`
        @keyframes spin-cw  { to { transform: rotate(360deg); } }
        @keyframes spin-ccw { to { transform: rotate(-360deg); } }
        @keyframes shimmer  { 0%{background-position:0% 50%} 100%{background-position:200% 50%} }
        @keyframes fadeUp   { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
        @keyframes popBadge { 0%{opacity:0;transform:scale(.82) translateY(-8px)} 70%{transform:scale(1.04)} 100%{opacity:1;transform:scale(1) translateY(0)} }
        @keyframes pulseRing{ 0%{transform:scale(1);opacity:.7} 100%{transform:scale(2.4);opacity:0} }
        @keyframes floatY   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes tickerX  { from{transform:translateX(0)} to{transform:translateX(-50%)} }

        .hero-left  { animation: fadeUp .65s cubic-bezier(.16,1,.3,1) .05s both; }
        .hero-right { animation: fadeUp .65s cubic-bezier(.16,1,.3,1) .22s both; }
        .trust-row  { animation: fadeUp .55s cubic-bezier(.16,1,.3,1) .40s both; }

        .btn-primary { transition: transform .15s ease, box-shadow .15s ease; }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 16px 40px rgba(99,102,241,.60) !important; }
        .btn-primary:active { transform: scale(.97); }

        .sale-card { transition: transform .2s cubic-bezier(.34,1.56,.64,1), box-shadow .2s; }
        .sale-card:hover { transform: translateY(-4px) scale(1.02); }
        .bs-row { transition: background .15s, transform .15s; }
        .bs-row:hover { transform: translateX(4px); }
        .cat-pill { transition: all .2s cubic-bezier(.4,0,.2,1); }
        .cat-pill:hover { transform: translateY(-2px) scale(1.04); }
        .trust-card { transition: transform .2s cubic-bezier(.34,1.56,.64,1), box-shadow .2s; }
        .trust-card:hover { transform: translateY(-4px) scale(1.02); }
        .stat-card { transition: transform .18s cubic-bezier(.34,1.56,.64,1), box-shadow .18s; }
        .stat-card:hover { transform: translateY(-3px) scale(1.04); }

        .search-wrap { transition: box-shadow .2s, border-color .2s; }
        .search-wrap:focus-within {
          border-color: #6366f1 !important;
          box-shadow: 0 0 0 4px rgba(99,102,241,.18) !important;
        }

        .ring-cw  { animation: spin-cw  32s linear infinite; transform-origin: center; will-change: transform; }
        .ring-ccw { animation: spin-ccw 22s linear infinite; transform-origin: center; will-change: transform; }
        .float-y  { animation: floatY 4s ease-in-out infinite; }

        .ticker-inner { display: flex; width: max-content; animation: tickerX 28s linear infinite; }
        .ticker-inner:hover { animation-play-state: paused; }

        .prod-item { animation: fadeUp .5s cubic-bezier(.16,1,.3,1) both; }

        .grad-text {
          background-image: linear-gradient(92deg,#6366f1 0%,#8b5cf6 30%,#ec4899 60%,#f59e0b 100%);
          background-size: 200% 100%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 5s linear infinite;
        }
      `}</style>

      {/* TICKER BAR */}
      <div className="w-full overflow-hidden" style={{
        background: "linear-gradient(90deg,#6366f1,#7c3aed,#ec4899,#6366f1)",
        backgroundSize: "200% 100%",
        animation: "shimmer 6s linear infinite",
        height: 36,
        display: "flex",
        alignItems: "center",
      }}>
        <div className="ticker-inner gap-0">
          {[...Array(2)].map((_, ri) => (
            <div key={ri} className="flex items-center gap-0">
              {["✦ Flash Sale hingga 40% OFF", "✦ Gratis ongkir min. Rp50K", "✦ 1.000+ produk pilihan", "✦ Rating 4.8★ terpercaya", "✦ Pembayaran aman & terenkripsi", "✦ Promo setiap hari"].map((t, i) => (
                <span key={i} className="text-white text-[11px] font-bold tracking-wide whitespace-nowrap px-8">{t}</span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* HERO */}
      <section className="relative w-full overflow-hidden" style={{
        background: dark
          ? "radial-gradient(ellipse 130% 80% at 10% 40%, rgba(99,102,241,.22) 0%, transparent 55%), radial-gradient(ellipse 90% 100% at 90% 5%, rgba(139,92,246,.18) 0%, transparent 50%), radial-gradient(ellipse 60% 60% at 50% 95%, rgba(236,72,153,.12) 0%, transparent 55%), #07050f"
          : "radial-gradient(ellipse 130% 80% at 5% 35%, rgba(139,92,246,.15) 0%, transparent 55%), radial-gradient(ellipse 90% 100% at 95% 5%, rgba(99,102,241,.12) 0%, transparent 50%), radial-gradient(ellipse 70% 60% at 50% 100%, rgba(59,130,246,.10) 0%, transparent 50%), #f5f3ff",
      }}>
        {/* Dot grid */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: `radial-gradient(circle, ${dark ? "rgba(255,255,255,.20)" : "rgba(99,102,241,.25)"} 1.5px, transparent 1.5px)`,
          backgroundSize: "32px 32px",
        }} />

        {/* Top shimmer line */}
        <div className="absolute top-0 inset-x-0 h-[2px] pointer-events-none" style={{
          background: "linear-gradient(90deg,transparent,#6366f1,#8b5cf6,#ec4899,transparent)",
        }} />

        {/* Orbit rings */}
        <div className="absolute pointer-events-none hidden lg:block" style={{
          width: 480, height: 480, top: "50%", right: "18%",
          marginTop: -240, marginRight: -240,
          border: `1px solid ${dark ? "rgba(99,102,241,.10)" : "rgba(99,102,241,.18)"}`,
          borderRadius: "50%",
        }}>
          <div className="ring-cw w-full h-full rounded-full" />
        </div>
        <div className="absolute pointer-events-none hidden lg:block" style={{
          width: 300, height: 300, top: "50%", right: "18%",
          marginTop: -150, marginRight: -150,
          border: `1.5px dashed ${dark ? "rgba(139,92,246,.12)" : "rgba(139,92,246,.22)"}`,
          borderRadius: "50%",
        }}>
          <div className="ring-ccw w-full h-full rounded-full" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full px-5 sm:px-8 lg:px-12 py-8 sm:py-12 lg:py-16 hero-grid-wrap">
          <style>{`
            .hero-grid-wrap {
              display: grid;
              grid-template-columns: 1fr;
              gap: 2rem;
              align-items: start;
            }
            @media (min-width: 900px) {
              .hero-grid-wrap {
                grid-template-columns: 1fr minmax(0, 460px);
                gap: 3rem;
                align-items: center;
              }
            }
            .hero-right-panel { display: flex; }
            @media (min-width: 900px) {
              .hero-right-panel { display: flex; }
            }
            /* On mobile: side-by-side scroll for the two panels */
            .hero-mobile-panels {
              display: flex;
              gap: 12px;
              overflow-x: auto;
              scroll-snap-type: x mandatory;
              -webkit-overflow-scrolling: touch;
              scrollbar-width: none;
              padding-bottom: 4px;
            }
            .hero-mobile-panels::-webkit-scrollbar { display: none; }
            .hero-mobile-panels > * {
              flex-shrink: 0;
              width: min(320px, 88vw);
              scroll-snap-align: start;
            }
            @media (min-width: 900px) {
              .hero-mobile-panels {
                flex-direction: column;
                overflow-x: visible;
                scroll-snap-type: none;
                padding-bottom: 0;
              }
              .hero-mobile-panels > * {
                flex-shrink: 1;
                width: 100%;
              }
            }
          `}</style>

          {/* LEFT */}
          <div className="hero-left flex flex-col min-w-0">
            <div className="inline-flex items-center gap-2.5 mb-5 sm:mb-8 px-4 py-2 rounded-full w-fit"
              style={{
                background: dark ? "rgba(255,255,255,.07)" : "rgba(255,255,255,.85)",
                border: `1px solid ${dark ? "rgba(255,255,255,.14)" : "rgba(99,102,241,.30)"}`,
                backdropFilter: "blur(16px)",
                boxShadow: dark ? "none" : "0 4px 24px rgba(99,102,241,.14)",
                animation: "popBadge .65s cubic-bezier(.34,1.56,.64,1) .2s both",
              }}>
              <span className="relative flex items-center justify-center w-3 h-3">
                <span className="absolute w-full h-full rounded-full bg-emerald-400"
                  style={{ animation: "pulseRing 1.8s ease-out infinite" }} />
                <span className="relative w-2 h-2 rounded-full bg-emerald-400 block" />
              </span>
              <Flame className="w-3.5 h-3.5 text-orange-400" />
              <span className="text-xs font-bold"
                style={{ color: dark ? "rgba(255,255,255,.75)" : "rgba(67,56,202,.90)" }}>
                Flash Sale Aktif Sekarang
              </span>
              <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full"
                style={{ background: "rgba(251,191,36,.22)", color: "#d97706", border: "1px solid rgba(251,191,36,.45)" }}>
                HEMAT 40%
              </span>
            </div>

            <h1 className="font-black leading-[1.0] mb-6"
              style={{
                fontSize: "clamp(2rem,6vw,4.5rem)",
                fontFamily: "Outfit,sans-serif",
                letterSpacing: "-.03em",
              }}>
              <span style={{ color: dark ? "#fff" : "#1e1b4b" }}>Belanja Lebih</span><br />
              <span className="grad-text">Cerdas &amp; Hemat.</span>
            </h1>

            <p className="text-sm sm:text-base leading-relaxed mb-6 sm:mb-10 max-w-[420px]"
              style={{ color: dark ? "rgba(255,255,255,.45)" : "rgba(49,46,129,.55)" }}>
              Ribuan produk pilihan dari 6 kategori. Harga transparan, kualitas terjamin — pengiriman cepat ke seluruh Indonesia.
            </p>

            <div className="search-wrap flex items-center gap-2 p-1.5 rounded-2xl mb-8 sm:mb-10 w-full sm:max-w-[460px]"
              style={{
                background: dark ? "rgba(255,255,255,.07)" : "rgba(255,255,255,.95)",
                border: `1.5px solid ${dark ? "rgba(255,255,255,.12)" : "rgba(99,102,241,.28)"}`,
                backdropFilter: "blur(20px)",
                boxShadow: dark
                  ? "inset 0 1px 0 rgba(255,255,255,.06), 0 8px 32px rgba(0,0,0,.3)"
                  : "0 8px 48px rgba(99,102,241,.18), 0 2px 8px rgba(99,102,241,.10), inset 0 1px 0 #fff",
              }}>
              <div className="ml-2 w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(99,102,241,.14)" }}>
                <Search className="w-4 h-4" style={{ color: "#6366f1" }} />
              </div>
              <input
                type="text"
                placeholder="Cari produk impianmu…"
                value={inputVal}
                onChange={e => setInputVal(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent text-sm font-semibold outline-none py-3 px-2"
                style={{ color: dark ? "#fff" : "#1e1b4b", caretColor: "#6366f1" }}
              />
              {inputVal && (
                <button onClick={clearSearch}
                  className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(99,102,241,.12)", color: "#6366f1" }}>
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
              <button onClick={handleSearch}
                className="btn-primary flex-shrink-0 flex items-center gap-2 px-6 py-3 rounded-xl text-white text-sm font-black"
                style={{ background: "linear-gradient(135deg,#6366f1,#7c3aed)", boxShadow: "0 4px 20px rgba(99,102,241,.55)" }}>
                Cari <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="flex gap-2 flex-wrap sm:gap-3">
              {[
                { icon: ShoppingBag, v: `${products.length}+`, l: "Produk", a: "#6366f1" },
                { icon: Star, v: "4.8★", l: "Rating", a: "#f59e0b" },
                { icon: TrendingUp, v: `${(totalSold / 1000).toFixed(0)}K+`, l: "Terjual", a: "#10b981" },
              ].map(({ icon: Icon, v, l, a }, i) => (
                <div key={l}
                  className="stat-card flex items-center gap-3 px-4 py-3 rounded-2xl cursor-default"
                  onMouseEnter={() => setHoveredStat(i)}
                  onMouseLeave={() => setHoveredStat(null)}
                  style={{
                    background: dark ? "rgba(255,255,255,.06)" : "rgba(255,255,255,.82)",
                    border: `1px solid ${dark ? "rgba(255,255,255,.10)" : "rgba(99,102,241,.20)"}`,
                    backdropFilter: "blur(12px)",
                    boxShadow: hoveredStat === i ? `0 8px 24px ${a}40` : dark ? "none" : "0 2px 16px rgba(99,102,241,.10)",
                  }}>
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{ background: `${a}1f`, border: `1px solid ${a}35` }}>
                    <Icon className="w-4 h-4" style={{ color: a }} />
                  </div>
                  <div>
                    <p className="text-sm font-black leading-none" style={{ color: dark ? "#fff" : "#1e1b4b" }}>{v}</p>
                    <p className="text-[11px] font-semibold mt-0.5" style={{ color: dark ? "rgba(255,255,255,.40)" : "rgba(49,46,129,.48)" }}>{l}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — visible on all screen sizes */}
          <div className="hero-right hero-right-panel hero-mobile-panels flex-col gap-3" style={{ minWidth: 0 }}>
            {/* Flash Sale panel */}
            <div className="rounded-3xl overflow-hidden"
              style={{
                background: dark ? "rgba(255,255,255,.05)" : "rgba(255,255,255,.92)",
                border: `1px solid ${dark ? "rgba(255,255,255,.10)" : "rgba(99,102,241,.22)"}`,
                backdropFilter: "blur(24px)",
                boxShadow: dark
                  ? "0 24px 64px rgba(0,0,0,.50), inset 0 1px 0 rgba(255,255,255,.08)"
                  : "0 24px 72px rgba(99,102,241,.18), 0 4px 16px rgba(99,102,241,.10), inset 0 1px 0 #fff",
              }}>
              <div className="flex items-center gap-3 px-4 py-3.5"
                style={{
                  background: dark ? "rgba(251,191,36,.06)" : "rgba(255,252,235,.90)",
                  borderBottom: `1px solid ${dark ? "rgba(255,255,255,.07)" : "rgba(251,191,36,.30)"}`,
                }}>
                <div className="w-8 h-8 rounded-xl flex items-center justify-center float-y"
                  style={{ background: "linear-gradient(135deg,rgba(251,191,36,.4),rgba(245,158,11,.3))", border: "1px solid rgba(251,191,36,.5)" }}>
                  <Flame className="w-4 h-4 text-amber-500" />
                </div>
                <span className="text-sm font-black" style={{ color: dark ? "#fef3c7" : "#92400e" }}>Flash Sale</span>
                <div className="ml-auto flex items-center gap-2 px-3 py-1.5 rounded-full"
                  style={{ background: "rgba(251,191,36,.18)", border: "1px solid rgba(251,191,36,.42)" }}>
                  <span className="relative flex items-center justify-center w-3 h-3">
                    <span className="absolute w-full h-full rounded-full bg-amber-400"
                      style={{ animation: "pulseRing 1.6s ease-out infinite" }} />
                    <span className="relative w-2 h-2 rounded-full bg-amber-400 block" />
                  </span>
                  <span className="text-[11px] font-black tabular-nums" style={{ color: "#d97706" }}>08:42:15</span>
                </div>
              </div>

              <div className="p-3 grid grid-cols-2 gap-2.5">
                {saleProducts.map(p => {
                  const disc = p.originalPrice ? Math.round((1 - p.price / p.originalPrice) * 100) : 0;
                  return (
                    <Link key={p.id} href={`/customer/products/${p.id}`}
                      className="sale-card group flex items-center gap-3 p-3 rounded-2xl"
                      style={{
                        background: dark ? "rgba(255,255,255,.04)" : "rgba(255,255,255,.98)",
                        border: `1px solid ${dark ? "rgba(255,255,255,.08)" : "rgba(99,102,241,.14)"}`,
                        boxShadow: dark ? "none" : "0 2px 12px rgba(99,102,241,.07)",
                      }}>
                      <div className="relative flex-shrink-0">
                        <img src={p.image} alt={p.name}
                          className="w-12 h-12 rounded-xl object-cover"
                          style={{ border: `1px solid ${dark ? "rgba(255,255,255,.09)" : "rgba(99,102,241,.12)"}` }} />
                        {disc > 0 && (
                          <div className="absolute -top-2 -right-2 text-[9px] font-black px-1.5 py-0.5 rounded-full text-white"
                            style={{ background: "linear-gradient(135deg,#f43f5e,#e11d48)", boxShadow: "0 2px 8px rgba(244,63,94,.50)" }}>
                            -{disc}%
                          </div>
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-[11px] font-bold line-clamp-1 mb-0.5"
                          style={{ color: dark ? "rgba(255,255,255,.88)" : "#1e1b4b" }}>{p.name}</p>
                        <p className="text-[13px] font-black" style={{ color: dark ? "#86efac" : "#059669" }}>
                          {formatRupiah(p.price)}
                        </p>
                        {p.originalPrice && (
                          <p className="text-[10px] line-through" style={{ color: dark ? "rgba(255,255,255,.30)" : "rgba(49,46,129,.38)" }}>
                            {formatRupiah(p.originalPrice)}
                          </p>
                        )}
                      </div>
                    </Link>
                  );
                })}
              </div>

              <div className="px-3 pb-3">
                <Link href="/"
                  className="flex items-center justify-center gap-2 py-3 rounded-2xl text-xs font-black"
                  style={{
                    color: dark ? "#818cf8" : "#4f46e5",
                    background: dark ? "rgba(99,102,241,.12)" : "rgba(99,102,241,.07)",
                    border: `1px solid ${dark ? "rgba(99,102,241,.24)" : "rgba(99,102,241,.20)"}`,
                    transition: "background .15s",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = dark ? "rgba(99,102,241,.20)" : "rgba(99,102,241,.14)")}
                  onMouseLeave={e => (e.currentTarget.style.background = dark ? "rgba(99,102,241,.12)" : "rgba(99,102,241,.07)")}>
                  <Tag className="w-3.5 h-3.5" /> Lihat Semua Flash Sale <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Best Sellers */}
            <div className="rounded-3xl overflow-hidden"
              style={{
                background: dark ? "rgba(255,255,255,.04)" : "rgba(255,255,255,.90)",
                border: `1px solid ${dark ? "rgba(255,255,255,.09)" : "rgba(99,102,241,.18)"}`,
                backdropFilter: "blur(20px)",
                boxShadow: dark
                  ? "0 16px 48px rgba(0,0,0,.42), inset 0 1px 0 rgba(255,255,255,.07)"
                  : "0 16px 48px rgba(99,102,241,.13), inset 0 1px 0 #fff",
              }}>
              <div className="flex items-center gap-2.5 px-4 py-3.5"
                style={{ borderBottom: `1px solid ${dark ? "rgba(255,255,255,.07)" : "rgba(99,102,241,.10)"}` }}>
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-black uppercase tracking-widest"
                  style={{ color: dark ? "rgba(255,255,255,.55)" : "rgba(79,46,220,.65)" }}>Best Sellers</span>
              </div>
              <div className="p-2">
                {bestSellers.map((p, i) => (
                  <Link key={p.id} href={`/customer/products/${p.id}`}
                    className="bs-row flex items-center gap-3 px-3 py-3 rounded-2xl"
                    style={{ background: "transparent" }}>
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 text-[10px] font-black text-white"
                      style={{
                        background: i === 0 ? "linear-gradient(135deg,#f59e0b,#d97706)"
                          : i === 1 ? "linear-gradient(135deg,#94a3b8,#64748b)"
                            : "linear-gradient(135deg,#cd7c2f,#92400e)",
                        boxShadow: i === 0 ? "0 2px 8px rgba(245,158,11,.4)" : i === 1 ? "0 2px 8px rgba(100,116,139,.3)" : "0 2px 8px rgba(146,64,14,.3)",
                      }}>
                      {i + 1}
                    </div>
                    <img src={p.image} alt={p.name}
                      className="w-10 h-10 rounded-xl object-cover flex-shrink-0"
                      style={{ border: `1px solid ${dark ? "rgba(255,255,255,.09)" : "rgba(99,102,241,.12)"}` }} />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold line-clamp-1"
                        style={{ color: dark ? "rgba(255,255,255,.88)" : "#1e1b4b" }}>{p.name}</p>
                      <p className="text-[10px]"
                        style={{ color: dark ? "rgba(255,255,255,.35)" : "rgba(49,46,129,.44)" }}>{p.sold} terjual</p>
                    </div>
                    <p className="text-[12px] font-black flex-shrink-0"
                      style={{ color: dark ? "#818cf8" : "#4f46e5" }}>{formatRupiah(p.price)}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 inset-x-0 h-16 pointer-events-none"
          style={{ background: "linear-gradient(to top,var(--bg),transparent)" }} />
      </section>

      {/* TRUST BADGES */}
      <div className="trust-row max-w-7xl mx-auto w-full px-6 lg:px-12 py-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
          {trustBadges.map(({ icon: Icon, label, sub, color }) => (
            <div key={label}
              className="trust-card flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-3 sm:py-4 rounded-2xl cursor-default"
              style={{
                background: dark ? "rgba(255,255,255,.04)" : "rgba(255,255,255,.85)",
                border: `1px solid ${dark ? "rgba(255,255,255,.08)" : `${color}28`}`,
                backdropFilter: "blur(12px)",
                boxShadow: dark ? "none" : `0 4px 20px ${color}14`,
              }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: `${color}18`, border: `1px solid ${color}30` }}>
                <Icon className="w-5 h-5" style={{ color }} />
              </div>
              <div>
                <p className="text-xs font-black" style={{ color: dark ? "#fff" : "#1e1b4b" }}>{label}</p>
                <p className="text-[10px] font-medium mt-0.5" style={{ color: dark ? "rgba(255,255,255,.38)" : "rgba(49,46,129,.48)" }}>{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PRODUCTS */}
      <section ref={productRef} id="products-section" className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-12 pb-16">

        <div className="mb-6">
          <p className="text-[11px] font-black uppercase tracking-widest mb-1" style={{ color: "#6366f1" }}>Koleksi Kami</p>
          <h2 className="text-2xl font-black" style={{ color: "var(--text)", letterSpacing: "-.02em" }}>
            Semua Produk
          </h2>
        </div>

        {search && (
          <div className="flex items-center gap-3 mb-5 px-4 py-3 rounded-2xl"
            style={{ background: "rgba(99,102,241,.07)", border: "1px solid rgba(99,102,241,.20)" }}>
            <Search className="w-4 h-4 flex-shrink-0" style={{ color: "#6366f1" }} />
            <p className="text-sm flex-1" style={{ color: "var(--text)" }}>
              Hasil untuk <span className="font-black" style={{ color: "#6366f1" }}>"{search}"</span>
              {" — "}<span className="font-bold">{filtered.length} produk</span>
            </p>
            <button onClick={clearSearch}
              className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl"
              style={{ color: "#6366f1", background: "rgba(99,102,241,.10)", border: "1px solid rgba(99,102,241,.22)", transition: "background .15s" }}
              onMouseEnter={e => (e.currentTarget.style.background = "rgba(99,102,241,.18)")}
              onMouseLeave={e => (e.currentTarget.style.background = "rgba(99,102,241,.10)")}>
              <X className="w-3 h-3" /> Hapus
            </button>
          </div>
        )}

        <div className="flex gap-2 overflow-x-auto pb-2 mb-5" style={{ scrollbarWidth: "none" }}>
          {categories.map(cat => (
            <button key={cat.id} onClick={() => setActiveCat(cat.id)}
              className="cat-pill flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold whitespace-nowrap flex-shrink-0"
              style={activeCat === cat.id
                ? { background: "linear-gradient(135deg,#6366f1,#7c3aed)", color: "#fff", boxShadow: "0 4px 16px rgba(99,102,241,.38)", transform: "scale(1.06)" }
                : { background: "var(--surface)", color: "var(--text2)", border: "1px solid var(--border)" }}>
              <span className="text-sm">{cat.icon}</span>{cat.name}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between mb-5 px-1">
          <p className="text-sm font-semibold" style={{ color: "var(--text2)" }}>
            <span className="font-black" style={{ color: "var(--text)" }}>{filtered.length}</span> produk
            {activeCat !== "all" && <span className="font-bold capitalize ml-1" style={{ color: "#6366f1" }}>· {activeCat}</span>}
          </p>
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl"
            style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
            <SlidersHorizontal className="w-3.5 h-3.5" style={{ color: "var(--text3)" }} />
            <select value={sortBy} onChange={e => setSortBy(e.target.value)}
              className="text-xs font-semibold outline-none bg-transparent"
              style={{ color: "var(--text2)" }}>
              <option value="popular">Terpopuler</option>
              <option value="rating">Rating Tertinggi</option>
              <option value="price-asc">Termurah</option>
              <option value="price-desc">Termahal</option>
            </select>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <Package className="w-16 h-16 opacity-20" style={{ color: "var(--text2)" }} />
            <p className="font-bold" style={{ color: "var(--text2)" }}>
              {search ? `Produk "${search}" tidak ditemukan` : "Produk tidak ditemukan"}
            </p>
            <button onClick={() => { clearSearch(); setActiveCat("all"); }}
              className="px-6 py-2.5 rounded-xl text-sm font-bold text-white"
              style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)", boxShadow: "0 4px 14px rgba(99,102,241,.3)" }}>
              Reset Filter
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
            {filtered.map((p, i) => (
              <div key={p.id} className="prod-item" style={{ animationDelay: `${Math.min(i * .04, .5)}s` }}>
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
