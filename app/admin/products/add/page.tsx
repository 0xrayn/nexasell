"use client";
import { useState } from "react";
import { ArrowLeft, CheckCircle, ImageIcon } from "lucide-react";
import Link from "next/link";
import { categories } from "@/data/products";

interface FormData {
  name: string;
  price: string;
  originalPrice: string;
  category: string;
  description: string;
  stock: string;
  badge: string;
  image: string;
}

export default function AddProductPage() {
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState<FormData>({
    name: "", price: "", originalPrice: "", category: "food",
    description: "", stock: "", badge: "", image: ""
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validate = () => {
    const errs: Partial<FormData> = {};
    if (!form.name.trim()) errs.name = "Product name is required";
    if (!form.price) errs.price = "Price is required";
    if (!form.description.trim()) errs.description = "Description is required";
    if (!form.stock) errs.stock = "Stock is required";
    return errs;
  };

  const update = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    if (errors[field]) setErrors((er) => { const n = { ...er }; delete n[field]; return n; });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const Field = ({ field, label, type = "text", placeholder = "", required = false }: {
    field: keyof FormData; label: string; type?: string; placeholder?: string; required?: boolean;
  }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
        {label}{required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type={type}
        value={form[field]}
        onChange={update(field)}
        placeholder={placeholder}
        className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-all bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 ${
          errors[field]
            ? "border-red-400 focus:ring-2 focus:ring-red-200 dark:focus:ring-red-900"
            : "border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        }`}
      />
      {errors[field] && <p className="text-xs text-red-500 mt-1">{errors[field]}</p>}
    </div>
  );

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <Link href="/admin/products" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-indigo-600 mb-6 group transition-colors">
        <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
        Back to Products
      </Link>

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Add New Product</h1>
        <p className="text-sm text-gray-400 mt-0.5">Fill in the details to add a new product to your catalog</p>
      </div>

      {saved && (
        <div className="flex items-center gap-3 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 px-4 py-3 rounded-xl mb-6 border border-green-200 dark:border-green-800">
          <CheckCircle className="w-5 h-5 flex-shrink-0" />
          <span className="text-sm font-medium">Product saved successfully!</span>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2 space-y-4">
            {/* Basic Info */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700">
              <h2 className="font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                <span className="w-6 h-6 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 rounded-lg flex items-center justify-center text-xs font-bold">1</span>
                Basic Information
              </h2>
              <div className="space-y-4">
                <Field field="name" label="Product Name" placeholder="e.g. Premium Arabica Coffee" required />
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={3}
                    value={form.description}
                    onChange={update("description")}
                    placeholder="Describe your product..."
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-all bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 resize-none ${
                      errors.description
                        ? "border-red-400 focus:ring-2 focus:ring-red-200"
                        : "border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    }`}
                  />
                  {errors.description && <p className="text-xs text-red-500 mt-1">{errors.description}</p>}
                </div>
              </div>
            </div>

            {/* Pricing */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700">
              <h2 className="font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                <span className="w-6 h-6 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 rounded-lg flex items-center justify-center text-xs font-bold">2</span>
                Pricing & Inventory
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Field field="price" label="Price (Rp)" type="number" placeholder="50000" required />
                <Field field="originalPrice" label="Original Price (Rp)" type="number" placeholder="75000" />
                <Field field="stock" label="Stock Qty" type="number" placeholder="100" required />
              </div>
            </div>

            {/* Classification */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700">
              <h2 className="font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                <span className="w-6 h-6 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 rounded-lg flex items-center justify-center text-xs font-bold">3</span>
                Classification
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Category <span className="text-red-500">*</span></label>
                  <select value={form.category} onChange={update("category")}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm outline-none focus:ring-2 focus:ring-indigo-500">
                    {categories.filter((c) => c.id !== "all").map((c) => (
                      <option key={c.id} value={c.id}>{c.icon} {c.name}</option>
                    ))}
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

          {/* Right: Image */}
          <div className="space-y-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700">
              <h2 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">Product Image</h2>
              <div className="aspect-square rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-600 flex flex-col items-center justify-center mb-3 overflow-hidden bg-gray-50 dark:bg-gray-700">
                {form.image ? (
                  <img src={form.image} alt="Preview" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                ) : (
                  <div className="text-center p-4">
                    <ImageIcon className="w-10 h-10 text-gray-300 dark:text-gray-600 mx-auto mb-2" />
                    <p className="text-xs text-gray-400">Image preview</p>
                  </div>
                )}
              </div>
              <Field field="image" label="Image URL" placeholder="https://..." />
              <p className="text-[11px] text-gray-400 mt-2">Paste a direct image URL (e.g. from Unsplash)</p>
            </div>

            <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl p-4 border border-indigo-100 dark:border-indigo-800">
              <p className="text-xs font-semibold text-indigo-700 dark:text-indigo-300 mb-1">💡 Tips</p>
              <ul className="text-xs text-indigo-600 dark:text-indigo-400 space-y-1">
                <li>• Use Unsplash for free quality images</li>
                <li>• Set original price for sale display</li>
                <li>• &quot;Best Seller&quot; badge boosts visibility</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-5 max-w-2xl">
          <Link href="/admin/products" className="flex-1 py-3 rounded-xl border border-gray-200 dark:border-gray-600 text-sm font-semibold text-gray-700 dark:text-gray-300 text-center hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            Cancel
          </Link>
          <button type="submit" className="flex-1 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold transition-colors active:scale-95">
            Save Product
          </button>
        </div>
      </form>
    </div>
  );
}
