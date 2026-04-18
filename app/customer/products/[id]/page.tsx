"use client";
import { use, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Star, ShoppingCart, Package2, Plus, Minus, Check } from "lucide-react";
import { products } from "@/data/products";
import { useCart } from "@/lib/CartContext";
import { formatRupiah } from "@/lib/utils";
import Navbar from "@/components/ui/Navbar";
import ProductCard from "@/components/customer/ProductCard";

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const product = products.find((p) => p.id === id);
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
        <Navbar />
        <div className="flex flex-col items-center justify-center h-96 gap-4">
          <div className="text-6xl">😕</div>
          <p className="text-xl font-semibold text-gray-500">Product not found</p>
          <Link href="/" className="text-indigo-600 hover:underline text-sm">← Back to Home</Link>
        </div>
      </div>
    );
  }

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 5);

  const handleAdd = () => {
    addItem(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors mb-6 group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          Back to Products
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Image */}
          <div className="relative rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800 aspect-square">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            {product.badge && (
              <span className={`absolute top-4 left-4 text-sm font-bold px-3 py-1.5 rounded-full ${
                product.badge === "Sale" ? "bg-red-500 text-white" :
                product.badge === "Best Seller" ? "bg-amber-500 text-white" :
                "bg-indigo-500 text-white"
              }`}>{product.badge}</span>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-2 capitalize">{product.category}</span>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-3 leading-tight">{product.name}</h1>

            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? "fill-amber-400 text-amber-400" : "text-gray-300 dark:text-gray-600"}`} />
                ))}
              </div>
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">{product.rating}</span>
              <span className="text-sm text-gray-400">·</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">{product.sold.toLocaleString()} sold</span>
            </div>

            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6">{product.description}</p>

            <div className="flex items-end gap-3 mb-4">
              <span className="text-3xl font-bold text-gray-900 dark:text-gray-100">{formatRupiah(product.price)}</span>
              {product.originalPrice && (
                <>
                  <span className="text-lg text-gray-400 line-through">{formatRupiah(product.originalPrice)}</span>
                  <span className="text-sm font-bold text-white bg-red-500 px-2 py-0.5 rounded-lg">-{discount}%</span>
                </>
              )}
            </div>

            <div className="flex items-center gap-2 mb-6 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <Package2 className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <span className={`text-sm font-medium ${product.stock < 10 ? "text-orange-500" : "text-emerald-600 dark:text-emerald-400"}`}>
                {product.stock < 10 ? `⚠ Only ${product.stock} items left!` : `✓ In Stock — ${product.stock} available`}
              </span>
            </div>

            <div className="flex items-center gap-4 mb-5">
              <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 rounded-xl p-1">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-white dark:hover:bg-gray-700 transition-colors active:scale-95">
                  <Minus className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                </button>
                <span className="w-10 text-center font-bold text-gray-900 dark:text-gray-100">{qty}</span>
                <button onClick={() => setQty((q) => Math.min(product.stock, q + 1))} className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-white dark:hover:bg-gray-700 transition-colors active:scale-95">
                  <Plus className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                </button>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">= <span className="font-bold text-gray-900 dark:text-gray-100">{formatRupiah(product.price * qty)}</span></p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleAdd}
                className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm transition-all active:scale-95 ${
                  added
                    ? "bg-green-500 text-white"
                    : "bg-indigo-600 hover:bg-indigo-700 text-white"
                }`}
              >
                {added ? <Check className="w-5 h-5" /> : <ShoppingCart className="w-5 h-5" />}
                {added ? "Added to Cart!" : "Add to Cart"}
              </button>
              <Link
                href="/customer/cart"
                className="px-6 py-3.5 rounded-xl border-2 border-gray-200 dark:border-gray-600 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:border-indigo-300 dark:hover:border-indigo-600 transition-colors"
              >
                View Cart
              </Link>
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">You Might Also Like</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
              {related.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
