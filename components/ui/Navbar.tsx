"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart, Sun, Moon, Menu, X, Zap, ShieldCheck, CreditCard, Store, Search } from "lucide-react";
import { useCart } from "@/lib/CartContext";
import { useTheme } from "@/lib/ThemeContext";
import { useState, useEffect } from "react";

const roles = [
  { href: "/",        label: "Toko",  icon: Store,       match: (p: string) => p === "/" || p.startsWith("/customer") },
  { href: "/admin",   label: "Admin", icon: ShieldCheck, match: (p: string) => p.startsWith("/admin") },
  { href: "/cashier", label: "Kasir", icon: CreditCard,  match: (p: string) => p.startsWith("/cashier") },
];

export default function Navbar() {
  const { itemCount } = useCart();
  const { dark, toggle } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="sticky top-0 z-50 w-full"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      <div
        style={{
          background: dark
            ? scrolled ? "rgba(12,17,32,0.97)" : "rgba(12,17,32,0.92)"
            : scrolled ? "rgba(255,255,255,0.98)" : "rgba(255,255,255,0.90)",
          backdropFilter: "blur(24px) saturate(180%)",
          WebkitBackdropFilter: "blur(24px) saturate(180%)",
          borderBottom: `1px solid ${scrolled ? "var(--border2)" : "var(--border)"}`,
          boxShadow: scrolled ? (dark ? "0 4px 24px rgba(0,0,0,0.4)" : "0 4px 24px rgba(0,0,0,0.08)") : "none",
          transition: "all 0.3s ease",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center h-16 gap-3">

            {/* ── Logo ── */}
            <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center anim-gradient"
                style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6,#6366f1)", backgroundSize: "300% 300%", boxShadow: "0 3px 12px rgba(99,102,241,0.38)" }}>
                <Zap className="w-4 h-4 text-white" strokeWidth={2.5} />
              </div>
              <div className="hidden sm:block">
                <p className="font-black text-[17px] leading-none" style={{ color: "var(--text)", fontFamily: "Outfit,sans-serif" }}>
                  Nexa<span style={{ color: "#6366f1" }}>Sell</span>
                </p>
              </div>
            </Link>

            {/* ── Desktop search ── */}
            <div className="hidden lg:flex flex-1 max-w-xs mx-4">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style={{ color: "var(--text3)" }} />
                <input type="text" placeholder="Cari produk…"
                  className="w-full pl-9 pr-3 py-2 rounded-xl text-xs font-medium outline-none transition-all"
                  style={{ background: "var(--surface2)", border: "1px solid var(--border)", color: "var(--text)" }}
                  onFocus={e => (e.target.style.borderColor = "#6366f1")}
                  onBlur={e => (e.target.style.borderColor = "var(--border)")} />
              </div>
            </div>

            {/* ── Role pills ── */}
            <nav className="hidden md:flex items-center gap-0.5 rounded-2xl p-1 ml-auto"
              style={{ background: "var(--surface2)", border: "1px solid var(--border)" }}>
              {roles.map(({ href, label, icon: Icon, match }) => {
                const active = match(pathname);
                return (
                  <Link key={href} href={href}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-200"
                    style={active
                      ? { background: "linear-gradient(135deg,#6366f1,#8b5cf6)", color: "#fff", boxShadow: "0 2px 10px rgba(99,102,241,0.38)" }
                      : { color: "var(--text2)" }
                    }>
                    <Icon className="w-3 h-3" />
                    {label}
                  </Link>
                );
              })}
            </nav>

            {/* ── Actions ── */}
            <div className="flex items-center gap-1.5 md:ml-2">
              <button onClick={toggle}
                className="w-8 h-8 rounded-xl flex items-center justify-center transition-all"
                style={{ background: "var(--surface2)", border: "1px solid var(--border)" }}>
                {dark ? <Sun className="w-3.5 h-3.5" style={{ color: "#fbbf24" }} /> : <Moon className="w-3.5 h-3.5" style={{ color: "var(--text2)" }} />}
              </button>

              <Link href="/customer/cart"
                className="relative w-8 h-8 rounded-xl flex items-center justify-center transition-all"
                style={{ background: "var(--surface2)", border: "1px solid var(--border)" }}>
                <ShoppingCart className="w-3.5 h-3.5" style={{ color: "var(--text2)" }} />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 text-white text-[9px] font-black rounded-full w-4 h-4 flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg,#f43f5e,#e11d48)", boxShadow: "0 2px 6px rgba(244,63,94,0.45)" }}>
                    {itemCount > 9 ? "9+" : itemCount}
                  </span>
                )}
              </Link>

              <button onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden w-8 h-8 rounded-xl flex items-center justify-center"
                style={{ background: "var(--surface2)", border: "1px solid var(--border)" }}>
                {mobileOpen ? <X className="w-3.5 h-3.5" style={{ color: "var(--text2)" }} /> : <Menu className="w-3.5 h-3.5" style={{ color: "var(--text2)" }} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileOpen && (
          <div className="md:hidden px-4 pb-3 pt-1 space-y-1 anim-slide-up"
            style={{ borderTop: "1px solid var(--border)" }}>
            {/* Mobile search */}
            <div className="relative mb-2">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style={{ color: "var(--text3)" }} />
              <input type="text" placeholder="Cari produk…"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl text-sm font-medium outline-none"
                style={{ background: "var(--surface2)", border: "1px solid var(--border)", color: "var(--text)" }} />
            </div>
            {roles.map(({ href, label, icon: Icon, match }) => {
              const active = match(pathname);
              return (
                <Link key={href} href={href} onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold"
                  style={active
                    ? { background: "linear-gradient(135deg,#6366f1,#8b5cf6)", color: "#fff" }
                    : { color: "var(--text2)" }
                  }>
                  <Icon className="w-4 h-4" />
                  {label}
                </Link>
              );
            })}
          </div>
        )}
      </div>

      {/* Gradient accent line */}
      <div className="h-px"
        style={{ background: "linear-gradient(90deg,transparent 0%,rgba(99,102,241,0.45) 40%,rgba(139,92,246,0.45) 60%,transparent 100%)" }} />
    </header>
  );
}
