"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ShoppingCart, Sun, Moon, Menu, X,
  Zap, ShieldCheck, CreditCard, Store, Search
} from "lucide-react";
import { useCart } from "@/lib/CartContext";
import { useTheme } from "@/lib/ThemeContext";
import { useState, useEffect, useRef } from "react";

const roles = [
  { href:"/",        label:"Toko",  icon:Store,       match:(p:string)=>p==="/"||p.startsWith("/customer") },
  { href:"/admin",   label:"Admin", icon:ShieldCheck, match:(p:string)=>p.startsWith("/admin") },
  { href:"/cashier", label:"Kasir", icon:CreditCard,  match:(p:string)=>p.startsWith("/cashier") },
];

export default function Navbar() {
  const { itemCount } = useCart();
  const { dark, toggle } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled]     = useState(false);
  const [navSearch, setNavSearch]   = useState("");
  const pathname = usePathname();
  const router   = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", fn, { passive:true });
    return () => window.removeEventListener("scroll", fn);
  }, []);



  const handleNavSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = navSearch.trim();
    if (!q) return;
    /* Navigate to homepage, then after mount the homepage search will take the query.
       We use a custom event that page.tsx can listen to, or simply push with hash */
    if (pathname === "/") {
      /* If already on homepage, dispatch a custom event that page.tsx handles */
      window.dispatchEvent(new CustomEvent("navbar-search", { detail: q }));
      document.getElementById("products-section")?.scrollIntoView({ behavior:"smooth" });
    } else {
      router.push(`/?q=${encodeURIComponent(q)}`);
    }
    setNavSearch("");
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50">
        <div style={{
          background: dark
            ? scrolled ? "rgba(7,5,15,.97)"  : "rgba(7,5,15,.90)"
            : scrolled ? "rgba(255,255,255,.98)" : "rgba(255,255,255,.92)",
          backdropFilter: "blur(24px) saturate(180%)",
          WebkitBackdropFilter: "blur(24px) saturate(180%)",
          borderBottom: `1px solid ${scrolled ? "var(--border2)" : "var(--border)"}`,
          boxShadow: scrolled
            ? dark ? "0 4px 24px rgba(0,0,0,.5)" : "0 4px 24px rgba(0,0,0,.08)"
            : "none",
          transition: "background .25s, box-shadow .25s, border-color .25s",
        }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex items-center h-[65px] gap-3">

              {/* Logo */}
              <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center"
                  style={{ background:"linear-gradient(135deg,#6366f1,#8b5cf6)", boxShadow:"0 3px 12px rgba(99,102,241,.40)" }}>
                  <Zap className="w-4 h-4 text-white" strokeWidth={2.5}/>
                </div>
                <p className="font-black text-[17px] leading-none hidden sm:block"
                  style={{ color:"var(--text)", fontFamily:"Outfit,sans-serif" }}>
                  Nexa<span style={{ color:"#6366f1" }}>Sell</span>
                </p>
              </Link>

              {/* Desktop search — functional */}
              <form onSubmit={handleNavSearch} className="hidden lg:flex flex-1 max-w-xs mx-4">
                <div className="relative w-full flex items-center">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none"
                    style={{ color:"var(--text3)" }}/>
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder="Cari produk…"
                    value={navSearch}
                    onChange={e=>setNavSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl text-xs font-medium outline-none"
                    style={{
                      background:"var(--surface2)",
                      border:"1px solid var(--border)",
                      color:"var(--text)",
                      transition:"border-color .2s, box-shadow .2s",
                    }}
                    onFocus={e=>{e.target.style.borderColor="#6366f1";e.target.style.boxShadow="0 0 0 3px rgba(99,102,241,.15)";}}
                    onBlur={e=>{e.target.style.borderColor="var(--border)";e.target.style.boxShadow="none";}}
                  />
                  {navSearch && (
                    <button type="submit"
                      className="absolute right-2 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-lg text-[10px] font-black text-white"
                      style={{ background:"linear-gradient(135deg,#6366f1,#7c3aed)" }}>
                      Cari
                    </button>
                  )}
                </div>
              </form>

              {/* Role nav */}
              <nav className="hidden md:flex items-center gap-0.5 p-1 rounded-2xl ml-auto"
                style={{ background:"var(--surface2)", border:"1px solid var(--border)" }}>
                {roles.map(({ href, label, icon:Icon, match }) => {
                  const active = match(pathname);
                  return (
                    <Link key={href} href={href}
                      className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold"
                      style={{
                        background: active ? "linear-gradient(135deg,#6366f1,#8b5cf6)" : "transparent",
                        color: active ? "#fff" : "var(--text2)",
                        boxShadow: active ? "0 2px 10px rgba(99,102,241,.38)" : "none",
                        transition: "all .2s",
                      }}>
                      <Icon className="w-3 h-3"/>{label}
                    </Link>
                  );
                })}
              </nav>

              {/* Actions */}
              <div className="flex items-center gap-1.5 md:ml-2">
                <button onClick={toggle}
                  className="w-8 h-8 rounded-xl flex items-center justify-center"
                  style={{ background:"var(--surface2)", border:"1px solid var(--border)", transition:"background .15s" }}
                  onMouseEnter={e=>(e.currentTarget.style.background="var(--surface3)")}
                  onMouseLeave={e=>(e.currentTarget.style.background="var(--surface2)")}>
                  {dark
                    ? <Sun className="w-3.5 h-3.5" style={{ color:"#fbbf24" }}/>
                    : <Moon className="w-3.5 h-3.5" style={{ color:"var(--text2)" }}/>}
                </button>

                <Link href="/customer/cart"
                  className="relative w-8 h-8 rounded-xl flex items-center justify-center"
                  style={{ background:"var(--surface2)", border:"1px solid var(--border)", transition:"background .15s" }}
                  onMouseEnter={e=>(e.currentTarget.style.background="var(--surface3)")}
                  onMouseLeave={e=>(e.currentTarget.style.background="var(--surface2)")}>
                  <ShoppingCart className="w-3.5 h-3.5" style={{ color:"var(--text2)" }}/>
                  {itemCount > 0 && (
                    <span className="absolute -top-1 -right-1 text-white text-[9px] font-black rounded-full w-4 h-4 flex items-center justify-center"
                      style={{ background:"linear-gradient(135deg,#f43f5e,#e11d48)", boxShadow:"0 2px 6px rgba(244,63,94,.45)" }}>
                      {itemCount>9?"9+":itemCount}
                    </span>
                  )}
                </Link>

                <button onClick={()=>setMobileOpen(!mobileOpen)}
                  className="md:hidden w-8 h-8 rounded-xl flex items-center justify-center"
                  style={{ background:"var(--surface2)", border:"1px solid var(--border)" }}>
                  {mobileOpen
                    ? <X className="w-3.5 h-3.5" style={{ color:"var(--text2)" }}/>
                    : <Menu className="w-3.5 h-3.5" style={{ color:"var(--text2)" }}/>}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile dropdown */}
          {mobileOpen && (
            <div className="md:hidden px-4 pb-4 pt-2 space-y-1"
              style={{ borderTop:"1px solid var(--border)" }}>
              {/* Mobile search */}
              <form onSubmit={handleNavSearch} className="relative mb-2">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style={{ color:"var(--text3)" }}/>
                <input type="text" placeholder="Cari produk…"
                  value={navSearch} onChange={e=>setNavSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl text-sm font-medium outline-none"
                  style={{ background:"var(--surface2)", border:"1px solid var(--border)", color:"var(--text)" }}/>
              </form>
              {roles.map(({ href, label, icon:Icon, match }) => {
                const active = match(pathname);
                return (
                  <Link key={href} href={href} onClick={()=>setMobileOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold"
                    style={{
                      background: active ? "linear-gradient(135deg,#6366f1,#8b5cf6)" : "transparent",
                      color: active ? "#fff" : "var(--text2)",
                    }}>
                    <Icon className="w-4 h-4"/>{label}
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        {/* Bottom accent line */}
        <div className="h-px" style={{
          background: "linear-gradient(90deg,transparent,rgba(99,102,241,.5),rgba(139,92,246,.5),transparent)",
        }}/>
      </header>

      {/* One single spacer = navbar height (65px) + 1px accent line */}
      <div style={{ height: 66 }} aria-hidden/>
    </>
  );
}
