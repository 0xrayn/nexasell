"use client";
import Link from "next/link";
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, Tag, Sparkles } from "lucide-react";
import { useCart } from "@/lib/CartContext";
import { formatRupiah } from "@/lib/utils";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";

export default function CartPage() {
  const { items, removeItem, updateQuantity, total, clearCart, itemCount } = useCart();

  if (items.length === 0) return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      <Navbar />
      <div className="flex-1 flex flex-col items-center justify-center gap-5 px-4">
        <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-indigo-100 to-violet-100 dark:from-indigo-500/10 dark:to-violet-500/10 flex items-center justify-center shadow-xl">
          <ShoppingBag className="w-10 h-10 text-indigo-400" />
        </div>
        <div className="text-center">
          <h2 className="text-xl font-black text-gray-700 dark:text-gray-300 mb-1" style={{ fontFamily: "Syne, sans-serif" }}>Keranjang Kosong</h2>
          <p className="text-sm text-gray-400">Belum ada produk yang ditambahkan.</p>
        </div>
        <Link href="/" className="bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600 text-white px-8 py-3 rounded-2xl text-sm font-bold transition-all shadow-lg shadow-indigo-500/25 active:scale-95">
          Mulai Belanja
        </Link>
      </div>
      <Footer />
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      <Navbar />

      <div className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-indigo-500 transition-colors mb-1 group">
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
              Lanjut Belanja
            </Link>
            <h1 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white" style={{ fontFamily: "Syne, sans-serif" }}>
              Keranjang <span className="text-gray-400 font-normal text-base">({itemCount} item)</span>
            </h1>
          </div>
          <button onClick={clearCart} className="text-xs text-red-400 hover:text-red-600 font-semibold transition-colors px-3 py-1.5 rounded-xl hover:bg-red-50 dark:hover:bg-red-500/10">
            Hapus Semua
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Items */}
          <div className="lg:col-span-2 space-y-3">
            {items.map(item => (
              <div key={item.product.id} className="group flex gap-4 bg-white dark:bg-[var(--card)] rounded-2xl p-4 border border-black/[0.06] dark:border-white/[0.06] hover:shadow-md dark:hover:shadow-black/20 transition-all">
                <Link href={`/customer/products/${item.product.id}`} className="flex-shrink-0">
                  <img src={item.product.image} alt={item.product.name} className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-2xl group-hover:opacity-90 transition-opacity" />
                </Link>
                <div className="flex-1 min-w-0">
                  <Link href={`/customer/products/${item.product.id}`}>
                    <p className="font-bold text-gray-900 dark:text-gray-100 text-sm line-clamp-1 hover:text-indigo-500 transition-colors">{item.product.name}</p>
                  </Link>
                  <p className="text-[11px] text-gray-400 capitalize mt-0.5 mb-1">{item.product.category}</p>
                  <p className="font-black text-indigo-500 text-sm" style={{ fontFamily: "Syne, sans-serif" }}>{formatRupiah(item.product.price)}</p>
                  <div className="flex items-center justify-between mt-3 flex-wrap gap-2">
                    <div className="flex items-center gap-1 bg-gray-100 dark:bg-white/[0.06] rounded-xl p-0.5">
                      <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white dark:hover:bg-white/[0.1] transition-colors active:scale-90">
                        <Minus className="w-3 h-3 text-gray-500" />
                      </button>
                      <span className="w-7 text-center text-sm font-black text-gray-900 dark:text-white">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} disabled={item.quantity >= item.product.stock} className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white dark:hover:bg-white/[0.1] transition-colors active:scale-90 disabled:opacity-30">
                        <Plus className="w-3 h-3 text-gray-500" />
                      </button>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-black text-gray-900 dark:text-white">{formatRupiah(item.product.price * item.quantity)}</span>
                      <button onClick={() => removeItem(item.product.id)} className="w-7 h-7 flex items-center justify-center rounded-xl hover:bg-red-50 dark:hover:bg-red-500/10 text-gray-300 hover:text-red-400 transition-colors">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div>
            <div className="bg-white dark:bg-[var(--card)] rounded-2xl p-5 border border-black/[0.06] dark:border-white/[0.06] sticky top-20">
              <h2 className="font-black text-gray-900 dark:text-white mb-1 flex items-center gap-2 text-sm" style={{ fontFamily: "Syne, sans-serif" }}>
                <Tag className="w-4 h-4 text-indigo-500" />
                Ringkasan Pesanan
              </h2>
              <div className="space-y-1.5 mb-4 max-h-40 overflow-y-auto mt-3">
                {items.map(item => (
                  <div key={item.product.id} className="flex justify-between text-xs text-gray-400">
                    <span className="line-clamp-1 flex-1 mr-2">{item.product.name} ×{item.quantity}</span>
                    <span className="font-semibold flex-shrink-0">{formatRupiah(item.product.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-black/[0.06] dark:border-white/[0.06] pt-3 space-y-2">
                <div className="flex justify-between text-sm text-gray-400">
                  <span>Subtotal</span><span>{formatRupiah(total)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-400">
                  <span>Ongkos Kirim</span>
                  <span className="font-semibold text-emerald-500 flex items-center gap-1"><Sparkles className="w-3 h-3" />Gratis</span>
                </div>
              </div>
              <div className="border-t border-black/[0.06] dark:border-white/[0.06] mt-3 pt-3 mb-5">
                <div className="flex justify-between font-black text-gray-900 dark:text-white text-lg" style={{ fontFamily: "Syne, sans-serif" }}>
                  <span>Total</span>
                  <span className="text-indigo-500">{formatRupiah(total)}</span>
                </div>
              </div>
              <Link href="/customer/checkout" className="block w-full bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600 text-white text-center py-3.5 rounded-2xl font-bold text-sm transition-all shadow-lg shadow-indigo-500/25 active:scale-95">
                Checkout →
              </Link>
              <Link href="/" className="block w-full text-center text-xs text-gray-400 hover:text-indigo-500 mt-3 transition-colors font-medium">
                Lanjut Belanja
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
