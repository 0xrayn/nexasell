"use client";
import { useState } from "react";
import { CheckCircle, ArrowLeft, CreditCard, Banknote, Wallet, Smartphone } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/lib/CartContext";
import { formatRupiah } from "@/lib/utils";
import Navbar from "@/components/ui/Navbar";

const paymentMethods = [
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
  const [form, setForm] = useState({
    name: "", phone: "", address: "", city: "", notes: "", payment: "transfer"
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.phone.trim()) errs.phone = "Phone is required";
    if (!form.address.trim()) errs.address = "Address is required";
    if (!form.city.trim()) errs.city = "City is required";
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      clearCart();
    }, 1500);
  };

  const update = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    if (errors[field]) setErrors((er) => { const n = { ...er }; delete n[field]; return n; });
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-[70vh] gap-5 px-4 text-center">
          <div className="relative">
            <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
              <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">Order Placed! 🎉</h1>
            <p className="text-gray-500 dark:text-gray-400 max-w-sm">
              Thank you, <span className="font-semibold text-gray-700 dark:text-gray-300">{form.name}</span>! Your order will be processed and delivered soon.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-100 dark:border-gray-700 w-full max-w-sm text-sm">
            <div className="flex justify-between text-gray-500 mb-2"><span>Order ID</span><span className="font-mono font-semibold text-gray-900 dark:text-gray-100">#ORD{Date.now().toString().slice(-6)}</span></div>
            <div className="flex justify-between text-gray-500 mb-2"><span>Payment</span><span className="font-semibold text-gray-900 dark:text-gray-100 capitalize">{form.payment}</span></div>
            <div className="flex justify-between text-gray-500 font-semibold"><span>Total</span><span className="text-indigo-600 dark:text-indigo-400">{formatRupiah(total)}</span></div>
          </div>
          <Link href="/" className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-semibold text-sm transition-colors">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0 && !success) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
        <Navbar />
        <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
          <p className="text-gray-500">No items to checkout.</p>
          <Link href="/" className="text-indigo-600 hover:underline text-sm">← Go Shopping</Link>
        </div>
      </div>
    );
  }

  const InputField = ({ field, label, type = "text", placeholder = "" }: { field: string; label: string; type?: string; placeholder?: string }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
        {label} <span className="text-red-500">*</span>
      </label>
      <input
        type={type}
        value={(form as Record<string, string>)[field]}
        onChange={update(field)}
        placeholder={placeholder}
        className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-all bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 ${
          errors[field]
            ? "border-red-400 focus:ring-2 focus:ring-red-300"
            : "border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        }`}
      />
      {errors[field] && <p className="text-xs text-red-500 mt-1">{errors[field]}</p>}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Link href="/customer/cart" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-indigo-600 mb-6 group transition-colors">
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
          Back to Cart
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Checkout</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <div className="lg:col-span-2 space-y-4">
              {/* Delivery */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700">
                <h2 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">📦 Delivery Information</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <InputField field="name" label="Full Name" placeholder="John Doe" />
                  <InputField field="phone" label="Phone Number" type="tel" placeholder="08xxxxxxxxxx" />
                  <div className="sm:col-span-2">
                    <InputField field="address" label="Street Address" placeholder="Jl. Contoh No. 1" />
                  </div>
                  <InputField field="city" label="City" placeholder="Surabaya" />
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Notes (optional)</label>
                    <input
                      type="text"
                      value={form.notes}
                      onChange={update("notes")}
                      placeholder="Leave at the door..."
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Payment */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700">
                <h2 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">💳 Payment Method</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {paymentMethods.map(({ value, label, icon: Icon }) => (
                    <label key={value} className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 cursor-pointer transition-all ${
                      form.payment === value
                        ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20"
                        : "border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500"
                    }`}>
                      <input type="radio" name="payment" value={value} checked={form.payment === value} onChange={() => setForm((f) => ({ ...f, payment: value }))} className="sr-only" />
                      <Icon className={`w-5 h-5 ${form.payment === value ? "text-indigo-600 dark:text-indigo-400" : "text-gray-400"}`} />
                      <span className={`text-xs font-medium text-center ${form.payment === value ? "text-indigo-700 dark:text-indigo-300" : "text-gray-600 dark:text-gray-400"}`}>{label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-70 text-white py-4 rounded-xl font-bold text-sm transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />Processing...</>
                ) : (
                  <>Place Order — {formatRupiah(total)}</>
                )}
              </button>
            </div>

            {/* Summary */}
            <div>
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700 sticky top-20">
                <h2 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">Your Order ({items.length})</h2>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex gap-3">
                      <img src={item.product.image} alt={item.product.name} className="w-12 h-12 rounded-lg object-cover flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100 line-clamp-1">{item.product.name}</p>
                        <p className="text-xs text-gray-400">×{item.quantity}</p>
                      </div>
                      <p className="text-sm font-bold text-gray-900 dark:text-gray-100 flex-shrink-0">{formatRupiah(item.product.price * item.quantity)}</p>
                    </div>
                  ))}
                </div>
                <div className="border-t border-gray-100 dark:border-gray-700 mt-4 pt-3 space-y-2">
                  <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                    <span>Subtotal</span><span>{formatRupiah(total)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                    <span>Shipping</span><span className="text-emerald-600 font-medium">Free</span>
                  </div>
                  <div className="flex justify-between font-bold text-gray-900 dark:text-gray-100 text-base pt-1 border-t border-gray-100 dark:border-gray-700">
                    <span>Total</span>
                    <span className="text-indigo-600 dark:text-indigo-400">{formatRupiah(total)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
