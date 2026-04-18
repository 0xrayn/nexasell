"use client";
import Link from "next/link";
import { ShoppingCart, Star } from "lucide-react";
import type { Product } from "@/data/products";
import { formatRupiah } from "@/lib/utils";
import { useCart } from "@/lib/CartContext";
import { useState } from "react";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const { addItem } = useCart();
  const [flash, setFlash] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product);
    setFlash(true);
    setTimeout(() => setFlash(false), 800);
  };

  return (
    <div className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-xl dark:hover:shadow-black/30 hover:-translate-y-1 transition-all duration-300">
      <Link href={`/customer/products/${product.id}`}>
        <div className="relative overflow-hidden bg-gray-100 dark:bg-gray-700 aspect-square">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {product.badge && (
            <span className={`absolute top-2 left-2 text-[11px] font-bold px-2 py-0.5 rounded-full ${
              product.badge === "Sale" ? "bg-red-500 text-white" :
              product.badge === "Best Seller" ? "bg-amber-500 text-white" :
              "bg-indigo-500 text-white"
            }`}>
              {product.badge}
            </span>
          )}
          {product.stock < 10 && (
            <span className="absolute top-2 right-2 text-[11px] font-medium bg-red-50 dark:bg-red-900/40 text-red-600 dark:text-red-400 px-2 py-0.5 rounded-full">
              {product.stock} left
            </span>
          )}
        </div>
      </Link>

      <div className="p-3">
        <Link href={`/customer/products/${product.id}`}>
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm leading-tight mb-1 line-clamp-1 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-1 mb-2">
          <Star className="w-3 h-3 fill-amber-400 text-amber-400 flex-shrink-0" />
          <span className="text-[11px] text-gray-500 dark:text-gray-400">{product.rating} · {product.sold} sold</span>
        </div>
        <div className="flex items-center justify-between gap-2">
          <div className="min-w-0">
            <p className="font-bold text-gray-900 dark:text-gray-100 text-sm leading-none">{formatRupiah(product.price)}</p>
            {product.originalPrice && (
              <p className="text-[11px] text-gray-400 line-through mt-0.5">{formatRupiah(product.originalPrice)}</p>
            )}
          </div>
          <button
            onClick={handleAdd}
            className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-xl transition-all active:scale-90 ${
              flash ? "bg-green-500 text-white scale-110" : "bg-indigo-600 hover:bg-indigo-700 text-white"
            }`}
          >
            <ShoppingCart className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
