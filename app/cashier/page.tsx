"use client";
import { useState, useMemo } from "react";
import { Search, Trash2, Plus, Minus, CreditCard, Banknote, X, CheckCircle, ShoppingCart, RefreshCcw, Smartphone } from "lucide-react";
import { products, categories } from "@/data/products";
import type { Product } from "@/data/products";
import { formatRupiah } from "@/lib/utils";

interface POSItem { product: Product; quantity: number; }

export default function CashierPOS() {
  const [cart, setCart] = useState<POSItem[]>([]);
  const [search, setSearch] = useState("");
  const [activeCat, setActiveCat] = useState("all");
  const [cash, setCash] = useState("");
  const [payMethod, setPayMethod] = useState<"cash"|"card"|"ewallet">("cash");
  const [paid, setPaid] = useState(false);
  const [lastChange, setLastChange] = useState(0);
  const [lastTotal, setLastTotal] = useState(0);
  const [cartOpen, setCartOpen] = useState(false);

  const filtered = useMemo(() => {
    let list = products;
    if (activeCat !== "all") list = list.filter(p => p.category === activeCat);
    if (search) list = list.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
    return list;
  }, [search, activeCat]);

  const addToCart = (p: Product) => setCart(prev => {
    const ex = prev.find(i => i.product.id === p.id);
    if (ex) return prev.map(i => i.product.id === p.id ? { ...i, quantity: i.quantity + 1 } : i);
    return [...prev, { product: p, quantity: 1 }];
  });

  const updateQty = (id: string, qty: number) => {
    if (qty <= 0) setCart(prev => prev.filter(i => i.product.id !== id));
    else setCart(prev => prev.map(i => i.product.id === id ? { ...i, quantity: qty } : i));
  };

  const total = cart.reduce((s, i) => s + i.product.price * i.quantity, 0);
  const itemCount = cart.reduce((s, i) => s + i.quantity, 0);
  const cashNum = parseFloat(cash.replace(/\D/g, "")) || 0;
  const change = cashNum - total;
  const canPay = cart.length > 0 && (payMethod !== "cash" || cashNum >= total);

  const handlePay = () => {
    if (!canPay) return;
    setLastChange(change); setLastTotal(total); setPaid(true); setCartOpen(false);
  };
  const handleReset = () => { setCart([]); setCash(""); setPaid(false); };

  const quickCash = [50000, 100000, 150000, 200000];

  const CartPanel = () => (
    <div className="flex flex-col h-full bg-white dark:bg-[#0a101e]">
      <div className="flex items-center justify-between p-4 border-b border-black/[0.06] dark:border-white/[0.06]">
        <div className="flex items-center gap-2">
          <ShoppingCart className="w-4 h-4 text-emerald-500" />
          <span className="font-bold text-sm text-gray-900 dark:text-white">Order</span>
          {itemCount > 0 && <span className="bg-emerald-500 text-white text-[10px] font-black rounded-full w-5 h-5 flex items-center justify-center">{itemCount}</span>}
        </div>
        <div className="flex items-center gap-2">
          {cart.length > 0 && <button onClick={() => setCart([])} className="flex items-center gap-1 text-xs text-red-400 hover:text-red-600 font-semibold"><X className="w-3 h-3" />Clear</button>}
          <button onClick={() => setCartOpen(false)} className="lg:hidden w-7 h-7 flex items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-white/[0.06] text-gray-400"><X className="w-4 h-4" /></button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {cart.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-gray-300 dark:text-gray-600 gap-2 pb-10">
            <ShoppingCart className="w-10 h-10" />
            <p className="text-xs text-center text-gray-400">Tap product to add</p>
          </div>
        )}
        {cart.map(item => (
          <div key={item.product.id} className="flex items-center gap-2 bg-gray-50 dark:bg-white/[0.04] rounded-xl p-2.5">
            <img src={item.product.image} alt={item.product.name} className="w-10 h-10 object-cover rounded-lg flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-gray-900 dark:text-gray-100 line-clamp-1">{item.product.name}</p>
              <p className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">{formatRupiah(item.product.price)}</p>
            </div>
            <div className="flex items-center gap-1 flex-shrink-0">
              <button onClick={() => updateQty(item.product.id, item.quantity - 1)} className="w-6 h-6 flex items-center justify-center rounded-lg bg-gray-200 dark:bg-white/[0.1] hover:bg-red-100 dark:hover:bg-red-500/20 hover:text-red-500 transition-colors">
                <Minus className="w-3 h-3" />
              </button>
              <span className="w-6 text-center text-xs font-black text-gray-900 dark:text-white">{item.quantity}</span>
              <button onClick={() => updateQty(item.product.id, item.quantity + 1)} disabled={item.quantity >= item.product.stock} className="w-6 h-6 flex items-center justify-center rounded-lg bg-gray-200 dark:bg-white/[0.1] hover:bg-emerald-100 dark:hover:bg-emerald-500/20 hover:text-emerald-600 transition-colors disabled:opacity-30">
                <Plus className="w-3 h-3" />
              </button>
              <button onClick={() => updateQty(item.product.id, 0)} className="w-6 h-6 flex items-center justify-center rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10 text-gray-300 hover:text-red-400 transition-colors">
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-black/[0.06] dark:border-white/[0.06] p-4 space-y-3">
        <div className="flex justify-between">
          <span className="text-xs text-gray-400">Subtotal</span>
          <span className="font-black text-gray-900 dark:text-white" style={{ fontFamily: 'Syne, sans-serif' }}>{formatRupiah(total)}</span>
        </div>

        <div className="grid grid-cols-3 gap-1.5">
          {([["cash","Cash",Banknote],["card","Card",CreditCard],["ewallet","E-Pay",Smartphone]] as const).map(([val,label,Icon]) => (
            <button key={val} onClick={() => setPayMethod(val)}
              className={`flex flex-col items-center gap-1 py-2 rounded-xl text-[10px] font-bold border-2 transition-all ${payMethod===val ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400" : "border-gray-200 dark:border-white/[0.08] text-gray-400 hover:border-gray-300"}`}>
              <Icon className="w-4 h-4" />{label}
            </button>
          ))}
        </div>

        {payMethod === "cash" && (
          <div className="space-y-2">
            <input type="number" value={cash} onChange={e => setCash(e.target.value)} placeholder="Cash received (Rp)..."
              className="w-full px-3 py-2.5 rounded-xl border border-black/[0.08] dark:border-white/[0.08] bg-gray-50 dark:bg-white/[0.04] text-sm font-semibold outline-none focus:ring-2 focus:ring-emerald-500/50 text-gray-900 dark:text-gray-100" />
            <div className="grid grid-cols-4 gap-1">
              {quickCash.map(amt => (
                <button key={amt} onClick={() => setCash(String(amt))}
                  className="py-1.5 text-[10px] font-bold bg-gray-100 dark:bg-white/[0.06] hover:bg-emerald-100 dark:hover:bg-emerald-500/20 hover:text-emerald-700 dark:hover:text-emerald-400 rounded-lg transition-colors text-gray-600 dark:text-gray-400">
                  {amt/1000}K
                </button>
              ))}
            </div>
            {cashNum > 0 && total > 0 && (
              <div className={`flex justify-between p-2.5 rounded-xl text-sm font-bold ${change >= 0 ? "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400" : "bg-red-50 dark:bg-red-500/10 text-red-600"}`}>
                <span className="text-xs font-semibold">{change >= 0 ? "Change" : "Short"}</span>
                <span>{formatRupiah(Math.abs(change))}</span>
              </div>
            )}
          </div>
        )}
        {payMethod !== "cash" && (
          <div className="p-3 bg-blue-50 dark:bg-blue-500/10 rounded-xl text-center">
            <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold">
              {payMethod === "card" ? "💳 Tap or swipe card" : "📱 Scan QR code"}
            </p>
          </div>
        )}

        <button onClick={handlePay} disabled={!canPay}
          className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 disabled:opacity-40 disabled:cursor-not-allowed text-white font-black text-sm transition-all active:scale-95 shadow-md shadow-emerald-500/20 flex items-center justify-center gap-2">
          <CreditCard className="w-4 h-4" />
          {cart.length === 0 ? "Select Products" : `Pay ${formatRupiah(total)}`}
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex overflow-hidden bg-[var(--background)]" style={{ height: "calc(100vh - 56px)" }}>
      {/* Products panel */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Top bar */}
        <div className="bg-white dark:bg-[#0a101e] border-b border-black/[0.06] dark:border-white/[0.06] p-3 sm:p-4 space-y-3 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="hidden lg:block flex-shrink-0">
              <h1 className="text-base font-black text-gray-900 dark:text-white" style={{ fontFamily: 'Syne, sans-serif' }}>POS Terminal</h1>
              <p className="text-[11px] text-gray-400">{new Date().toLocaleDateString("id-ID", { weekday:"long", day:"numeric", month:"long" })}</p>
            </div>
            <div className="relative flex-1 min-w-0">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
              <input type="text" placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-black/[0.08] dark:border-white/[0.08] bg-gray-50 dark:bg-white/[0.04] text-sm outline-none focus:ring-2 focus:ring-emerald-500/50 text-gray-900 dark:text-gray-100" />
            </div>
            {/* Mobile cart toggle */}
            <button onClick={() => setCartOpen(true)} className="lg:hidden relative flex-shrink-0 w-10 h-10 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center">
              <ShoppingCart className="w-4 h-4" />
              {itemCount > 0 && <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] font-black rounded-full w-4 h-4 flex items-center justify-center">{itemCount}</span>}
            </button>
          </div>
          <div className="flex gap-1.5 overflow-x-auto pb-0.5 scrollbar-none">
            {categories.map(cat => (
              <button key={cat.id} onClick={() => setActiveCat(cat.id)}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex-shrink-0 ${activeCat===cat.id ? "bg-emerald-600 text-white shadow-sm" : "bg-gray-100 dark:bg-white/[0.06] text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-white/[0.1]"}`}>
                {cat.icon}<span className="hidden sm:inline ml-0.5">{cat.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="flex-1 overflow-y-auto p-3">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-2.5">
            {filtered.map(p => {
              const inCart = cart.find(i => i.product.id === p.id);
              return (
                <button key={p.id} onClick={() => addToCart(p)}
                  className={`relative text-left bg-white dark:bg-[var(--card)] rounded-2xl border-2 transition-all hover:shadow-lg active:scale-95 overflow-hidden ${inCart ? "border-emerald-500" : "border-transparent shadow-sm hover:border-gray-200 dark:hover:border-white/[0.1]"}`}>
                  <div className="aspect-square overflow-hidden bg-gray-100 dark:bg-white/[0.04]">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                  </div>
                  <div className="p-2.5">
                    <p className="text-xs font-bold text-gray-900 dark:text-gray-100 line-clamp-1 mb-0.5">{p.name}</p>
                    <p className="text-[11px] font-black text-emerald-600 dark:text-emerald-400">{formatRupiah(p.price)}</p>
                    <p className="text-[9px] text-gray-400 mt-0.5">Stok: {p.stock}</p>
                  </div>
                  {inCart && (
                    <div className="absolute top-2 right-2 w-6 h-6 bg-emerald-500 text-white text-[11px] font-black rounded-full flex items-center justify-center shadow-lg">
                      {inCart.quantity}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
          {filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center h-48 gap-2 text-gray-300 dark:text-gray-700">
              <Search className="w-10 h-10" />
              <p className="text-sm text-gray-400">No products found</p>
            </div>
          )}
        </div>
      </div>

      {/* Desktop cart */}
      <div className="hidden lg:flex flex-col w-72 xl:w-80 border-l border-black/[0.06] dark:border-white/[0.06] flex-shrink-0">
        <CartPanel />
      </div>

      {/* Mobile cart drawer */}
      {cartOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setCartOpen(false)} />
          <div className="relative ml-auto w-80 max-w-[90vw] h-full shadow-2xl"><CartPanel /></div>
        </div>
      )}

      {/* Success modal */}
      {paid && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
          <div className="bg-white dark:bg-[var(--card)] rounded-3xl p-7 max-w-xs w-full text-center shadow-2xl animate-slide-up">
            <div className="relative w-16 h-16 mx-auto mb-4">
              <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-500/10 rounded-full flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
              </div>
            </div>
            <h3 className="text-xl font-black text-gray-900 dark:text-white mb-1" style={{ fontFamily: 'Syne, sans-serif' }}>Payment Done!</h3>
            <p className="text-xs text-gray-400 mb-4">Transaction completed</p>
            <div className="bg-gray-50 dark:bg-white/[0.04] rounded-2xl p-3 mb-5 text-left space-y-2">
              <div className="flex justify-between text-sm"><span className="text-gray-400">Total</span><span className="font-black text-gray-900 dark:text-white">{formatRupiah(lastTotal)}</span></div>
              <div className="flex justify-between text-sm"><span className="text-gray-400">Method</span><span className="font-semibold capitalize text-gray-700 dark:text-gray-300">{payMethod}</span></div>
              {payMethod === "cash" && <div className="flex justify-between text-sm border-t border-black/[0.06] dark:border-white/[0.06] pt-2"><span className="text-gray-400">Change</span><span className="font-black text-emerald-600 dark:text-emerald-400">{formatRupiah(lastChange)}</span></div>}
            </div>
            <button onClick={handleReset} className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-black text-sm flex items-center justify-center gap-2 transition-all active:scale-95">
              <RefreshCcw className="w-4 h-4" />New Transaction
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
