"use client";
import { useState, useMemo } from "react";
import { Search, Trash2, Plus, Minus, CreditCard, Banknote, X, CheckCircle, ShoppingCart, RefreshCcw } from "lucide-react";
import { products, categories } from "@/data/products";
import type { Product } from "@/data/products";
import { formatRupiah } from "@/lib/utils";

interface POSItem { product: Product; quantity: number; }

export default function CashierPOS() {
  const [cart, setCart] = useState<POSItem[]>([]);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [cash, setCash] = useState("");
  const [payMethod, setPayMethod] = useState<"cash" | "card" | "ewallet">("cash");
  const [paid, setPaid] = useState(false);
  const [lastChange, setLastChange] = useState(0);
  const [lastTotal, setLastTotal] = useState(0);

  const filtered = useMemo(() => {
    let list = products;
    if (activeCategory !== "all") list = list.filter((p) => p.category === activeCategory);
    if (search) list = list.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));
    return list;
  }, [search, activeCategory]);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const ex = prev.find((i) => i.product.id === product.id);
      if (ex) return prev.map((i) => i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i);
      return [...prev, { product, quantity: 1 }];
    });
  };

  const updateQty = (id: string, qty: number) => {
    if (qty <= 0) setCart((prev) => prev.filter((i) => i.product.id !== id));
    else setCart((prev) => prev.map((i) => i.product.id === id ? { ...i, quantity: qty } : i));
  };

  const total = cart.reduce((s, i) => s + i.product.price * i.quantity, 0);
  const itemCount = cart.reduce((s, i) => s + i.quantity, 0);
  const cashNum = parseFloat(cash.replace(/[^0-9]/g, "")) || 0;
  const change = cashNum - total;
  const canPay = cart.length > 0 && (payMethod !== "cash" || cashNum >= total);

  const handlePay = () => {
    if (!canPay) return;
    setLastChange(change);
    setLastTotal(total);
    setPaid(true);
  };

  const handleReset = () => {
    setCart([]);
    setCash("");
    setPaid(false);
    setLastChange(0);
  };

  const quickCash = [50000, 100000, 150000, 200000];

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-950">
      {/* ── LEFT: Product Grid ── */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 p-3 sm:p-4 space-y-3">
          <div className="flex items-center gap-3">
            <div className="hidden lg:block">
              <h1 className="text-base font-bold text-gray-900 dark:text-gray-100">POS Terminal</h1>
              <p className="text-xs text-gray-400">{new Date().toLocaleDateString("id-ID", { weekday:"long", year:"numeric", month:"long", day:"numeric" })}</p>
            </div>
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search product..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-sm outline-none focus:ring-2 focus:ring-emerald-500 text-gray-900 dark:text-gray-100"
              />
            </div>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-0.5">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex-shrink-0 ${
                  activeCategory === cat.id
                    ? "bg-emerald-600 text-white"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                {cat.icon} {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Products */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 xl:grid-cols-4 gap-2.5">
            {filtered.map((p) => {
              const inCart = cart.find((i) => i.product.id === p.id);
              return (
                <button
                  key={p.id}
                  onClick={() => addToCart(p)}
                  className={`relative text-left bg-white dark:bg-gray-800 rounded-xl border-2 transition-all hover:shadow-md active:scale-95 overflow-hidden ${
                    inCart ? "border-emerald-500 shadow-emerald-100 dark:shadow-emerald-900/20 shadow-md" : "border-gray-100 dark:border-gray-700"
                  }`}
                >
                  <div className="aspect-square overflow-hidden bg-gray-100 dark:bg-gray-700">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                  </div>
                  <div className="p-2.5">
                    <p className="text-xs font-semibold text-gray-900 dark:text-gray-100 line-clamp-1 mb-0.5">{p.name}</p>
                    <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400">{formatRupiah(p.price)}</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">Stock: {p.stock}</p>
                  </div>
                  {inCart && (
                    <div className="absolute top-2 right-2 w-6 h-6 bg-emerald-500 text-white text-xs rounded-full flex items-center justify-center font-bold shadow-md">
                      {inCart.quantity}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
          {filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center h-48 gap-2 text-gray-400">
              <Search className="w-10 h-10 opacity-30" />
              <p className="text-sm">No products found</p>
            </div>
          )}
        </div>
      </div>

      {/* ── RIGHT: Cart & Payment ── */}
      <div className="w-72 xl:w-80 flex flex-col bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-700">
        {/* Cart Header */}
        <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span className="font-bold text-gray-900 dark:text-gray-100 text-sm">Order</span>
            {itemCount > 0 && (
              <span className="bg-emerald-600 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">{itemCount}</span>
            )}
          </div>
          {cart.length > 0 && (
            <button onClick={() => setCart([])} className="flex items-center gap-1 text-xs text-red-400 hover:text-red-600 transition-colors font-medium">
              <X className="w-3 h-3" />Clear
            </button>
          )}
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {cart.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-gray-300 dark:text-gray-600 gap-3 pb-8">
              <ShoppingCart className="w-12 h-12" />
              <p className="text-sm text-center text-gray-400">Tap a product to add it here</p>
            </div>
          )}
          {cart.map((item) => (
            <div key={item.product.id} className="flex items-center gap-2.5 bg-gray-50 dark:bg-gray-800 rounded-xl p-2.5">
              <img src={item.product.image} alt={item.product.name} className="w-11 h-11 object-cover rounded-lg flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-gray-900 dark:text-gray-100 line-clamp-1">{item.product.name}</p>
                <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400">{formatRupiah(item.product.price)}</p>
                <p className="text-[10px] text-gray-400">{formatRupiah(item.product.price * item.quantity)}</p>
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                <button onClick={() => updateQty(item.product.id, item.quantity - 1)} className="w-6 h-6 flex items-center justify-center rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-red-100 dark:hover:bg-red-900/30 hover:text-red-600 transition-colors">
                  <Minus className="w-3 h-3" />
                </button>
                <span className="w-6 text-center text-xs font-bold text-gray-900 dark:text-gray-100">{item.quantity}</span>
                <button onClick={() => updateQty(item.product.id, item.quantity + 1)} disabled={item.quantity >= item.product.stock} className="w-6 h-6 flex items-center justify-center rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 hover:text-emerald-600 transition-colors disabled:opacity-40">
                  <Plus className="w-3 h-3" />
                </button>
                <button onClick={() => updateQty(item.product.id, 0)} className="ml-0.5 w-6 h-6 flex items-center justify-center rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-gray-300 hover:text-red-500 transition-colors">
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Payment Panel */}
        <div className="border-t border-gray-100 dark:border-gray-700 p-4 space-y-3">
          {/* Subtotal */}
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-500 dark:text-gray-400">Subtotal ({itemCount} items)</span>
            <span className="text-base font-bold text-gray-900 dark:text-gray-100">{formatRupiah(total)}</span>
          </div>

          {/* Payment Method */}
          <div className="grid grid-cols-3 gap-1.5">
            {([["cash", "Cash", Banknote], ["card", "Card", CreditCard], ["ewallet", "E-Wallet", CreditCard]] as const).map(([val, label, Icon]) => (
              <button
                key={val}
                onClick={() => setPayMethod(val)}
                className={`flex flex-col items-center gap-1 py-2 rounded-xl text-[10px] font-semibold border-2 transition-all ${
                  payMethod === val
                    ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400"
                    : "border-gray-200 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:border-gray-300"
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </div>

          {payMethod === "cash" && (
            <div className="space-y-2">
              <div>
                <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Cash Received (Rp)</label>
                <input
                  type="number"
                  value={cash}
                  onChange={(e) => setCash(e.target.value)}
                  placeholder="Enter amount..."
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-sm font-semibold outline-none focus:ring-2 focus:ring-emerald-500 text-gray-900 dark:text-gray-100"
                />
              </div>
              {/* Quick cash buttons */}
              <div className="grid grid-cols-4 gap-1">
                {quickCash.map((amt) => (
                  <button
                    key={amt}
                    onClick={() => setCash(amt.toString())}
                    className="py-1.5 text-[10px] font-semibold bg-gray-100 dark:bg-gray-700 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 hover:text-emerald-700 dark:hover:text-emerald-400 rounded-lg transition-colors text-gray-600 dark:text-gray-400"
                  >
                    {(amt / 1000)}K
                  </button>
                ))}
              </div>
              {cashNum > 0 && total > 0 && (
                <div className={`flex justify-between items-center p-2.5 rounded-xl text-sm font-bold ${
                  change >= 0
                    ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400"
                    : "bg-red-50 dark:bg-red-900/20 text-red-600"
                }`}>
                  <span className="text-xs font-semibold">{change >= 0 ? "Change" : "Needs more"}</span>
                  <span>{formatRupiah(Math.abs(change))}</span>
                </div>
              )}
            </div>
          )}

          {payMethod !== "cash" && (
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl text-center">
              <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                {payMethod === "card" ? "💳 Swipe or tap card to proceed" : "📱 Scan QR / open e-wallet app"}
              </p>
            </div>
          )}

          <button
            onClick={handlePay}
            disabled={!canPay}
            className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-sm transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <CreditCard className="w-4 h-4" />
            {cart.length === 0 ? "Select Products First" : payMethod === "cash" && cashNum < total && cashNum > 0 ? "Insufficient Cash" : `Pay ${formatRupiah(total)}`}
          </button>
        </div>
      </div>

      {/* ── Success Modal ── */}
      {paid && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-7 max-w-xs w-full text-center shadow-2xl">
            <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-9 h-9 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-1">Payment Successful!</h3>
            <p className="text-xs text-gray-500 mb-4">Transaction completed</p>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-3 mb-5 text-left space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Total</span>
                <span className="font-bold text-gray-900 dark:text-gray-100">{formatRupiah(lastTotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Method</span>
                <span className="font-semibold text-gray-900 dark:text-gray-100 capitalize">{payMethod}</span>
              </div>
              {payMethod === "cash" && (
                <div className="flex justify-between text-sm border-t border-gray-200 dark:border-gray-600 pt-2">
                  <span className="text-gray-500">Change</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">{formatRupiah(lastChange)}</span>
                </div>
              )}
            </div>
            <button
              onClick={handleReset}
              className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm transition-colors flex items-center justify-center gap-2"
            >
              <RefreshCcw className="w-4 h-4" />
              New Transaction
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
