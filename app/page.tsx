"use client";
import { useState, useMemo } from "react";
import { Search, SlidersHorizontal, TrendingUp, Zap } from "lucide-react";
import Navbar from "@/components/ui/Navbar";
import ProductCard from "@/components/customer/ProductCard";
import { products, categories } from "@/data/products";

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortBy, setSortBy] = useState("popular");

  const filtered = useMemo(() => {
    let list = [...products];
    if (activeCategory !== "all") list = list.filter((p) => p.category === activeCategory);
    if (search.trim()) list = list.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));
    if (sortBy === "popular") list.sort((a, b) => b.sold - a.sold);
    if (sortBy === "price-asc") list.sort((a, b) => a.price - b.price);
    if (sortBy === "price-desc") list.sort((a, b) => b.price - a.price);
    if (sortBy === "rating") list.sort((a, b) => b.rating - a.rating);
    return list;
  }, [search, activeCategory, sortBy]);

  const featuredBadges = products.filter((p) => p.badge === "Best Seller").slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar />

      {/* Hero */}
      <div className="bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white blur-3xl -translate-y-1/2 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-violet-300 blur-2xl translate-y-1/2 -translate-x-1/4" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
              <Zap className="w-3.5 h-3.5 text-yellow-300" />
              Flash Sale Today – Up to 25% off!
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 leading-tight">
              Everything You Need,<br />
              <span className="text-indigo-200">All in One Place</span>
            </h1>
            <p className="text-indigo-200 text-sm sm:text-base mb-6">
              Discover amazing products across 6 categories. Fresh arrivals daily.
            </p>
            <div className="relative max-w-lg">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search for products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white text-gray-900 placeholder-gray-400 outline-none text-sm shadow-lg"
              />
            </div>
            <div className="flex items-center gap-4 mt-5">
              {featuredBadges.map((p) => (
                <div key={p.id} className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-xl px-3 py-2">
                  <img src={p.image} alt={p.name} className="w-8 h-8 rounded-lg object-cover" />
                  <div>
                    <p className="text-xs font-semibold text-white line-clamp-1 max-w-[80px]">{p.name}</p>
                    <p className="text-[10px] text-indigo-200">{p.sold} sold</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-5 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                activeCategory === cat.id
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-200 dark:shadow-indigo-900"
                  : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-600"
              }`}
            >
              <span>{cat.icon}</span>
              {cat.name}
            </button>
          ))}
        </div>

        {/* Toolbar */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-indigo-500" />
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Showing <span className="font-semibold text-gray-900 dark:text-gray-100">{filtered.length}</span> products
              {activeCategory !== "all" && <span> in <span className="text-indigo-600 dark:text-indigo-400 font-medium capitalize">{activeCategory}</span></span>}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-3.5 h-3.5 text-gray-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-xs bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-1.5 text-gray-700 dark:text-gray-300 outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
            >
              <option value="popular">Most Popular</option>
              <option value="rating">Top Rated</option>
              <option value="price-asc">Price: Low → High</option>
              <option value="price-desc">Price: High → Low</option>
            </select>
          </div>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-7xl mb-4">🔍</div>
            <p className="text-lg font-semibold text-gray-500 dark:text-gray-400">No products found</p>
            <p className="text-sm text-gray-400 mt-1">Try adjusting your search or filter</p>
            <button
              onClick={() => { setSearch(""); setActiveCategory("all"); }}
              className="mt-5 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl text-sm font-medium transition-colors"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
