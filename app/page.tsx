"use client";
import { useState, useMemo } from "react";
import { Search, SlidersHorizontal, Sparkles, TrendingUp, Star, ShoppingBag } from "lucide-react";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import ProductCard from "@/components/customer/ProductCard";
import { products, categories } from "@/data/products";
import { formatRupiah } from "@/lib/utils";

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [activeCat, setActiveCat] = useState("all");
  const [sortBy, setSortBy] = useState("popular");

  const filtered = useMemo(() => {
    let list = [...products];
    if (activeCat !== "all") list = list.filter(p => p.category === activeCat);
    if (search.trim()) list = list.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
    if (sortBy === "popular") list.sort((a, b) => b.sold - a.sold);
    if (sortBy === "price-asc") list.sort((a, b) => a.price - b.price);
    if (sortBy === "price-desc") list.sort((a, b) => b.price - a.price);
    if (sortBy === "rating") list.sort((a, b) => b.rating - a.rating);
    return list;
  }, [search, activeCat, sortBy]);

  const bestSellers = products.filter(p => p.badge === "Best Seller").slice(0, 3);
  const totalSold = products.reduce((s, p) => s + p.sold, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-600 via-indigo-600 to-blue-700 animate-gradient" style={{ backgroundSize: "300% 300%" }} />
        {/* Decorative orbs */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-float" />
        <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-violet-300/20 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-32 h-32 bg-indigo-300/15 rounded-full blur-2xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full mb-5 border border-white/20">
                <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                Flash Sale · Up to 25% off today!
              </div>
              <h1 className="text-4xl sm:text-5xl font-black text-white mb-4 leading-[1.1]" style={{ fontFamily: "Syne, sans-serif" }}>
                Everything<br />You Need,<br />
                <span className="text-indigo-200">One Place.</span>
              </h1>
              <p className="text-indigo-100 text-sm sm:text-base mb-7 max-w-sm leading-relaxed">
                Fresh products across 6 categories. Unbeatable prices, delivered fast.
              </p>

              {/* Search */}
              <div className="relative max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white text-gray-900 placeholder-gray-400 outline-none text-sm shadow-2xl shadow-black/20 focus:ring-2 focus:ring-white/50"
                />
              </div>

              {/* Quick stats */}
              <div className="flex items-center gap-5 mt-7">
                {[
                  { icon: ShoppingBag, value: `${products.length}+`, label: "Products" },
                  { icon: TrendingUp, value: `${totalSold.toLocaleString()}`, label: "Sold" },
                  { icon: Star, value: "4.7", label: "Avg Rating" },
                ].map(({ icon: Icon, value, label }) => (
                  <div key={label} className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center">
                      <Icon className="w-3.5 h-3.5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-black text-white leading-none">{value}</p>
                      <p className="text-[10px] text-indigo-200 leading-none mt-0.5">{label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Best seller cards */}
            <div className="hidden lg:grid grid-cols-1 gap-3">
              <p className="text-xs font-bold text-white/60 uppercase tracking-widest">Best Sellers</p>
              {bestSellers.map((p, i) => (
                <div key={p.id} className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-3 hover:bg-white/15 transition-colors cursor-pointer"
                  style={{ animationDelay: `${i * 0.1}s` }}>
                  <img src={p.image} alt={p.name} className="w-14 h-14 rounded-xl object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-white line-clamp-1">{p.name}</p>
                    <p className="text-xs text-indigo-200 capitalize">{p.category}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-sm font-black text-white">{formatRupiah(p.price)}</p>
                    <p className="text-[10px] text-indigo-200">{p.sold} sold</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Products ── */}
      <section className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-8">
        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-1 mb-5" style={{ scrollbarWidth: "none" }}>
          {categories.map(cat => (
            <button key={cat.id} onClick={() => setActiveCat(cat.id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all flex-shrink-0 ${
                activeCat === cat.id
                  ? "bg-gradient-to-r from-indigo-500 to-violet-500 text-white shadow-md shadow-indigo-500/30"
                  : "bg-white dark:bg-[var(--card)] text-gray-500 dark:text-gray-400 border border-black/[0.06] dark:border-white/[0.06] hover:border-indigo-300 dark:hover:border-indigo-500/40 hover:text-indigo-600"
              }`}>
              {cat.icon} {cat.name}
            </button>
          ))}
        </div>

        {/* Toolbar */}
        <div className="flex items-center justify-between mb-5">
          <p className="text-sm text-gray-400">
            <span className="font-bold text-gray-900 dark:text-white">{filtered.length}</span> products
            {activeCat !== "all" && <span className="text-indigo-500 font-semibold capitalize ml-1">· {activeCat}</span>}
          </p>
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-3.5 h-3.5 text-gray-400" />
            <select value={sortBy} onChange={e => setSortBy(e.target.value)}
              className="text-xs bg-white dark:bg-[var(--card)] border border-black/[0.08] dark:border-white/[0.08] rounded-xl px-3 py-1.5 text-gray-600 dark:text-gray-300 outline-none focus:ring-2 focus:ring-indigo-500/40 cursor-pointer">
              <option value="popular">Most Popular</option>
              <option value="rating">Top Rated</option>
              <option value="price-asc">Price: Low → High</option>
              <option value="price-desc">Price: High → Low</option>
            </select>
          </div>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-3">
            <div className="text-6xl">🔍</div>
            <p className="text-lg font-bold text-gray-400">No products found</p>
            <button onClick={() => { setSearch(""); setActiveCat("all"); }}
              className="mt-1 bg-gradient-to-r from-indigo-500 to-violet-500 text-white px-6 py-2.5 rounded-xl text-sm font-semibold shadow-md shadow-indigo-500/20">
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
            {filtered.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}
