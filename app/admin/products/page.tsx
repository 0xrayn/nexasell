"use client";
import { useState } from "react";
import Link from "next/link";
import { Plus, Pencil, Trash2, Search, Package, AlertCircle } from "lucide-react";
import { products as initialProducts } from "@/data/products";
import type { Product } from "@/data/products";
import { formatRupiah } from "@/lib/utils";

export default function ProductsPage() {
  const [list, setList] = useState<Product[]>(initialProducts);
  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [catFilter, setCatFilter] = useState("all");

  const cats = ["all", ...Array.from(new Set(initialProducts.map((p) => p.category)))];

  const filtered = list.filter((p) => {
    const matchS = p.name.toLowerCase().includes(search.toLowerCase());
    const matchC = catFilter === "all" || p.category === catFilter;
    return matchS && matchC;
  });

  return (
    <div className="p-4 sm:p-6 w-full max-w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <div className="w-1.5 h-5 bg-gradient-to-b from-indigo-500 to-violet-500 rounded-full" />
            <h1 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white" style={{ fontFamily: 'Syne, sans-serif' }}>Products</h1>
          </div>
          <p className="text-sm text-gray-400 ml-3.5">{list.length} total products</p>
        </div>
        <Link href="/admin/products/add" className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-md shadow-indigo-500/20 active:scale-95 flex-shrink-0">
          <Plus className="w-4 h-4" />Add Product
        </Link>
      </div>

      <div className="bg-white dark:bg-[var(--card)] rounded-2xl border border-black/[0.06] dark:border-white/[0.06] overflow-hidden">
        <div className="p-3 sm:p-4 border-b border-black/[0.06] dark:border-white/[0.06] flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
            <input type="text" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-black/[0.08] dark:border-white/[0.08] bg-gray-50 dark:bg-white/[0.04] text-sm outline-none focus:ring-2 focus:ring-indigo-500/50 text-gray-900 dark:text-gray-100" />
          </div>
          <div className="flex gap-1.5 flex-wrap">
            {cats.map((c) => (
              <button key={c} onClick={() => setCatFilter(c)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all whitespace-nowrap ${catFilter === c ? "bg-indigo-500 text-white shadow-sm" : "bg-gray-100 dark:bg-white/[0.06] text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-white/[0.1]"}`}>
                {c === "all" ? "All" : c}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto w-full">
          <table className="w-full min-w-[480px]">
            <thead>
              <tr className="text-[10px] font-bold text-gray-400 uppercase tracking-wider border-b border-black/[0.04] dark:border-white/[0.04]">
                <th className="text-left px-4 py-3">Product</th>
                <th className="text-left px-4 py-3 hidden sm:table-cell">Category</th>
                <th className="text-left px-4 py-3">Price</th>
                <th className="text-left px-4 py-3 hidden md:table-cell">Stock</th>
                <th className="text-right px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id} className="border-b border-black/[0.03] dark:border-white/[0.03] hover:bg-gray-50/60 dark:hover:bg-white/[0.02] transition-colors last:border-0">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <img src={p.image} alt={p.name} className="w-9 h-9 object-cover rounded-xl flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 line-clamp-1">{p.name}</p>
                        {p.badge && <span className="text-[10px] font-bold text-indigo-500">{p.badge}</span>}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <span className="text-xs bg-gray-100 dark:bg-white/[0.06] text-gray-600 dark:text-gray-400 px-2.5 py-1 rounded-full capitalize font-medium">{p.category}</span>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-sm font-bold text-gray-900 dark:text-white whitespace-nowrap">{formatRupiah(p.price)}</p>
                    {p.originalPrice && <p className="text-[10px] text-gray-400 line-through">{formatRupiah(p.originalPrice)}</p>}
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <div className="flex items-center gap-1">
                      {p.stock < 10 && <AlertCircle className="w-3 h-3 text-orange-400 flex-shrink-0" />}
                      <span className={`text-sm font-semibold ${p.stock < 10 ? "text-orange-500" : "text-emerald-600 dark:text-emerald-400"}`}>{p.stock}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <Link href={`/admin/products/edit/${p.id}`} className="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-indigo-50 dark:hover:bg-indigo-500/10 text-indigo-500 transition-colors">
                        <Pencil className="w-3.5 h-3.5" />
                      </Link>
                      <button onClick={() => setDeleteId(p.id)} className="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-red-50 dark:hover:bg-red-500/10 text-red-400 transition-colors">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center py-14 gap-2">
              <Package className="w-10 h-10 text-gray-200 dark:text-gray-700" />
              <p className="text-sm text-gray-400">No products found</p>
            </div>
          )}
        </div>
      </div>

      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
          <div className="bg-white dark:bg-[var(--card)] rounded-2xl p-6 max-w-sm w-full shadow-2xl animate-slide-up">
            <div className="w-12 h-12 bg-red-100 dark:bg-red-500/10 rounded-2xl flex items-center justify-center mb-4">
              <Trash2 className="w-6 h-6 text-red-500" />
            </div>
            <h3 className="font-black text-lg text-gray-900 dark:text-white mb-1">Delete product?</h3>
            <p className="text-sm text-gray-400 mb-5">This cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} className="flex-1 py-2.5 rounded-xl border border-black/[0.08] dark:border-white/[0.08] text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/[0.04] transition-colors">Cancel</button>
              <button onClick={() => { setList((l) => l.filter((p) => p.id !== deleteId)); setDeleteId(null); }} className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-semibold transition-colors">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
