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
    <div className="group bg-[var(--surface)] rounded-2xl overflow-hidden border border-[var(--border)] hover:shadow-xl dark:hover:shadow-black/40 hover:-translate-y-1 transition-all duration-300 card-lift">
      <Link href={`/customer/products/${product.id}`}>
        <div className="relative overflow-hidden aspect-square bg-[var(--surface2)]">
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
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </Link>
      <div className="p-3">
        <Link href={`/customer/products/${product.id}`}>
          <p className="font-bold text-[var(--text)] text-sm line-clamp-1 mb-1 hover:text-indigo-500 transition-colors">{product.name}</p>
        </Link>
        <div className="flex items-center gap-1 mb-2.5">
          <Star className="w-3 h-3 fill-amber-400 text-amber-400 flex-shrink-0" />
          <span className="text-[11px] text-[var(--text2)]">{product.rating} · {product.sold} terjual</span>
        </div>
        <div className="flex items-center justify-between gap-2">
          <div className="min-w-0">
            <p className="font-black text-[var(--text)] text-sm leading-none" style={{ fontFamily: "Cabinet Grotesk, sans-serif" }}>{formatRupiah(product.price)}</p>
            {product.originalPrice && <p className="text-[10px] text-[var(--text2)] line-through mt-0.5">{formatRupiah(product.originalPrice)}</p>}
          </div>
          <button onClick={handleAdd}
            className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-xl transition-all active:scale-90 shadow-sm ${
              flash ? "bg-emerald-500 scale-110 shadow-emerald-500/30" : "bg-gradient-to-br from-indigo-500 to-violet-500 hover:shadow-indigo-500/30 hover:shadow-md"
            } text-white`}>
            <ShoppingCart className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
