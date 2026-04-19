"use client";
import { useState } from "react";
import { ArrowLeft, CheckCircle, ImageIcon } from "lucide-react";
import Link from "next/link";
import { categories } from "@/data/products";

export default function AddProductPage() {
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({ name:"", price:"", originalPrice:"", category:"food", description:"", stock:"", badge:"", image:"" });
  const [errors, setErrors] = useState<Record<string,string>>({});

  const validate = () => {
    const e: Record<string,string> = {};
    if (!form.name.trim()) e.name = "Required";
    if (!form.price) e.price = "Required";
    if (!form.description.trim()) e.description = "Required";
    if (!form.stock) e.stock = "Required";
    return e;
  };

  const upd = (f: string) => (e: React.ChangeEvent<HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement>) => {
    setForm((p) => ({ ...p, [f]: e.target.value }));
    if (errors[f]) setErrors((er) => { const n={...er}; delete n[f]; return n; });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const F = ({ field, label, type="text", placeholder="", required=false }: { field:string; label:string; type?:string; placeholder?:string; required?:boolean }) => (
    <div>
      <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">{label}{required && <span className="text-red-400 ml-1">*</span>}</label>
      <input type={type} value={(form as Record<string,string>)[field]} onChange={upd(field)} placeholder={placeholder}
        className={`w-full px-3.5 py-2.5 rounded-xl border text-sm outline-none transition-all bg-gray-50 dark:bg-white/[0.04] text-gray-900 dark:text-gray-100 ${errors[field] ? "border-red-400 focus:ring-2 focus:ring-red-300" : "border-black/[0.08] dark:border-white/[0.08] focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-400"}`} />
      {errors[field] && <p className="text-xs text-red-400 mt-1">{errors[field]}</p>}
    </div>
  );

  return (
    <div className="p-4 sm:p-6 w-full max-w-full">
      <Link href="/admin/products" className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-indigo-500 mb-5 transition-colors group">
        <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />Back
      </Link>
      <div className="mb-5">
        <div className="flex items-center gap-2 mb-0.5">
          <div className="w-1.5 h-5 bg-gradient-to-b from-indigo-500 to-violet-500 rounded-full" />
          <h1 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white" style={{ fontFamily:'Syne,sans-serif' }}>Add Product</h1>
        </div>
      </div>

      {saved && (
        <div className="flex items-center gap-3 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 px-4 py-3 rounded-xl mb-5 border border-emerald-200 dark:border-emerald-500/20 animate-slide-up">
          <CheckCircle className="w-4 h-4 flex-shrink-0" />
          <span className="text-sm font-semibold">Product saved!</span>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          <div className="xl:col-span-2 space-y-4">
            <div className="bg-[var(--surface)] rounded-2xl p-4 sm:p-5 border border-black/[0.06] dark:border-white/[0.06] space-y-4">
              <h2 className="text-sm font-bold text-gray-900 dark:text-white">Basic Info</h2>
              <F field="name" label="Product Name" placeholder="e.g. Premium Coffee" required />
              <div>
                <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">Description <span className="text-red-400">*</span></label>
                <textarea rows={3} value={form.description} onChange={upd("description")} placeholder="Describe the product..."
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-sm outline-none transition-all bg-gray-50 dark:bg-white/[0.04] text-gray-900 dark:text-gray-100 resize-none ${errors.description ? "border-red-400" : "border-black/[0.08] dark:border-white/[0.08] focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-400"}`} />
                {errors.description && <p className="text-xs text-red-400 mt-1">{errors.description}</p>}
              </div>
            </div>
            <div className="bg-[var(--surface)] rounded-2xl p-4 sm:p-5 border border-black/[0.06] dark:border-white/[0.06]">
              <h2 className="text-sm font-bold text-gray-900 dark:text-white mb-4">Pricing & Inventory</h2>
              <div className="grid grid-cols-3 gap-3">
                <F field="price" label="Price (Rp)" type="number" placeholder="50000" required />
                <F field="originalPrice" label="Original Price" type="number" placeholder="75000" />
                <F field="stock" label="Stock" type="number" placeholder="100" required />
              </div>
            </div>
            <div className="bg-[var(--surface)] rounded-2xl p-4 sm:p-5 border border-black/[0.06] dark:border-white/[0.06]">
              <h2 className="text-sm font-bold text-gray-900 dark:text-white mb-4">Classification</h2>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">Category *</label>
                  <select value={form.category} onChange={upd("category")} className="w-full px-3.5 py-2.5 rounded-xl border border-black/[0.08] dark:border-white/[0.08] bg-gray-50 dark:bg-white/[0.04] text-gray-900 dark:text-gray-100 text-sm outline-none focus:ring-2 focus:ring-indigo-500/50">
                    {categories.filter(c => c.id !== "all").map(c => <option key={c.id} value={c.id}>{c.icon} {c.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">Badge</label>
                  <select value={form.badge} onChange={upd("badge")} className="w-full px-3.5 py-2.5 rounded-xl border border-black/[0.08] dark:border-white/[0.08] bg-gray-50 dark:bg-white/[0.04] text-gray-900 dark:text-gray-100 text-sm outline-none focus:ring-2 focus:ring-indigo-500/50">
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
            <div className="bg-[var(--surface)] rounded-2xl p-4 sm:p-5 border border-black/[0.06] dark:border-white/[0.06]">
              <h2 className="text-sm font-bold text-gray-900 dark:text-white mb-3">Product Image</h2>
              <div className="aspect-square rounded-2xl overflow-hidden bg-gray-100 dark:bg-white/[0.04] border border-black/[0.06] dark:border-white/[0.06] mb-3 flex items-center justify-center">
                {form.image ? (
                  <img src={form.image} alt="Preview" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).src=""; }} />
                ) : (
                  <div className="text-center">
                    <ImageIcon className="w-8 h-8 text-gray-300 dark:text-gray-600 mx-auto mb-1" />
                    <p className="text-[11px] text-gray-400">Preview</p>
                  </div>
                )}
              </div>
              <F field="image" label="Image URL" placeholder="https://..." />
            </div>
            <div className="bg-gradient-to-br from-indigo-50 to-violet-50 dark:from-indigo-500/10 dark:to-violet-500/10 rounded-2xl p-4 border border-indigo-100 dark:border-indigo-500/20">
              <p className="text-xs font-bold text-indigo-700 dark:text-indigo-300 mb-2">💡 Tips</p>
              <ul className="text-[11px] text-indigo-600 dark:text-indigo-400 space-y-1">
                <li>• Use Unsplash for free images</li>
                <li>• Add original price for sale badge</li>
                <li>• Best Seller badge drives clicks</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-5 max-w-sm">
          <Link href="/admin/products" className="flex-1 py-3 rounded-xl border border-black/[0.08] dark:border-white/[0.08] text-sm font-semibold text-gray-600 dark:text-gray-400 text-center hover:bg-gray-50 dark:hover:bg-white/[0.04] transition-colors">Cancel</Link>
          <button type="submit" className="flex-1 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600 text-white text-sm font-bold transition-all shadow-md shadow-indigo-500/20 active:scale-95">Save Product</button>
        </div>
      </form>
    </div>
  );
}
