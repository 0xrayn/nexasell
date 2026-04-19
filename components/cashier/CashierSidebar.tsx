"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, History, X, Menu, ChevronRight, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/lib/SidebarContext";

const navItems = [
  { href: "/cashier",         label: "POS Terminal", icon: ShoppingBag, color: "text-emerald-500" },
  { href: "/cashier/history", label: "History",      icon: History,     color: "text-teal-500" },
];

function SidebarInner({ isMobile = false }: { isMobile?: boolean }) {
  const pathname = usePathname();
  const { collapsed, toggle, setMobileOpen } = useSidebar();
  const isCollapsed = collapsed && !isMobile;
  const close = () => { if (isMobile) setMobileOpen(false); };

  return (
    <div className="flex flex-col h-full bg-[var(--surface)] overflow-hidden">
      <div className={cn("flex items-center h-16 px-4 border-b border-[var(--border)] flex-shrink-0 gap-3", isCollapsed && "justify-center px-2")}>
        <Link href="/" onClick={close} className="flex items-center gap-2.5 flex-1 min-w-0 overflow-hidden">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center flex-shrink-0 shadow-md shadow-emerald-500/25">
            <Zap className="w-4 h-4 text-white" />
          </div>
          {!isCollapsed && (
            <span className="font-black text-base text-[var(--text)] truncate" style={{ fontFamily: "Cabinet Grotesk, sans-serif" }}>
              Nexa<span className="text-emerald-500">Sell</span>
            </span>
          )}
        </Link>
        {isMobile ? (
          <button onClick={close} className="w-8 h-8 rounded-xl flex items-center justify-center hover:bg-[var(--surface2)] text-[var(--text2)] flex-shrink-0">
            <X className="w-4 h-4" />
          </button>
        ) : (
          <button onClick={toggle} className="w-8 h-8 rounded-xl flex items-center justify-center hover:bg-[var(--surface2)] text-[var(--text2)] transition-colors flex-shrink-0">
            <ChevronRight className={cn("w-4 h-4 transition-transform duration-300", !collapsed && "rotate-180")} />
          </button>
        )}
      </div>

      {!isCollapsed && (
        <div className="mx-3 mt-3 px-3 py-2 rounded-xl bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20">
          <p className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.15em]">Cashier Station</p>
        </div>
      )}
      {isCollapsed && <div className="h-3" />}

      <nav className="flex-1 px-2 py-2 space-y-0.5 overflow-y-auto overflow-x-hidden">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;
          return (
            <Link key={item.href} href={item.href} onClick={close} title={isCollapsed ? item.label : undefined}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 relative",
                isCollapsed && "justify-center",
                active ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" : "text-[var(--text2)] hover:bg-[var(--surface2)] hover:text-[var(--text)]"
              )}>
              {active && !isCollapsed && <span className="absolute left-0 inset-y-2 w-0.5 bg-emerald-500 rounded-r-full" />}
              <Icon className={cn("w-4 h-4 flex-shrink-0", active ? item.color : "")} />
              {!isCollapsed && <span className="truncate">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="p-2 border-t border-[var(--border)] flex-shrink-0">
        <div className={cn("flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-[var(--surface2)] transition-colors", isCollapsed && "justify-center")}>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center text-sm font-black flex-shrink-0">S</div>
          {!isCollapsed && (
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-[var(--text)] truncate">Siti Rahayu</p>
              <p className="text-[10px] text-[var(--text2)] truncate">Cashier · Shift Pagi</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function CashierSidebar() {
  const { collapsed, mobileOpen, setMobileOpen } = useSidebar();
  return (
    <>
      <aside className={cn("hidden lg:flex flex-col fixed left-0 top-0 h-screen z-30 border-r border-[var(--border)] sidebar-transition", collapsed ? "w-[64px]" : "w-[248px]")}>
        <SidebarInner />
      </aside>
      <button onClick={() => setMobileOpen(true)} className="lg:hidden fixed top-4 left-4 z-40 w-9 h-9 rounded-xl bg-[var(--surface)] border border-[var(--border)] shadow-sm flex items-center justify-center text-[var(--text2)]">
        <Menu className="w-4 h-4" />
      </button>
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <aside className="relative w-64 h-full shadow-2xl"><SidebarInner isMobile /></aside>
        </div>
      )}
    </>
  );
}
