"use client";
import Link from "next/link";
import { ShoppingCart, Sun, Moon, Store, Menu, X } from "lucide-react";
import { useCart } from "@/lib/CartContext";
import { useTheme } from "@/lib/ThemeContext";
import { useState } from "react";

export default function Navbar() {
  const { itemCount } = useCart();
  const { dark, toggle } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-indigo-600 dark:text-indigo-400">
            <Store className="w-6 h-6" />
            <span>NexaSell</span>
          </Link>

          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600 dark:text-gray-300">
            <Link href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Home</Link>
            <Link href="/customer/cart" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Cart</Link>
            <Link href="/admin" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Admin</Link>
            <Link href="/cashier" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Cashier</Link>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggle}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-300"
            >
              {dark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <Link
              href="/customer/cart"
              className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-300"
            >
              <ShoppingCart className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-indigo-600 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-bold">
                  {itemCount > 9 ? "9+" : itemCount}
                </span>
              )}
            </Link>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-300"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden py-3 border-t border-gray-200 dark:border-gray-700 space-y-1">
            {[["/" , "Home"], ["/customer/cart", "Cart"], ["/admin", "Admin"], ["/cashier", "Cashier"]].map(([href, label]) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="block px-2 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                {label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
