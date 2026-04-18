"use client";
import Link from "next/link";
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, Tag } from "lucide-react";
import { useCart } from "@/lib/CartContext";
import { formatRupiah } from "@/lib/utils";
import Navbar from "@/components/ui/Navbar";

export default function CartPage() {
  const { items, removeItem, updateQuantity, total, clearCart, itemCount } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
        <Navbar />
        <div className="flex flex-col items-center justify-center h-[65vh] gap-4 px-4">
          <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
            <ShoppingBag className="w-10 h-10 text-gray-300 dark:text-gray-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-700 dark:text-gray-300">Your cart is empty</h2>
          <p className="text-sm text-gray-400 text-center max-w-xs">Looks like you haven&apos;t added anything yet. Start shopping to fill it up!</p>
          <Link href="/" className="mt-2 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl text-sm font-semibold transition-colors">
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-indigo-600 transition-colors mb-1 group">
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
              Continue Shopping
            </Link>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Shopping Cart <span className="text-gray-400 font-normal text-lg">({itemCount})</span></h1>
          </div>
          <button onClick={clearCart} className="text-xs text-red-400 hover:text-red-600 transition-colors font-medium">
            Clear all
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Items */}
          <div className="lg:col-span-2 space-y-3">
            {items.map((item) => (
              <div key={item.product.id} className="flex gap-4 bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-100 dark:border-gray-700 hover:shadow-sm transition-shadow">
                <Link href={`/customer/products/${item.product.id}`} className="flex-shrink-0">
                  <img src={item.product.image} alt={item.product.name} className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-xl" />
                </Link>
                <div className="flex-1 min-w-0">
                  <Link href={`/customer/products/${item.product.id}`}>
                    <p className="font-semibold text-gray-900 dark:text-gray-100 text-sm sm:text-base line-clamp-1 hover:text-indigo-600 transition-colors">{item.product.name}</p>
                  </Link>
                  <p className="text-xs text-gray-400 capitalize mt-0.5">{item.product.category}</p>
                  <p className="font-bold text-indigo-600 dark:text-indigo-400 text-sm mt-1">{formatRupiah(item.product.price)}</p>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-700 rounded-xl p-1">
                      <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white dark:hover:bg-gray-600 transition-colors active:scale-90">
                        <Minus className="w-3 h-3 text-gray-600 dark:text-gray-300" />
                      </button>
                      <span className="w-8 text-center text-sm font-bold text-gray-900 dark:text-gray-100">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} disabled={item.quantity >= item.product.stock} className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white dark:hover:bg-gray-600 transition-colors active:scale-90 disabled:opacity-40">
                        <Plus className="w-3 h-3 text-gray-600 dark:text-gray-300" />
                      </button>
                    </div>
                    <div className="flex items-center gap-3">
                      <p className="text-sm font-bold text-gray-900 dark:text-gray-100">{formatRupiah(item.product.price * item.quantity)}</p>
                      <button onClick={() => removeItem(item.product.id)} className="p-1.5 text-gray-300 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700 sticky top-20">
              <h2 className="font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                <Tag className="w-4 h-4 text-indigo-500" />
                Order Summary
              </h2>
              <div className="space-y-2 mb-4">
                {items.map((item) => (
                  <div key={item.product.id} className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                    <span className="line-clamp-1 flex-1 mr-2">{item.product.name} ×{item.quantity}</span>
                    <span className="font-medium flex-shrink-0">{formatRupiah(item.product.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-100 dark:border-gray-700 pt-3 space-y-2">
                <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                  <span>Subtotal ({itemCount} items)</span>
                  <span>{formatRupiah(total)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                  <span>Shipping</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-medium">Free 🎉</span>
                </div>
              </div>
              <div className="border-t border-gray-100 dark:border-gray-700 mt-3 pt-3 mb-5">
                <div className="flex justify-between font-bold text-gray-900 dark:text-gray-100 text-lg">
                  <span>Total</span>
                  <span className="text-indigo-600 dark:text-indigo-400">{formatRupiah(total)}</span>
                </div>
              </div>
              <Link href="/customer/checkout" className="block w-full bg-indigo-600 hover:bg-indigo-700 text-white text-center py-3.5 rounded-xl font-semibold text-sm transition-colors active:scale-95">
                Checkout →
              </Link>
              <Link href="/" className="block w-full text-center text-sm text-gray-500 hover:text-indigo-600 mt-3 transition-colors">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
