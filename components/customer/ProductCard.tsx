"use client";
import Link from "next/link";
import { ShoppingCart, Star, Heart } from "lucide-react";
import type { Product } from "@/data/products";
import { formatRupiah } from "@/lib/utils";
import { useCart } from "@/lib/CartContext";
import { useState } from "react";

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [flash, setFlash] = useState(false);
  const [liked, setLiked] = useState(false);
  const [hovered, setHovered] = useState(false);
  const discount = product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product);
    setFlash(true);
    setTimeout(() => setFlash(false), 600);
  };

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="rounded-2xl overflow-hidden transition-all duration-300 relative"
      style={{
        background: "var(--surface)",
        border: `1px solid ${hovered ? "rgba(99,102,241,0.25)" : "var(--border)"}`,
        boxShadow: hovered ? "0 16px 48px rgba(99,102,241,0.13), 0 4px 12px rgba(0,0,0,0.06)" : "0 1px 3px rgba(0,0,0,0.04)",
        transform: hovered ? "translateY(-5px)" : "translateY(0)",
      }}
    >
      <Link href={`/customer/products/${product.id}`}>
        <div className="relative overflow-hidden" style={{ aspectRatio: "1/1", background: "var(--surface2)" }}>
          <img src={product.image} alt={product.name} className="w-full h-full object-cover"
            style={{ transform: hovered ? "scale(1.08)" : "scale(1)", transition: "transform 0.55s cubic-bezier(0.4,0,0.2,1)" }} />

          {/* Gradient overlay */}
          <div className="absolute inset-0 pointer-events-none" style={{
            background: "linear-gradient(to top, rgba(0,0,0,0.42) 0%, transparent 55%)",
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.3s ease",
          }} />

          {/* Top-left badge */}
          {product.badge && (
            <div className="absolute top-2.5 left-2.5">
              <span className="text-[10px] font-black px-2 py-1 rounded-full text-white"
                style={{
                  background: product.badge === "Sale" ? "linear-gradient(135deg,#ef4444,#dc2626)"
                    : product.badge === "Best Seller" ? "linear-gradient(135deg,#f59e0b,#d97706)"
                    : "linear-gradient(135deg,#6366f1,#7c3aed)",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                }}>
                {product.badge}
              </span>
            </div>
          )}

          {/* Discount pill */}
          {discount > 0 && (
            <div className="absolute top-2.5 right-2.5">
              <span className="text-[10px] font-black px-1.5 py-0.5 rounded-md text-white"
                style={{ background: "#ef4444" }}>-{discount}%</span>
            </div>
          )}

          {/* Wishlist button — slides up on hover */}
          <button onClick={e => { e.preventDefault(); setLiked(l => !l); }}
            className="absolute bottom-2.5 right-2.5 w-7 h-7 rounded-xl flex items-center justify-center transition-all duration-200"
            style={{
              background: "rgba(255,255,255,0.92)",
              backdropFilter: "blur(6px)",
              opacity: hovered ? 1 : 0,
              transform: hovered ? "translateY(0)" : "translateY(6px)",
              boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            }}>
            <Heart className="w-3 h-3" style={{ fill: liked ? "#ef4444" : "none", color: liked ? "#ef4444" : "#374151" }} />
          </button>

          {/* Stock warning */}
          {product.stock < 10 && (
            <div className="absolute bottom-2.5 left-2.5"
              style={{ opacity: hovered ? 1 : 0, transition: "opacity 0.2s ease" }}>
              <span className="text-[9px] font-black px-2 py-0.5 rounded-full text-white"
                style={{ background: "rgba(239,68,68,0.85)", backdropFilter: "blur(4px)" }}>
                Sisa {product.stock}
              </span>
            </div>
          )}
        </div>
      </Link>

      <div className="p-3.5">
        <Link href={`/customer/products/${product.id}`}>
          <p className="font-semibold text-sm line-clamp-2 mb-1.5 transition-colors duration-200 leading-snug"
            style={{ color: hovered ? "#6366f1" : "var(--text)", minHeight: "2.5rem" }}>
            {product.name}
          </p>
        </Link>

        {/* Stars */}
        <div className="flex items-center gap-1.5 mb-2.5">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-2.5 h-2.5" style={{
                fill: i < Math.floor(product.rating) ? "#fbbf24" : "none",
                color: i < Math.floor(product.rating) ? "#fbbf24" : "var(--text3)",
              }} />
            ))}
          </div>
          <span className="text-[10px] font-medium" style={{ color: "var(--text3)" }}>
            {product.rating} <span style={{ color: "var(--text3)" }}>({product.sold} terjual)</span>
          </span>
        </div>

        {/* Price row */}
        <div className="flex items-end justify-between gap-2">
          <div>
            <p className="font-black text-sm leading-none" style={{ color: "var(--text)", fontFamily: "Outfit, sans-serif" }}>
              {formatRupiah(product.price)}
            </p>
            {product.originalPrice && (
              <p className="text-[10px] line-through mt-0.5 font-medium" style={{ color: "var(--text3)" }}>
                {formatRupiah(product.originalPrice)}
              </p>
            )}
          </div>
          <button onClick={handleAdd}
            className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center text-white transition-all duration-200 active:scale-90"
            style={{
              background: flash ? "linear-gradient(135deg,#10b981,#059669)" : "linear-gradient(135deg,#6366f1,#7c3aed)",
              boxShadow: flash ? "0 4px 14px rgba(16,185,129,0.4)" : "0 4px 14px rgba(99,102,241,0.3)",
              transform: flash ? "scale(1.12)" : "scale(1)",
            }}>
            <ShoppingCart className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
