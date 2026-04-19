import Link from "next/link";
import { Zap } from "lucide-react";

const cols = [
  {
    title: "Belanja",
    links: [
      { label: "Home", href: "/" },
      { label: "Keranjang", href: "/customer/cart" },
      { label: "Checkout", href: "/customer/checkout" },
    ],
  },
  {
    title: "Panel",
    links: [
      { label: "Admin Dashboard", href: "/admin" },
      { label: "Cashier POS", href: "/cashier" },
      { label: "Analytics", href: "/admin/analytics" },
    ],
  },
];

const socials = [
  { label: "GitHub", href: "https://github.com", icon: "GH" },
  { label: "Twitter", href: "https://twitter.com", icon: "TW" },
  { label: "Instagram", href: "https://instagram.com", icon: "IG" },
];

export default function Footer() {
  return (
    <footer className="bg-[var(--surface)] border-t border-[var(--border)] mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
          {/* Brand col */}
          <div className="col-span-2 sm:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="font-black text-xl text-[var(--text)]" style={{ fontFamily: "Cabinet Grotesk, sans-serif" }}>
                Nexa<span className="text-indigo-500">Sell</span>
              </span>
            </Link>
            <p className="text-sm text-[var(--text2)] leading-relaxed max-w-xs mb-5">
              Sistem POS modern untuk bisnis kamu. Kelola produk, pantau penjualan, dan layani pelanggan — semua dalam satu platform.
            </p>
            <div className="flex items-center gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-[var(--surface2)] hover:bg-indigo-50 dark:hover:bg-indigo-500/10 hover:text-indigo-600 dark:hover:text-indigo-400 border border-[var(--border)] flex items-center justify-center text-[var(--text2)] text-[10px] font-black transition-all"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link cols */}
          {cols.map((col) => (
            <div key={col.title}>
              <p className="text-[11px] font-black text-[var(--text)] uppercase tracking-widest mb-4" style={{ fontFamily: "Cabinet Grotesk, sans-serif" }}>
                {col.title}
              </p>
              <ul className="space-y-2.5">
                {col.links.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="text-sm text-[var(--text2)] hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors font-medium">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-[var(--text2)]">© 2025 NexaSell. All rights reserved.</p>
          <p className="text-xs text-[var(--text2)]">Built with ♥ using Next.js & Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
}
