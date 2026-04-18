"use client";
import { useState } from "react";
import Link from "next/link";
import { Plus, Pencil, Trash2, Search, Package, Star, AlertCircle } from "lucide-react";
import { products as initialProducts } from "@/data/products";
import type { Product } from "@/data/products";
import { formatRupiah } from "@/lib/utils";

export default function ProductsPage() {
  const [productList, setProductList] = useState<Product[]>(initialProducts);
  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState("all");

  const categories = ["all", ...Array.from(new Set(initialProducts.map((p) => p.category)))];

  const filtered = productList.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = categoryFilter === "all" || p.category === categoryFilter;
    return matchSearch && matchCat;
  });

  const handleDelete = (id: string) => {
    setProductList((prev) => prev.filter((p) => p.id !== id));
    setDeleteId(null);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Products</h1>
          <p className="text-sm text-gray-400 mt-0.5">{productList.length} products total</p>
        </div>
        <Link
          href="/admin/products/add"
          className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors active:scale-95"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </Link>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700">
        {/* Filters */}
        <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-sm outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 dark:text-gray-100"
            />
          </div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-sm text-gray-700 dark:text-gray-300 outline-none focus:ring-2 focus:ring-indigo-500 capitalize"
          >
            {categories.map((c) => (
              <option key={c} value={c} className="capitalize">{c === "all" ? "All Categories" : c}</option>
            ))}
          </select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide border-b border-gray-100 dark:border-gray-700">
                <th className="text-left px-4 py-3">Product</th>
                <th className="text-left px-4 py-3 hidden sm:table-cell">Category</th>
                <th className="text-left px-4 py-3">Price</th>
                <th className="text-left px-4 py-3 hidden md:table-cell">Stock</th>
                <th className="text-left px-4 py-3 hidden lg:table-cell">Rating</th>
                <th className="text-left px-4 py-3 hidden lg:table-cell">Sold</th>
                <th className="text-right px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-gray-700/50">
              {filtered.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-700/20 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img src={p.image} alt={p.name} className="w-10 h-10 object-cover rounded-xl flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 line-clamp-1">{p.name}</p>
                        {p.badge && (
                          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
                            p.badge === "Sale" ? "bg-red-100 text-red-600" :
                            p.badge === "Best Seller" ? "bg-amber-100 text-amber-700" :
                            "bg-indigo-100 text-indigo-600"
                          }`}>{p.badge}</span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2.5 py-1 rounded-full capitalize font-medium">{p.category}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div>
                      <p className="text-sm font-bold text-gray-900 dark:text-gray-100">{formatRupiah(p.price)}</p>
                      {p.originalPrice && <p className="text-[11px] text-gray-400 line-through">{formatRupiah(p.originalPrice)}</p>}
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <div className="flex items-center gap-1.5">
                      {p.stock < 10 && <AlertCircle className="w-3.5 h-3.5 text-orange-400" />}
                      <span className={`text-sm font-semibold ${p.stock < 10 ? "text-orange-500" : "text-emerald-600 dark:text-emerald-400"}`}>{p.stock}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell">
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{p.rating}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500 hidden lg:table-cell">{p.sold.toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <Link href={`/admin/products/edit/${p.id}`} className="p-2 rounded-xl hover:bg-indigo-50 dark:hover:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 transition-colors">
                        <Pencil className="w-3.5 h-3.5" />
                      </Link>
                      <button onClick={() => setDeleteId(p.id)} className="p-2 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500 transition-colors">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 gap-3">
              <Package className="w-12 h-12 text-gray-200 dark:text-gray-700" />
              <p className="text-gray-400 text-sm">No products found</p>
              <button onClick={() => { setSearch(""); setCategoryFilter("all"); }} className="text-indigo-600 text-xs hover:underline">Clear filters</button>
            </div>
          )}
        </div>
      </div>

      {/* Delete Modal */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-xl flex items-center justify-center mb-4">
              <Trash2 className="w-6 h-6 text-red-500" />
            </div>
            <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100 mb-1">Delete Product?</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">This action cannot be undone. The product will be permanently removed.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} className="flex-1 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">Cancel</button>
              <button onClick={() => handleDelete(deleteId)} className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-semibold transition-colors">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
