"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, History, Store, X, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const navItems = [
  { href: "/cashier", label: "POS Terminal", icon: ShoppingBag },
  { href: "/cashier/history", label: "Transaction History", icon: History },
];

function NavContent({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();
  return (
    <div className="flex flex-col h-full">
      <div className="p-5 border-b border-gray-200 dark:border-gray-700">
        <Link href="/" className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400" onClick={onClose}>
          <Store className="w-5 h-5" />
          <span className="font-bold text-lg">NexaSell</span>
        </Link>
        <p className="text-xs text-gray-400 mt-1 ml-7">Cashier Station</p>
      </div>
      <nav className="flex-1 p-3 space-y-0.5">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
                active
                  ? "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200"
              )}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3 px-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center text-sm font-bold flex-shrink-0">S</div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">Siti Rahayu</p>
            <p className="text-xs text-gray-400 truncate">Cashier · Shift Pagi</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CashierSidebar() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <aside className="hidden lg:flex flex-col w-60 min-h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 fixed left-0 top-0 z-30">
        <NavContent />
      </aside>

      <button
        onClick={() => setOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-40 p-2 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 shadow-md"
      >
        <Menu className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
      </button>

      {open && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
          <aside className="relative w-60 bg-white dark:bg-gray-900 h-full shadow-2xl">
            <button onClick={() => setOpen(false)} className="absolute top-4 right-3 p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 z-10">
              <X className="w-4 h-4 text-gray-500" />
            </button>
            <NavContent onClose={() => setOpen(false)} />
          </aside>
        </div>
      )}
    </>
  );
}
