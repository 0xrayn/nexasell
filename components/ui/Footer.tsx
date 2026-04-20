import Link from "next/link";
import { Zap, Github, Globe, ArrowUpRight } from "lucide-react";

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

export default function Footer() {
  return (
    <footer className="mt-auto" style={{ background: "var(--surface)", borderTop: "1px solid var(--border)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-14">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2">
            <Link href="/" className="inline-flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-2xl flex items-center justify-center"
                style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)", boxShadow: "0 3px 14px rgba(99,102,241,0.35)" }}>
                <Zap className="w-4 h-4 text-white" strokeWidth={2.5} />
              </div>
              <span className="font-black text-xl" style={{ color: "var(--text)", fontFamily: "Outfit,sans-serif" }}>
                Nexa<span style={{ color: "#6366f1" }}>Sell</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed max-w-xs mb-5" style={{ color: "var(--text2)" }}>
              Sistem POS modern untuk bisnis kamu. Kelola produk, pantau penjualan, dan layani pelanggan dalam satu platform.
            </p>
            {/* Social icons with proper SVG icons */}
            <div className="flex items-center gap-2">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl flex items-center justify-center transition-all"
                style={{ background: "var(--surface2)", border: "1px solid var(--border)" }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = "#6366f1")}
                onMouseLeave={e => (e.currentTarget.style.borderColor = "var(--border)")}>
                <Github className="w-4 h-4" style={{ color: "var(--text2)" }} />
              </a>
              <a href="https://rayn.web.id" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl flex items-center justify-center transition-all"
                style={{ background: "var(--surface2)", border: "1px solid var(--border)" }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = "#6366f1")}
                onMouseLeave={e => (e.currentTarget.style.borderColor = "var(--border)")}>
                <Globe className="w-4 h-4" style={{ color: "var(--text2)" }} />
              </a>
            </div>
          </div>

          {/* Link columns */}
          {cols.map(col => (
            <div key={col.title}>
              <p className="text-[10px] font-black uppercase tracking-[0.18em] mb-4" style={{ color: "var(--text3)" }}>
                {col.title}
              </p>
              <ul className="space-y-2.5">
                {col.links.map(item => (
                  <li key={item.href}>
                    <Link href={item.href}
                      className="text-sm font-medium transition-colors"
                      style={{ color: "var(--text2)" }}
                      onMouseEnter={e => (e.currentTarget.style.color = "#6366f1")}
                      onMouseLeave={e => (e.currentTarget.style.color = "var(--text2)")}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6"
          style={{ borderTop: "1px solid var(--border)" }}>
          <p className="text-xs" style={{ color: "var(--text3)" }}>
            © 2026 NexaSell. All rights reserved.
          </p>
          <a href="https://rayn.web.id" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold transition-all group"
            style={{ color: "var(--text3)" }}
            onMouseEnter={e => (e.currentTarget.style.color = "#6366f1")}
            onMouseLeave={e => (e.currentTarget.style.color = "var(--text3)")}>
            Built by <span className="font-black" style={{ color: "var(--text2)" }}>rayn</span>
            <ArrowUpRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            rayn.web.id
          </a>
        </div>
      </div>
    </footer>
  );
}
