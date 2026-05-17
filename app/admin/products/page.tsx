"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Plus, Pencil, Trash2, Search, Package, AlertCircle, Loader2, RefreshCw } from "lucide-react";
import type { ProductRow } from "@/lib/supabase/types";
import { formatRupiah } from "@/lib/utils";

export default function ProductsPage() {
  const [list,      setList]      = useState<ProductRow[]>([]);
  const [loading,   setLoading]   = useState(true);
  const [search,    setSearch]    = useState("");
  const [deleteId,  setDeleteId]  = useState<string | null>(null);
  const [deleting,  setDeleting]  = useState(false);
  const [catFilter, setCatFilter] = useState("all");
  const [cats,      setCats]      = useState<string[]>(["all"]);
  const [error,     setError]     = useState("");

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams({ active: "false", limit: "100" });
      if (catFilter !== "all") params.set("category", catFilter);
      if (search)              params.set("search", search);
      const res  = await fetch(`/api/products?${params}`);
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Gagal memuat produk"); return; }
      setList(data.data ?? []);
      // Kumpulkan kategori unik
      const allCats: string[] = Array.from(new Set((data.data ?? []).map((p: ProductRow) => p.category)));
      setCats(["all", ...allCats]);
    } catch { setError("Gagal terhubung ke server."); }
    finally  { setLoading(false); }
  }, [catFilter, search]);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  const handleDelete = async (id: string) => {
    setDeleting(true);
    try {
      const res = await fetch(`/api/products/${id}`, { method:"DELETE" });
      if (!res.ok) { const d=await res.json(); alert(d.error||"Gagal menghapus"); return; }
      setList(prev => prev.filter(p => p.id !== id));
    } catch { alert("Terjadi kesalahan."); }
    finally  { setDeleting(false); setDeleteId(null); }
  };

  return (
    <div className="p-4 sm:p-6 w-full max-w-full">
      {/* Delete confirmation modal */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <div className="w-12 h-12 bg-red-100 dark:bg-red-500/10 rounded-2xl flex items-center justify-center mb-4">
              <Trash2 className="w-5 h-5 text-red-500"/>
            </div>
            <h3 className="font-black text-gray-900 dark:text-white mb-1">Hapus Produk?</h3>
            <p className="text-sm text-gray-500 mb-5">Produk akan dinonaktifkan dan tidak tampil di toko. Riwayat order tetap tersimpan.</p>
            <div className="flex gap-2">
              <button onClick={()=>setDeleteId(null)} className="flex-1 py-2.5 rounded-xl border border-black/10 dark:border-white/10 text-sm font-semibold text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5">
                Batal
              </button>
              <button onClick={()=>handleDelete(deleteId)} disabled={deleting}
                className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-semibold disabled:opacity-70 flex items-center justify-center gap-2">
                {deleting ? <Loader2 className="w-4 h-4 animate-spin"/> : <Trash2 className="w-4 h-4"/>}
                {deleting ? "Menghapus..." : "Hapus"}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <div className="w-1.5 h-5 bg-gradient-to-b from-indigo-500 to-violet-500 rounded-full"/>
            <h1 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white" style={{fontFamily:"Syne,sans-serif"}}>Products</h1>
          </div>
          <p className="text-sm text-gray-400 ml-3.5">{list.length} total produk</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={fetchProducts} disabled={loading}
            className="p-2.5 rounded-xl border border-black/10 dark:border-white/10 text-gray-400 hover:text-indigo-500 transition-colors">
            <RefreshCw className={`w-4 h-4 ${loading?"animate-spin":""}`}/>
          </button>
          <Link href="/admin/products/add"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-md shadow-indigo-500/20 active:scale-95">
            <Plus className="w-4 h-4"/>Add Product
          </Link>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-3 bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 px-4 py-3 rounded-xl mb-4 border border-red-200 dark:border-red-500/20">
          <AlertCircle className="w-4 h-4 flex-shrink-0"/><span className="text-sm">{error}</span>
        </div>
      )}

      <div className="bg-[var(--surface)] rounded-2xl border border-black/[0.06] dark:border-white/[0.06] overflow-hidden">
        <div className="p-3 sm:p-4 border-b border-black/[0.06] dark:border-white/[0.06] flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400"/>
            <input type="text" placeholder="Search..." value={search} onChange={e=>setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-black/[0.08] dark:border-white/[0.08] bg-gray-50 dark:bg-white/[0.04] text-sm outline-none focus:ring-2 focus:ring-indigo-500/50 text-gray-900 dark:text-gray-100"/>
          </div>
          <div className="flex gap-1.5 flex-wrap">
            {cats.map(c => (
              <button key={c} onClick={()=>setCatFilter(c)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all whitespace-nowrap ${
                  catFilter===c ? "bg-indigo-500 text-white shadow-sm" : "bg-gray-100 dark:bg-white/[0.06] text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-white/[0.1]"
                }`}>
                {c==="all"?"All":c}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16 gap-3 text-gray-400">
            <Loader2 className="w-5 h-5 animate-spin"/><span className="text-sm">Memuat produk...</span>
          </div>
        ) : list.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3 text-gray-400">
            <Package className="w-10 h-10 opacity-40"/>
            <p className="text-sm font-semibold">Tidak ada produk ditemukan</p>
            <Link href="/admin/products/add" className="text-xs text-indigo-500 hover:underline">+ Tambah produk pertama</Link>
          </div>
        ) : (
          <div className="overflow-x-auto w-full">
            <table className="w-full min-w-[480px]">
              <thead>
                <tr className="text-[10px] font-bold text-gray-400 uppercase tracking-wider border-b border-black/[0.04] dark:border-white/[0.04]">
                  <th className="text-left px-4 py-3">Produk</th>
                  <th className="text-left px-4 py-3 hidden sm:table-cell">Kategori</th>
                  <th className="text-left px-4 py-3">Harga</th>
                  <th className="text-left px-4 py-3 hidden md:table-cell">Stok</th>
                  <th className="text-left px-4 py-3 hidden md:table-cell">Status</th>
                  <th className="text-right px-4 py-3">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {list.map(p => (
                  <tr key={p.id} className="border-b border-black/[0.03] dark:border-white/[0.03] hover:bg-gray-50/60 dark:hover:bg-white/[0.02] transition-colors last:border-0">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3 min-w-0">
                        {p.image_url ? (
                          <img src={p.image_url} alt={p.name} className="w-9 h-9 object-cover rounded-xl flex-shrink-0"/>
                        ) : (
                          <div className="w-9 h-9 bg-gray-100 dark:bg-white/10 rounded-xl flex-shrink-0 flex items-center justify-center">
                            <Package className="w-4 h-4 text-gray-400"/>
                          </div>
                        )}
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
                      <div>
                        <p className="text-sm font-bold text-gray-900 dark:text-gray-100">{formatRupiah(p.price)}</p>
                        {p.original_price && <p className="text-[11px] text-gray-400 line-through">{formatRupiah(p.original_price)}</p>}
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <span className={`text-sm font-semibold ${p.stock < 10 ? "text-red-500" : "text-gray-700 dark:text-gray-300"}`}>{p.stock}</span>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                        p.is_active ? "bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                                    : "bg-gray-100 dark:bg-white/10 text-gray-500"
                      }`}>
                        {p.is_active ? "Aktif" : "Nonaktif"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5 justify-end">
                        <Link href={`/admin/products/edit/${p.id}`}
                          className="p-2 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-500/10 text-gray-400 hover:text-indigo-500 transition-colors">
                          <Pencil className="w-3.5 h-3.5"/>
                        </Link>
                        <button onClick={()=>setDeleteId(p.id)}
                          className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10 text-gray-400 hover:text-red-500 transition-colors">
                          <Trash2 className="w-3.5 h-3.5"/>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
