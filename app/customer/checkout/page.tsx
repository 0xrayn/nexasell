"use client";
import { useState } from "react";
import { CheckCircle, ArrowLeft, CreditCard, Banknote, Wallet, Smartphone, Loader2 } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/lib/CartContext";
import { formatRupiah } from "@/lib/utils";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";

const payMethods = [
  { value: "transfer", label: "Bank Transfer", icon: Banknote },
  { value: "cod", label: "Cash on Delivery", icon: Banknote },
  { value: "ewallet", label: "E-Wallet", icon: Wallet },
  { value: "card", label: "Credit Card", icon: CreditCard },
  { value: "qris", label: "QRIS", icon: Smartphone },
];

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [orderName, setOrderName] = useState("");
  const [payMethod, setPayMethod] = useState("transfer");
  const [form, setForm] = useState({ name:"", phone:"", address:"", city:"", notes:"", payment:"transfer" });
  const [errors, setErrors] = useState<Record<string,string>>({});

  const validate = () => {
    const e: Record<string,string> = {};
    if (!form.name.trim()) e.name = "Wajib diisi";
    if (!form.phone.trim()) e.phone = "Wajib diisi";
    if (!form.address.trim()) e.address = "Wajib diisi";
    if (!form.city.trim()) e.city = "Wajib diisi";
    return e;
  };

  const upd = (f: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(p => ({ ...p, [f]: e.target.value }));
    if (errors[f]) setErrors(er => { const n={...er}; delete n[f]; return n; });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    setOrderName(form.name);
    setPayMethod(form.payment);
    setTimeout(() => { setLoading(false); setSuccess(true); clearCart(); }, 1500);
  };

  const Field = ({ field, label, placeholder="", type="text", required=false }: { field:string; label:string; placeholder?:string; type?:string; required?:boolean }) => (
    <div>
      <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 mb-1.5">
        {label}{required && <span className="text-red-400 ml-0.5">*</span>}
      </label>
      <input type={type} value={(form as Record<string,string>)[field]} onChange={upd(field)} placeholder={placeholder}
        className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-all bg-gray-50 dark:bg-white/[0.04] text-gray-900 dark:text-gray-100 ${
          errors[field] ? "border-red-400 focus:ring-2 focus:ring-red-300/50" : "border-black/[0.08] dark:border-white/[0.08] focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-400"
        }`} />
      {errors[field] && <p className="text-xs text-red-400 mt-1">{errors[field]}</p>}
    </div>
  );

  if (success) return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      <Navbar />
      <div className="flex-1 flex flex-col items-center justify-center gap-6 px-4 text-center py-16">
        <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-3xl flex items-center justify-center shadow-2xl shadow-emerald-500/30 animate-float">
          <CheckCircle className="w-12 h-12 text-white" />
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white mb-2" style={{ fontFamily: "Syne, sans-serif" }}>Pesanan Berhasil! 🎉</h1>
          <p className="text-sm text-gray-400 max-w-sm">Terima kasih, <span className="font-bold text-gray-700 dark:text-gray-300">{orderName}</span>! Pesananmu sedang diproses.</p>
        </div>
        <div className="bg-white dark:bg-[var(--surface)] rounded-2xl p-5 border border-black/[0.06] dark:border-white/[0.06] w-full max-w-xs space-y-3">
          <div className="flex justify-between text-sm"><span className="text-gray-400">Order ID</span><span className="font-mono font-bold text-gray-900 dark:text-white">#ORD{Date.now().toString().slice(-6)}</span></div>
          <div className="flex justify-between text-sm"><span className="text-gray-400">Pembayaran</span><span className="font-semibold capitalize text-gray-700 dark:text-gray-300">{payMethod}</span></div>
          <div className="flex justify-between font-black border-t border-black/[0.06] dark:border-white/[0.06] pt-3" style={{ fontFamily: "Syne, sans-serif" }}>
            <span className="text-gray-400 font-normal text-sm">Total</span>
            <span className="text-indigo-500">{formatRupiah(total)}</span>
          </div>
        </div>
        <Link href="/" className="bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600 text-white px-8 py-3 rounded-2xl font-bold text-sm transition-all shadow-lg shadow-indigo-500/25">
          Lanjut Belanja
        </Link>
      </div>
      <Footer />
    </div>
  );

  if (items.length === 0) return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      <Navbar />
      <div className="flex-1 flex flex-col items-center justify-center gap-4">
        <p className="text-gray-400">Tidak ada item untuk di-checkout.</p>
        <Link href="/" className="text-indigo-500 hover:underline text-sm font-medium">← Belanja Dulu</Link>
      </div>
      <Footer />
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      <Navbar />
      <div className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 py-6">
        <Link href="/customer/cart" className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-indigo-500 mb-5 group transition-colors">
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />Kembali ke Keranjang
        </Link>
        <h1 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white mb-6" style={{ fontFamily: "Syne, sans-serif" }}>Checkout</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-white dark:bg-[var(--surface)] rounded-2xl p-5 border border-black/[0.06] dark:border-white/[0.06]">
                <h2 className="font-black text-sm text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs font-black flex items-center justify-center">1</span>
                  Info Pengiriman
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field field="name" label="Nama Lengkap" placeholder="John Doe" required />
                  <Field field="phone" label="No. Telepon" placeholder="08xxxxxxxxxx" type="tel" required />
                  <div className="sm:col-span-2"><Field field="address" label="Alamat" placeholder="Jl. Contoh No. 1" required /></div>
                  <Field field="city" label="Kota" placeholder="Surabaya" required />
                  <Field field="notes" label="Catatan (opsional)" placeholder="Taruh di depan pintu..." />
                </div>
              </div>

              <div className="bg-white dark:bg-[var(--surface)] rounded-2xl p-5 border border-black/[0.06] dark:border-white/[0.06]">
                <h2 className="font-black text-sm text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs font-black flex items-center justify-center">2</span>
                  Metode Pembayaran
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
                  {payMethods.map(({ value, label, icon: Icon }) => (
                    <label key={value} className={`flex flex-col items-center gap-1.5 p-3 rounded-2xl border-2 cursor-pointer transition-all ${
                      form.payment === value ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-500/10" : "border-black/[0.06] dark:border-white/[0.08] hover:border-gray-300 dark:hover:border-white/[0.15]"
                    }`}>
                      <input type="radio" name="payment" value={value} checked={form.payment===value} onChange={() => setForm(f=>({...f,payment:value}))} className="sr-only" />
                      <Icon className={`w-5 h-5 ${form.payment===value?"text-indigo-500":"text-gray-400"}`} />
                      <span className={`text-[10px] font-bold text-center leading-tight ${form.payment===value?"text-indigo-700 dark:text-indigo-300":"text-gray-500 dark:text-gray-400"}`}>{label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button type="submit" disabled={loading}
                className="w-full bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600 disabled:opacity-70 text-white py-4 rounded-2xl font-black text-sm transition-all active:scale-95 shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2">
                {loading ? <><Loader2 className="w-4 h-4 animate-spin" />Memproses...</> : <>Buat Pesanan — {formatRupiah(total)}</>}
              </button>
            </div>

            <div>
              <div className="bg-white dark:bg-[var(--surface)] rounded-2xl p-5 border border-black/[0.06] dark:border-white/[0.06] sticky top-20">
                <h2 className="font-black text-sm text-gray-900 dark:text-white mb-4">Pesanan ({items.length})</h2>
                <div className="space-y-3 max-h-52 overflow-y-auto">
                  {items.map(item => (
                    <div key={item.product.id} className="flex gap-3">
                      <img src={item.product.image} alt={item.product.name} className="w-12 h-12 rounded-xl object-cover flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-gray-900 dark:text-gray-100 line-clamp-1">{item.product.name}</p>
                        <p className="text-[11px] text-gray-400">×{item.quantity}</p>
                      </div>
                      <p className="text-xs font-black text-gray-900 dark:text-white flex-shrink-0">{formatRupiah(item.product.price*item.quantity)}</p>
                    </div>
                  ))}
                </div>
                <div className="border-t border-black/[0.06] dark:border-white/[0.06] mt-4 pt-3 space-y-1.5">
                  <div className="flex justify-between text-xs text-gray-400"><span>Subtotal</span><span>{formatRupiah(total)}</span></div>
                  <div className="flex justify-between text-xs text-gray-400"><span>Ongkir</span><span className="text-emerald-500 font-semibold">Gratis</span></div>
                  <div className="flex justify-between font-black text-base pt-2 border-t border-black/[0.06] dark:border-white/[0.06]" style={{ fontFamily:"Syne,sans-serif" }}>
                    <span className="text-gray-400 font-normal text-sm">Total</span>
                    <span className="text-indigo-500">{formatRupiah(total)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}
