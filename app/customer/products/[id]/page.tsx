"use client";
import { use, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Star, ShoppingCart, Package2, Plus, Minus, Check, Heart, Share2 } from "lucide-react";
import { products } from "@/data/products";
import { useCart } from "@/lib/CartContext";
import { formatRupiah } from "@/lib/utils";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import ProductCard from "@/components/customer/ProductCard";

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const product = products.find(p => p.id === id);
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [liked, setLiked] = useState(false);

  if (!product) return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      <Navbar />
      <div className="flex-1 flex flex-col items-center justify-center gap-4">
        <div className="text-6xl">😕</div>
        <p className="text-lg font-bold text-gray-500">Product not found</p>
        <Link href="/" className="text-indigo-500 hover:underline text-sm font-medium">← Back to Home</Link>
      </div>
      <Footer />
    </div>
  );

  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 5);
  const discount = product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;

  const handleAdd = () => {
    addItem(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      <Navbar />

      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-gray-400 mb-6">
          <Link href="/" className="hover:text-indigo-500 transition-colors">Home</Link>
          <span>/</span>
          <span className="capitalize text-gray-500">{product.category}</span>
          <span>/</span>
          <span className="text-gray-900 dark:text-gray-100 font-medium line-clamp-1">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-12 mb-12">
          {/* Image */}
          <div className="relative rounded-3xl overflow-hidden bg-gray-100 dark:bg-[var(--card)] aspect-square shadow-xl">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            {product.badge && (
              <span className={`absolute top-4 left-4 text-sm font-black px-3 py-1.5 rounded-full shadow-lg ${
                product.badge === "Sale" ? "bg-red-500 text-white" :
                product.badge === "Best Seller" ? "bg-amber-500 text-white" :
                "bg-gradient-to-r from-indigo-500 to-violet-500 text-white"
              }`}>{product.badge}</span>
            )}
            <div className="absolute top-4 right-4 flex flex-col gap-2">
              <button onClick={() => setLiked(l => !l)}
                className="w-10 h-10 rounded-full bg-white/90 dark:bg-black/50 backdrop-blur-sm flex items-center justify-center transition-all hover:scale-110 active:scale-95 shadow-md">
                <Heart className={`w-4 h-4 transition-colors ${liked ? "fill-red-500 text-red-500" : "text-gray-400"}`} />
              </button>
              <button className="w-10 h-10 rounded-full bg-white/90 dark:bg-black/50 backdrop-blur-sm flex items-center justify-center hover:scale-110 active:scale-95 shadow-md text-gray-400">
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col">
            <span className="text-xs font-black text-indigo-500 uppercase tracking-widest mb-2 capitalize">{product.category}</span>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white mb-3 leading-tight" style={{ fontFamily: "Syne, sans-serif" }}>{product.name}</h1>

            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? "fill-amber-400 text-amber-400" : "text-gray-200 dark:text-gray-700"}`} />
                ))}
              </div>
              <span className="text-sm font-bold text-gray-700 dark:text-gray-300">{product.rating}</span>
              <span className="text-gray-300 dark:text-gray-600">·</span>
              <span className="text-sm text-gray-400">{product.sold.toLocaleString()} terjual</span>
            </div>

            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-6 bg-gray-50 dark:bg-white/[0.03] rounded-2xl p-4 border border-black/[0.04] dark:border-white/[0.04]">
              {product.description}
            </p>

            {/* Price */}
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl font-black text-gray-900 dark:text-white" style={{ fontFamily: "Syne, sans-serif" }}>{formatRupiah(product.price)}</span>
              {product.originalPrice && (
                <>
                  <span className="text-base text-gray-400 line-through">{formatRupiah(product.originalPrice)}</span>
                  <span className="text-xs font-black bg-red-500 text-white px-2 py-1 rounded-lg">HEMAT {discount}%</span>
                </>
              )}
            </div>

            {/* Stock */}
            <div className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold mb-6 w-fit border ${
              product.stock < 10
                ? "bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-200 dark:border-orange-500/20"
                : "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20"
            }`}>
              <Package2 className="w-4 h-4 flex-shrink-0" />
              {product.stock < 10 ? `⚠ Hanya tersisa ${product.stock} item!` : `✓ Stok tersedia (${product.stock})`}
            </div>

            {/* Qty */}
            <div className="flex items-center gap-4 mb-5">
              <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">Qty:</span>
              <div className="flex items-center gap-1 bg-gray-100 dark:bg-white/[0.06] rounded-2xl p-1">
                <button onClick={() => setQty(q => Math.max(1, q - 1))} className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-white dark:hover:bg-white/[0.1] transition-colors active:scale-90">
                  <Minus className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                </button>
                <span className="w-10 text-center font-black text-gray-900 dark:text-white">{qty}</span>
                <button onClick={() => setQty(q => Math.min(product.stock, q + 1))} className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-white dark:hover:bg-white/[0.1] transition-colors active:scale-90">
                  <Plus className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                </button>
              </div>
              <span className="text-sm text-gray-400">= <span className="font-black text-gray-900 dark:text-white">{formatRupiah(product.price * qty)}</span></span>
            </div>

            <div className="flex gap-3">
              <button onClick={handleAdd}
                className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl font-bold text-sm transition-all active:scale-95 ${
                  added ? "bg-emerald-500 text-white" : "bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600 text-white shadow-lg shadow-indigo-500/25"
                }`}>
                {added ? <Check className="w-5 h-5" /> : <ShoppingCart className="w-5 h-5" />}
                {added ? "Ditambahkan!" : "Tambah ke Keranjang"}
              </button>
              <Link href="/customer/cart" className="px-5 py-3.5 rounded-2xl border-2 border-gray-200 dark:border-white/[0.1] text-sm font-bold text-gray-600 dark:text-gray-400 hover:border-indigo-400 dark:hover:border-indigo-500 transition-colors whitespace-nowrap">
                Keranjang
              </Link>
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-5">
              <div className="w-1.5 h-5 bg-gradient-to-b from-indigo-500 to-violet-500 rounded-full" />
              <h2 className="text-xl font-black text-gray-900 dark:text-white" style={{ fontFamily: "Syne, sans-serif" }}>Produk Serupa</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
