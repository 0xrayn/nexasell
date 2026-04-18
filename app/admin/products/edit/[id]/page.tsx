"use client";
import { use, useState } from "react";
import { ArrowLeft, CheckCircle, ImageIcon } from "lucide-react";
import Link from "next/link";
import { products, categories } from "@/data/products";

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const product = products.find((p) => p.id === id);
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    name: product?.name ?? "",
    price: product?.price?.toString() ?? "",
    originalPrice: product?.originalPrice?.toString() ?? "",
    category: product?.category ?? "food",
    description: product?.description ?? "",
    stock: product?.stock?.toString() ?? "",
    badge: product?.badge ?? "",
    image: product?.image ?? "",
  });

  if (!product) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-500">Product not found.</p>
        <Link href="/admin/products" className="text-indigo-600 text-sm hover:underline mt-2 inline-block">← Back</Link>
      </div>
    );
  }

  const update = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <Link href="/admin/products" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-indigo-600 mb-6 group transition-colors">
        <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
        Back to Products
      </Link>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Edit Product</h1>
        <p className="text-sm text-gray-400 mt-0.5">Update details for <span className="font-semibold text-gray-600 dark:text-gray-300">{product.name}</span></p>
      </div>

      {saved && (
        <div className="flex items-center gap-3 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 px-4 py-3 rounded-xl mb-6 border border-green-200 dark:border-green-800">
          <CheckCircle className="w-5 h-5 flex-shrink-0" />
          <span className="text-sm font-medium">Changes saved successfully!</span>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700 space-y-4">
              <h2 className="font-semibold text-gray-900 dark:text-gray-100">Basic Information</h2>
              {[
                { field: "name", label: "Product Name", type: "text" },
              ].map(({ field, label, type }) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">{label}</label>
                  <input type={type} value={(form as Record<string, string>)[field]} onChange={update(field)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm outline-none focus:ring-2 focus:ring-indigo-500" required />
                </div>
              ))}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Description</label>
                <textarea rows={3} value={form.description} onChange={update("description")}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm outline-none focus:ring-2 focus:ring-indigo-500 resize-none" />
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700">
              <h2 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">Pricing & Inventory</h2>
              <div className="grid grid-cols-3 gap-4">
                {[["price","Price (Rp)","number"],["originalPrice","Original Price","number"],["stock","Stock","number"]].map(([field,label,type]) => (
                  <div key={field}>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">{label}</label>
                    <input type={type} value={(form as Record<string,string>)[field]} onChange={update(field)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm outline-none focus:ring-2 focus:ring-indigo-500" />
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700">
              <h2 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">Classification</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Category</label>
                  <select value={form.category} onChange={update("category")}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm outline-none focus:ring-2 focus:ring-indigo-500">
                    {categories.filter((c) => c.id !== "all").map((c) => <option key={c.id} value={c.id}>{c.icon} {c.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Badge</label>
                  <select value={form.badge} onChange={update("badge")}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm outline-none focus:ring-2 focus:ring-indigo-500">
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
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700">
              <h2 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">Product Image</h2>
              <div className="aspect-square rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-700 mb-3">
                {form.image ? (
                  <img src={form.image} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ImageIcon className="w-10 h-10 text-gray-300" />
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Image URL</label>
                <input type="text" value={form.image} onChange={update("image")} placeholder="https://..."
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-5 max-w-2xl">
          <Link href="/admin/products" className="flex-1 py-3 rounded-xl border border-gray-200 dark:border-gray-600 text-sm font-semibold text-gray-700 dark:text-gray-300 text-center hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            Cancel
          </Link>
          <button type="submit" className="flex-1 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold transition-colors active:scale-95">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
