"use client";
import Link from "next/link";
import { ShoppingCart, Sun, Moon, Store, Menu, X, Zap, Shield, CreditCard } from "lucide-react";
import { useCart } from "@/lib/CartContext";
import { useTheme } from "@/lib/ThemeContext";
import { useState } from "react";

const roles = [
  { href: "/", label: "Customer", icon: Store, color: "text-violet-400" },
  { href: "/admin", label: "Admin", icon: Shield, color: "text-indigo-400" },
  { href: "/cashier", label: "Cashier", icon: CreditCard, color: "text-emerald-400" },
];

export default function Navbar() {
  const { itemCount } = useCart();
  const { dark, toggle } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full">
      {/* Glass bar */}
      <div className="bg-white/80 dark:bg-[#080c14]/80 backdrop-blur-xl border-b border-black/[0.06] dark:border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-15 py-3">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 via-indigo-500 to-blue-500 animate-gradient flex items-center justify-center shadow-lg group-hover:shadow-indigo-500/40 transition-shadow">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="font-black text-lg tracking-tight text-gray-900 dark:text-white" style={{ fontFamily: 'Syne, sans-serif' }}>
                Nexa<span className="text-indigo-500">Sell</span>
              </span>
            </Link>

            {/* Desktop nav pills */}
            <div className="hidden md:flex items-center gap-1 bg-gray-100/80 dark:bg-white/[0.05] rounded-full px-1.5 py-1.5">
              {roles.map(({ href, label, icon: Icon, color }) => (
                <Link
                  key={href}
                  href={href}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-white dark:hover:bg-white/10 transition-all"
                >
                  <Icon className={`w-3.5 h-3.5 ${color}`} />
                  {label}
                </Link>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {/* Dark mode */}
              <button
                onClick={toggle}
                className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-100 dark:bg-white/[0.06] hover:bg-gray-200 dark:hover:bg-white/[0.12] transition-colors text-gray-500 dark:text-gray-400"
              >
                {dark
                  ? <Sun className="w-4 h-4 text-amber-400" />
                  : <Moon className="w-4 h-4" />}
              </button>

              {/* Cart */}
              <Link
                href="/customer/cart"
                className="relative w-9 h-9 flex items-center justify-center rounded-xl bg-gray-100 dark:bg-white/[0.06] hover:bg-gray-200 dark:hover:bg-white/[0.12] transition-colors text-gray-500 dark:text-gray-400"
              >
                <ShoppingCart className="w-4 h-4" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-violet-500 to-indigo-500 text-white text-[9px] font-black rounded-full w-4 h-4 flex items-center justify-center shadow-md">
                    {itemCount > 9 ? "9+" : itemCount}
                  </span>
                )}
              </Link>

              {/* Mobile burger */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden w-9 h-9 flex items-center justify-center rounded-xl bg-gray-100 dark:bg-white/[0.06] hover:bg-gray-200 transition-colors text-gray-500 dark:text-gray-400"
              >
                {menuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Mobile dropdown */}
          {menuOpen && (
            <div className="md:hidden pb-4 pt-1 space-y-1 animate-slide-up">
              {roles.map(({ href, label, icon: Icon, color }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/[0.06] transition-colors"
                >
                  <Icon className={`w-4 h-4 ${color}`} />
                  {label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Animated gradient line */}
      <div className="h-0.5 bg-gradient-to-r from-violet-500 via-indigo-500 to-blue-500 animate-gradient" style={{ backgroundSize: "300% 100%" }} />
    </nav>
  );
}
