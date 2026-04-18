"use client";
import Link from "next/link";
import { ShoppingCart, Star } from "lucide-react";
import type { Product } from "@/data/products";
import { formatRupiah } from "@/lib/utils";
import { useCart } from "@/lib/CartContext";
import { useState } from "react";

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [flash, setFlash] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product);
    setFlash(true);
    setTimeout(() => setFlash(false), 700);
  };

  return (
    <div className="group bg-white dark:bg-[var(--card)] rounded-2xl overflow-hidden border border-black/[0.06] dark:border-white/[0.06] hover:shadow-xl dark:hover:shadow-black/40 hover:-translate-y-1 transition-all duration-300">
      <Link href={`/customer/products/${product.id}`}>
        <div className="relative overflow-hidden aspect-square bg-gray-100 dark:bg-white/[0.04]">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          {product.badge && (
            <span className={`absolute top-2 left-2 text-[10px] font-black px-2 py-0.5 rounded-full shadow-sm ${
              product.badge === "Sale" ? "bg-red-500 text-white" :
              product.badge === "Best Seller" ? "bg-amber-500 text-white" :
              "bg-gradient-to-r from-indigo-500 to-violet-500 text-white"
            }`}>{product.badge}</span>
          )}
          {product.stock < 10 && (
            <span className="absolute top-2 right-2 text-[10px] font-bold bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 px-1.5 py-0.5 rounded-full">
              {product.stock} left
            </span>
          )}
        </div>
      </Link>
      <div className="p-3">
        <Link href={`/customer/products/${product.id}`}>
          <p className="font-semibold text-gray-900 dark:text-gray-100 text-sm line-clamp-1 mb-1 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">{product.name}</p>
        </Link>
        <div className="flex items-center gap-1 mb-2">
          <Star className="w-3 h-3 fill-amber-400 text-amber-400 flex-shrink-0" />
          <span className="text-[11px] text-gray-400">{product.rating} · {product.sold}</span>
        </div>
        <div className="flex items-center justify-between gap-2">
          <div className="min-w-0">
            <p className="font-black text-gray-900 dark:text-white text-sm leading-none" style={{ fontFamily: 'Syne, sans-serif' }}>{formatRupiah(product.price)}</p>
            {product.originalPrice && <p className="text-[10px] text-gray-400 line-through mt-0.5">{formatRupiah(product.originalPrice)}</p>}
          </div>
          <button onClick={handleAdd} className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-xl transition-all active:scale-90 ${flash ? "bg-emerald-500 scale-110" : "bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600"} text-white shadow-sm`}>
            <ShoppingCart className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
