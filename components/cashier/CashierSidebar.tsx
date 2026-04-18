"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, History, X, Menu, ChevronLeft, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/lib/SidebarContext";

const navItems = [
  { href: "/cashier",         label: "POS Terminal", icon: ShoppingBag },
  { href: "/cashier/history", label: "History",      icon: History },
];

function NavLinks({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();
  const { collapsed } = useSidebar();
  return (
    <nav className="flex-1 px-2 py-3 space-y-0.5 overflow-y-auto overflow-x-hidden">
      {navItems.map((item) => {
        const Icon = item.icon;
        const active = pathname === item.href;
        return (
          <Link key={item.href} href={item.href} onClick={onClose} title={item.label}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 relative overflow-hidden",
              collapsed ? "justify-center" : "",
              active
                ? "bg-gradient-to-r from-emerald-500/15 to-teal-500/10 text-emerald-600 dark:text-emerald-400"
                : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/[0.06] hover:text-gray-900 dark:hover:text-gray-100"
            )}>
            {active && !collapsed && <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-emerald-500 rounded-r-full" />}
            <Icon className={cn("w-4 h-4 flex-shrink-0", active ? "text-emerald-500" : "")} />
            {!collapsed && <span className="truncate">{item.label}</span>}
          </Link>
        );
      })}
    </nav>
  );
}

export default function CashierSidebar() {
  const { collapsed, toggle, mobileOpen, setMobileOpen } = useSidebar();

  const SidebarShell = ({ isMobile = false }: { isMobile?: boolean }) => (
    <div className="flex flex-col h-full bg-white dark:bg-[#0a101e] overflow-hidden">
      <div className="flex items-center justify-between h-[60px] px-3 border-b border-black/[0.06] dark:border-white/[0.06] flex-shrink-0">
        <Link href="/" onClick={isMobile ? () => setMobileOpen(false) : undefined} className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center flex-shrink-0 shadow-md shadow-emerald-500/30">
            <Zap className="w-4 h-4 text-white" />
          </div>
          {(!collapsed || isMobile) && (
            <span className="font-black text-base text-gray-900 dark:text-white whitespace-nowrap" style={{ fontFamily: "Syne, sans-serif" }}>
              Nexa<span className="text-emerald-500">Sell</span>
            </span>
          )}
        </Link>
        {isMobile ? (
          <button onClick={() => setMobileOpen(false)} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-gray-100 dark:hover:bg-white/[0.06] text-gray-400 flex-shrink-0">
            <X className="w-4 h-4" />
          </button>
        ) : (
          <button onClick={toggle} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-gray-100 dark:hover:bg-white/[0.06] text-gray-400 transition-colors flex-shrink-0">
            <ChevronLeft className={cn("w-4 h-4 transition-transform duration-300", collapsed && "rotate-180")} />
          </button>
        )}
      </div>

      {(!collapsed || isMobile) && (
        <div className="mx-3 mt-3 mb-1 px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20">
          <p className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">Cashier Station</p>
        </div>
      )}
      {collapsed && !isMobile && <div className="mt-3 mb-1" />}

      <NavLinks onClose={isMobile ? () => setMobileOpen(false) : undefined} />

      <div className="border-t border-black/[0.06] dark:border-white/[0.06] p-2 flex-shrink-0">
        <div className={cn("flex items-center gap-2.5 rounded-xl p-2 hover:bg-gray-50 dark:hover:bg-white/[0.04] transition-colors cursor-pointer", collapsed && !isMobile ? "justify-center" : "")}>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 text-white flex items-center justify-center text-sm font-black flex-shrink-0">S</div>
          {(!collapsed || isMobile) && (
            <div className="min-w-0">
              <p className="text-xs font-semibold text-gray-900 dark:text-gray-100 truncate">Siti Rahayu</p>
              <p className="text-[10px] text-gray-400 truncate">Cashier · Shift Pagi</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      <aside className={cn("hidden lg:flex flex-col fixed left-0 top-0 h-screen z-30 border-r border-black/[0.06] dark:border-white/[0.06] sidebar-transition overflow-hidden", collapsed ? "w-[64px]" : "w-[240px]")}>
        <SidebarShell />
      </aside>
      <button onClick={() => setMobileOpen(true)} className="lg:hidden fixed top-3.5 left-4 z-40 w-9 h-9 rounded-xl bg-white dark:bg-[#0a101e] border border-black/[0.06] dark:border-white/[0.06] shadow-sm flex items-center justify-center text-gray-500 dark:text-gray-400">
        <Menu className="w-4 h-4" />
      </button>
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <aside className="relative w-64 h-full shadow-2xl"><SidebarShell isMobile /></aside>
        </div>
      )}
    </>
  );
}
