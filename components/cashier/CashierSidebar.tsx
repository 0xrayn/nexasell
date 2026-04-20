"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ShoppingBag, History, X, Menu, Zap, Settings, User, ChevronRight, ChevronLeft, KeyRound, LogOut } from "lucide-react";
import { useSidebar } from "@/lib/SidebarContext";
import { useState } from "react";

const nav = [
  { href: "/cashier",         label: "POS Terminal", icon: ShoppingBag, color: "#10b981", bg: "rgba(16,185,129,0.12)" },
  { href: "/cashier/history", label: "History",      icon: History,     color: "#06b6d4", bg: "rgba(6,182,212,0.12)" },
];

function UserMenu({ collapsed, isMobile }: { collapsed: boolean; isMobile: boolean }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const isCol = collapsed && !isMobile;

  return (
    <div className="relative">
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute bottom-full mb-2 left-0 right-0 z-50 rounded-2xl overflow-hidden shadow-2xl"
            style={{ background: "var(--surface)", border: "1px solid var(--border)", minWidth: 200 }}>
            <div className="px-4 py-3" style={{ borderBottom: "1px solid var(--border)" }}>
              <p className="text-xs font-black" style={{ color: "var(--text)" }}>Siti Rahayu</p>
              <p className="text-[10px]" style={{ color: "var(--text3)" }}>Cashier · Shift Pagi</p>
            </div>
            {[
              { icon: User, label: "Edit Profil" },
              { icon: KeyRound, label: "Ganti Password" },
              { icon: Settings, label: "Pengaturan" },
            ].map(({ icon: Icon, label }) => (
              <button key={label} onClick={() => setOpen(false)}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-left"
                style={{ color: "var(--text2)" }}
                onMouseEnter={e => (e.currentTarget.style.background = "var(--surface2)")}
                onMouseLeave={e => (e.currentTarget.style.background = "")}>
                <Icon className="w-4 h-4" style={{ color: "var(--text3)" }} />
                {label}
              </button>
            ))}
            <div style={{ borderTop: "1px solid var(--border)" }}>
              <button onClick={() => router.push("/cashier/login")}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-bold"
                style={{ color: "#ef4444" }}
                onMouseEnter={e => (e.currentTarget.style.background = "rgba(239,68,68,0.06)")}
                onMouseLeave={e => (e.currentTarget.style.background = "")}>
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </>
      )}
      <button onClick={() => setOpen(o => !o)}
        className="w-full flex items-center gap-2.5 p-2.5 rounded-2xl transition-all"
        style={{ ...(isCol ? { justifyContent: "center" } : {}) }}
        onMouseEnter={e => (e.currentTarget.style.background = "var(--surface2)")}
        onMouseLeave={e => (e.currentTarget.style.background = "")}>
        <div className="relative flex-shrink-0">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-sm font-black"
            style={{ background: "linear-gradient(135deg,#10b981,#06b6d4)" }}>S</div>
          <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2"
            style={{ background: "#10b981", borderColor: "var(--surface)" }} />
        </div>
        {!isCol && (
          <>
            <div className="flex-1 min-w-0 text-left">
              <p className="text-xs font-bold truncate" style={{ color: "var(--text)" }}>Siti Rahayu</p>
              <p className="text-[10px] truncate" style={{ color: "var(--text3)" }}>Cashier · Shift Pagi</p>
            </div>
            <Settings className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "var(--text3)" }} />
          </>
        )}
      </button>
    </div>
  );
}

function SidebarContent({ isMobile = false }: { isMobile?: boolean }) {
  const pathname = usePathname();
  const { collapsed, toggle, setMobileOpen } = useSidebar();
  const isCol = collapsed && !isMobile;
  const close = () => isMobile && setMobileOpen(false);

  return (
    <div className="flex flex-col h-full" style={{ background: "var(--surface)", borderRight: "1px solid var(--border)" }}>
      <div className="flex items-center h-[64px] flex-shrink-0 px-4 gap-3" style={{ borderBottom: "1px solid var(--border)" }}>
        <Link href="/" onClick={close} className="flex-shrink-0">
          <div className="w-9 h-9 rounded-2xl flex items-center justify-center"
            style={{ background: "linear-gradient(135deg,#10b981,#06b6d4)", boxShadow: "0 3px 14px rgba(16,185,129,0.38)" }}>
            <Zap className="w-4 h-4 text-white" strokeWidth={2.5} />
          </div>
        </Link>
        {!isCol && (
          <div className="flex-1 min-w-0 overflow-hidden">
            <p className="font-black text-[15px] leading-none" style={{ color: "var(--text)", fontFamily: "Outfit,sans-serif" }}>
              Nexa<span style={{ color: "#10b981" }}>Sell</span>
            </p>
            <p className="text-[9px] font-bold tracking-[0.18em] uppercase mt-0.5" style={{ color: "var(--text3)" }}>Cashier Station</p>
          </div>
        )}
        {!isMobile && (
          <button onClick={toggle} className="flex-shrink-0 w-7 h-7 rounded-xl flex items-center justify-center transition-all ml-auto"
            style={{ background: "var(--surface2)", border: "1px solid var(--border)" }}
            title={isCol ? "Expand" : "Collapse"}>
            {isCol
              ? <ChevronRight className="w-3.5 h-3.5" style={{ color: "var(--text2)" }} />
              : <ChevronLeft className="w-3.5 h-3.5" style={{ color: "var(--text2)" }} />
            }
          </button>
        )}
        {isMobile && (
          <button onClick={close} className="ml-auto w-7 h-7 rounded-xl flex items-center justify-center" style={{ background: "var(--surface2)", border: "1px solid var(--border)" }}>
            <X className="w-3.5 h-3.5" style={{ color: "var(--text2)" }} />
          </button>
        )}
      </div>

      {!isCol && <p className="text-[9px] font-black uppercase tracking-[0.2em] px-4 pt-5 pb-1" style={{ color: "var(--text3)" }}>Navigation</p>}
      {isCol && <div className="pt-3" />}

      <nav className="flex-1 px-2 space-y-0.5 overflow-y-auto overflow-x-hidden pb-2">
        {nav.map(item => {
          const Icon = item.icon;
          const active = pathname === item.href;
          return (
            <Link key={item.href} href={item.href} onClick={close} title={isCol ? item.label : undefined}
              className="flex items-center gap-3 px-3 py-2.5 rounded-2xl text-sm font-semibold transition-all relative"
              style={{ justifyContent: isCol ? "center" : undefined, background: active ? item.bg : undefined, color: active ? item.color : "var(--text2)" }}
              onMouseEnter={e => { if (!active) e.currentTarget.style.background = "var(--surface2)"; }}
              onMouseLeave={e => { if (!active) e.currentTarget.style.background = ""; }}>
              {active && !isCol && <span className="absolute left-0 top-3 bottom-3 w-0.5 rounded-r-full" style={{ background: item.color }} />}
              <span className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: active ? item.bg : "var(--surface2)", border: `1px solid ${active ? item.color + "30" : "var(--border)"}` }}>
                <Icon className="w-4 h-4" style={{ color: active ? item.color : "var(--text3)" }} />
              </span>
              {!isCol && <span className="truncate">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="px-2 pb-3 flex-shrink-0" style={{ borderTop: "1px solid var(--border)", paddingTop: 8 }}>
        <UserMenu collapsed={collapsed} isMobile={isMobile} />
      </div>
    </div>
  );
}

export default function CashierSidebar() {
  const { collapsed, mobileOpen, setMobileOpen } = useSidebar();
  return (
    <>
      <aside className="hidden lg:flex flex-col fixed left-0 top-0 h-screen z-30 sidebar-transition overflow-visible" style={{ width: collapsed ? 68 : 256 }}>
        <SidebarContent />
      </aside>
      <button onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-40 flex items-center gap-2 px-3 py-2 rounded-xl shadow-md"
        style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
        <Menu className="w-4 h-4" style={{ color: "var(--text2)" }} />
        <span className="text-xs font-bold" style={{ color: "var(--text2)" }}>Menu</span>
      </button>
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)" }} onClick={() => setMobileOpen(false)} />
          <aside className="relative flex flex-col shadow-2xl overflow-hidden" style={{ width: 260 }}>
            <SidebarContent isMobile />
          </aside>
        </div>
      )}
    </>
  );
}
