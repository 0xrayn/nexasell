"use client";
import { use, useState } from "react";
import { ArrowLeft, CheckCircle, ImageIcon } from "lucide-react";
import Link from "next/link";
import { products, categories } from "@/data/products";

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const product = products.find(p => p.id === id);
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    name: product?.name ?? "", price: product?.price?.toString() ?? "",
    originalPrice: product?.originalPrice?.toString() ?? "", category: product?.category ?? "food",
    description: product?.description ?? "", stock: product?.stock?.toString() ?? "",
    badge: product?.badge ?? "", image: product?.image ?? "",
  });

  if (!product) return (
    <div className="p-8 text-center">
      <p className="text-gray-400">Product not found.</p>
      <Link href="/admin/products" className="text-indigo-500 text-sm hover:underline mt-2 inline-block">← Back</Link>
    </div>
  );

  const upd = (f: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(p => ({ ...p, [f]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="p-4 sm:p-6 w-full max-w-full">
      <Link href="/admin/products" className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-indigo-500 mb-5 group transition-colors">
        <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />Back
      </Link>
      <div className="mb-5">
        <div className="flex items-center gap-2 mb-0.5">
          <div className="w-1.5 h-5 bg-gradient-to-b from-indigo-500 to-violet-500 rounded-full" />
          <h1 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white" style={{ fontFamily: 'Syne, sans-serif' }}>Edit Product</h1>
        </div>
        <p className="text-sm text-gray-400 ml-3.5">{product.name}</p>
      </div>

      {saved && (
        <div className="flex items-center gap-3 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 px-4 py-3 rounded-xl mb-5 border border-emerald-200 dark:border-emerald-500/20 animate-slide-up">
          <CheckCircle className="w-4 h-4 flex-shrink-0" /><span className="text-sm font-semibold">Changes saved!</span>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          <div className="xl:col-span-2 space-y-4">
            <div className="bg-white dark:bg-[var(--surface)] rounded-2xl p-5 border border-black/[0.06] dark:border-white/[0.06] space-y-4">
              <h2 className="text-sm font-bold text-gray-900 dark:text-white">Basic Info</h2>
              <div>
                <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 mb-1.5">Product Name</label>
                <input type="text" value={form.name} onChange={upd("name")} required
                  className="w-full px-4 py-2.5 rounded-xl border border-black/[0.08] dark:border-white/[0.08] bg-gray-50 dark:bg-white/[0.04] text-gray-900 dark:text-gray-100 text-sm outline-none focus:ring-2 focus:ring-indigo-500/40" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 mb-1.5">Description</label>
                <textarea rows={3} value={form.description} onChange={upd("description")}
                  className="w-full px-4 py-2.5 rounded-xl border border-black/[0.08] dark:border-white/[0.08] bg-gray-50 dark:bg-white/[0.04] text-gray-900 dark:text-gray-100 text-sm outline-none focus:ring-2 focus:ring-indigo-500/40 resize-none" />
              </div>
            </div>
            <div className="bg-white dark:bg-[var(--surface)] rounded-2xl p-5 border border-black/[0.06] dark:border-white/[0.06]">
              <h2 className="text-sm font-bold text-gray-900 dark:text-white mb-4">Pricing & Inventory</h2>
              <div className="grid grid-cols-3 gap-3">
                {[["price","Price (Rp)","number"],["originalPrice","Original (Rp)","number"],["stock","Stock","number"]].map(([f,l,t]) => (
                  <div key={f}>
                    <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 mb-1.5">{l}</label>
                    <input type={t} value={(form as Record<string,string>)[f]} onChange={upd(f)}
                      className="w-full px-3 py-2.5 rounded-xl border border-black/[0.08] dark:border-white/[0.08] bg-gray-50 dark:bg-white/[0.04] text-gray-900 dark:text-gray-100 text-sm outline-none focus:ring-2 focus:ring-indigo-500/40" />
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white dark:bg-[var(--surface)] rounded-2xl p-5 border border-black/[0.06] dark:border-white/[0.06]">
              <h2 className="text-sm font-bold text-gray-900 dark:text-white mb-4">Classification</h2>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 mb-1.5">Category</label>
                  <select value={form.category} onChange={upd("category")} className="w-full px-3 py-2.5 rounded-xl border border-black/[0.08] dark:border-white/[0.08] bg-gray-50 dark:bg-white/[0.04] text-gray-900 dark:text-gray-100 text-sm outline-none focus:ring-2 focus:ring-indigo-500/40">
                    {categories.filter(c => c.id !== "all").map(c => <option key={c.id} value={c.id}>{c.icon} {c.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 mb-1.5">Badge</label>
                  <select value={form.badge} onChange={upd("badge")} className="w-full px-3 py-2.5 rounded-xl border border-black/[0.08] dark:border-white/[0.08] bg-gray-50 dark:bg-white/[0.04] text-gray-900 dark:text-gray-100 text-sm outline-none focus:ring-2 focus:ring-indigo-500/40">
                    <option value="">None</option>
                    <option value="New">🆕 New</option>
                    <option value="Sale">🔥 Sale</option>
                    <option value="Best Seller">⭐ Best Seller</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white dark:bg-[var(--surface)] rounded-2xl p-5 border border-black/[0.06] dark:border-white/[0.06]">
              <h2 className="text-sm font-bold text-gray-900 dark:text-white mb-3">Product Image</h2>
              <div className="aspect-square rounded-2xl overflow-hidden bg-gray-100 dark:bg-white/[0.04] border border-black/[0.06] dark:border-white/[0.06] mb-3 flex items-center justify-center">
                {form.image ? (
                  <img src={form.image} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center"><ImageIcon className="w-8 h-8 text-gray-300 dark:text-gray-600 mx-auto mb-1" /><p className="text-[11px] text-gray-400">Preview</p></div>
                )}
              </div>
              <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 mb-1.5">Image URL</label>
              <input type="text" value={form.image} onChange={upd("image")} placeholder="https://..."
                className="w-full px-3 py-2.5 rounded-xl border border-black/[0.08] dark:border-white/[0.08] bg-gray-50 dark:bg-white/[0.04] text-gray-900 dark:text-gray-100 text-sm outline-none focus:ring-2 focus:ring-indigo-500/40" />
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-5 max-w-sm">
          <Link href="/admin/products" className="flex-1 py-3 rounded-xl border border-black/[0.08] dark:border-white/[0.08] text-sm font-semibold text-gray-600 dark:text-gray-400 text-center hover:bg-gray-50 dark:hover:bg-white/[0.04] transition-colors">Cancel</Link>
          <button type="submit" className="flex-1 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600 text-white text-sm font-bold transition-all shadow-md shadow-indigo-500/20 active:scale-95">Save Changes</button>
        </div>
      </form>
    </div>
  );
}
