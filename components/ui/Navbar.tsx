"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart, Sun, Moon, Menu, X, Zap, ShieldCheck, CreditCard, Store } from "lucide-react";
import { useCart } from "@/lib/CartContext";
import { useTheme } from "@/lib/ThemeContext";
import { useState } from "react";

const roles = [
  { href: "/",        label: "Toko",    icon: Store,        active: (p: string) => p === "/" || p.startsWith("/customer") },
  { href: "/admin",   label: "Admin",   icon: ShieldCheck,  active: (p: string) => p.startsWith("/admin") },
  { href: "/cashier", label: "Kasir",   icon: CreditCard,   active: (p: string) => p.startsWith("/cashier") },
];

export default function Navbar() {
  const { itemCount } = useCart();
  const { dark, toggle } = useTheme();
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 w-full">
      <div className="bg-[var(--surface)]/90 backdrop-blur-xl border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 via-violet-500 to-purple-600 anim-gradient flex items-center justify-center shadow-md shadow-indigo-500/30 group-hover:shadow-indigo-500/50 transition-shadow">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="font-black text-lg text-[var(--text)] tracking-tight" style={{ fontFamily: "Cabinet Grotesk, sans-serif" }}>
                Nexa<span className="text-indigo-500">Sell</span>
              </span>
            </Link>

            {/* Role switcher — pill tabs */}
            <div className="hidden md:flex items-center p-1 bg-[var(--surface2)] border border-[var(--border)] rounded-full gap-0.5">
              {roles.map(({ href, label, icon: Icon, active }) => {
                const isActive = active(pathname);
                return (
                  <Link key={href} href={href}
                    className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                      isActive
                        ? "bg-white dark:bg-white/10 text-[var(--text)] shadow-sm"
                        : "text-[var(--text2)] hover:text-[var(--text)]"
                    }`}>
                    <Icon className={`w-3.5 h-3.5 ${isActive ? "text-indigo-500" : ""}`} />
                    {label}
                  </Link>
                );
              })}
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-1.5">
              <button onClick={toggle}
                className="w-9 h-9 rounded-xl bg-[var(--surface2)] border border-[var(--border)] hover:border-indigo-400/50 flex items-center justify-center transition-all text-[var(--text2)] hover:text-indigo-500">
                {dark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
              </button>
              <Link href="/customer/cart"
                className="relative w-9 h-9 rounded-xl bg-[var(--surface2)] border border-[var(--border)] hover:border-indigo-400/50 flex items-center justify-center transition-all text-[var(--text2)] hover:text-indigo-500">
                <ShoppingCart className="w-4 h-4" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-indigo-500 to-violet-500 text-white text-[9px] font-black rounded-full w-4 h-4 flex items-center justify-center shadow-sm">
                    {itemCount > 9 ? "9+" : itemCount}
                  </span>
                )}
              </Link>
              <button onClick={() => setOpen(!open)}
                className="md:hidden w-9 h-9 rounded-xl bg-[var(--surface2)] border border-[var(--border)] flex items-center justify-center text-[var(--text2)]">
                {open ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {open && (
            <div className="md:hidden pb-4 space-y-1 anim-slide-up">
              {roles.map(({ href, label, icon: Icon, active }) => {
                const isActive = active(pathname);
                return (
                  <Link key={href} href={href} onClick={() => setOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all ${
                      isActive
                        ? "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400"
                        : "text-[var(--text2)] hover:bg-[var(--surface2)]"
                    }`}>
                    <Icon className="w-4 h-4" />
                    {label}
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
      {/* Gradient line */}
      <div className="h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />
    </nav>
  );
}
