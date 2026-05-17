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
  const { dark: _dark, mounted, toggle } = useTheme();
  const dark = mounted ? _dark : false;
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

  // close mobile menu on route change
  useEffect(() => { setMobileOpen(false); }, [pathname]);

  const handleNavSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = navSearch.trim();
    if (!q) return;
    if (pathname === "/") {
      window.dispatchEvent(new CustomEvent("navbar-search", { detail: q }));
      document.getElementById("products-section")?.scrollIntoView({ behavior:"smooth" });
    } else {
      router.push(`/?q=${encodeURIComponent(q)}`);
    }
    setNavSearch("");
    setMobileOpen(false);
  };

  const navBg = dark
    ? scrolled ? "rgba(7,5,15,.97)"  : "rgba(7,5,15,.90)"
    : scrolled ? "rgba(255,255,255,.98)" : "rgba(255,255,255,.92)";

  return (
    <>
      <header style={{ position:"fixed", top:0, left:0, right:0, zIndex:100 }}>
        <div style={{
          background: navBg,
          backdropFilter: "blur(24px) saturate(180%)",
          WebkitBackdropFilter: "blur(24px) saturate(180%)",
          borderBottom: `1px solid ${scrolled ? "var(--border2)" : "var(--border)"}`,
          boxShadow: scrolled
            ? dark ? "0 4px 24px rgba(0,0,0,.5)" : "0 4px 24px rgba(0,0,0,.08)"
            : "none",
          transition: "background .25s, box-shadow .25s, border-color .25s",
        }}>
          <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 16px" }}>
            <div style={{ display:"flex", alignItems:"center", height:60, gap:10 }}>

              {/* Logo */}
              <Link href="/" style={{ display:"flex", alignItems:"center", gap:9, flexShrink:0, textDecoration:"none" }}>
                <div style={{
                  width:32, height:32, borderRadius:10,
                  background:"linear-gradient(135deg,#6366f1,#8b5cf6)",
                  boxShadow:"0 3px 12px rgba(99,102,241,.40)",
                  display:"flex", alignItems:"center", justifyContent:"center",
                }}>
                  <Zap style={{ width:16, height:16, color:"#fff", strokeWidth:2.5 }}/>
                </div>
                <span style={{
                  fontWeight:900, fontSize:17, lineHeight:1,
                  color:"var(--text)", fontFamily:"Outfit,sans-serif",
                }}>
                  Nexa<span style={{ color:"#6366f1" }}>Sell</span>
                </span>
              </Link>

              {/* Desktop search */}
              <form onSubmit={handleNavSearch} style={{ display:"none", flex:1, maxWidth:260, margin:"0 12px" }} className="nav-search-desktop">
                <div style={{ position:"relative", width:"100%" }}>
                  <Search style={{ position:"absolute", left:10, top:"50%", transform:"translateY(-50%)", width:14, height:14, color:"var(--text3)", pointerEvents:"none" }}/>
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder="Cari produk…"
                    value={navSearch}
                    onChange={e=>setNavSearch(e.target.value)}
                    style={{
                      width:"100%", paddingLeft:32, paddingRight:navSearch ? 60 : 12,
                      paddingTop:7, paddingBottom:7,
                      borderRadius:12, fontSize:12, fontWeight:600,
                      outline:"none", background:"var(--surface2)",
                      border:"1px solid var(--border)", color:"var(--text)",
                      transition:"border-color .2s, box-shadow .2s",
                    }}
                    onFocus={e=>{ e.target.style.borderColor="#6366f1"; e.target.style.boxShadow="0 0 0 3px rgba(99,102,241,.15)"; }}
                    onBlur={e=>{ e.target.style.borderColor="var(--border)"; e.target.style.boxShadow="none"; }}
                  />
                  {navSearch && (
                    <button type="submit" style={{
                      position:"absolute", right:6, top:"50%", transform:"translateY(-50%)",
                      padding:"3px 8px", borderRadius:8, fontSize:10, fontWeight:900,
                      color:"#fff", border:"none", cursor:"pointer",
                      background:"linear-gradient(135deg,#6366f1,#7c3aed)",
                    }}>Cari</button>
                  )}
                </div>
              </form>

              {/* Desktop role nav */}
              <nav style={{ display:"none", alignItems:"center", gap:2, padding:4, borderRadius:18, marginLeft:"auto", background:"var(--surface2)", border:"1px solid var(--border)" }} className="nav-roles-desktop">
                {roles.map(({ href, label, icon:Icon, match }) => {
                  const active = match(pathname);
                  return (
                    <Link key={href} href={href} style={{
                      display:"flex", alignItems:"center", gap:6,
                      padding:"6px 14px", borderRadius:14,
                      fontSize:12, fontWeight:700, textDecoration:"none",
                      background: active ? "linear-gradient(135deg,#6366f1,#8b5cf6)" : "transparent",
                      color: active ? "#fff" : "var(--text2)",
                      boxShadow: active ? "0 2px 10px rgba(99,102,241,.38)" : "none",
                      transition:"all .2s",
                    }}>
                      <Icon style={{ width:13, height:13 }}/>{label}
                    </Link>
                  );
                })}
              </nav>

              {/* Actions */}
              <div style={{ display:"flex", alignItems:"center", gap:6, marginLeft:"auto" }} className="nav-actions">
                {/* theme toggle */}
                <button onClick={toggle} style={{
                  width:34, height:34, borderRadius:10, border:"1px solid var(--border)",
                  background:"var(--surface2)", display:"flex", alignItems:"center", justifyContent:"center",
                  cursor:"pointer", flexShrink:0,
                }}>
                  {dark
                    ? <Sun style={{ width:15, height:15, color:"#fbbf24" }}/>
                    : <Moon style={{ width:15, height:15, color:"var(--text2)" }}/>}
                </button>

                {/* cart */}
                <Link href="/customer/cart" style={{
                  position:"relative", width:34, height:34, borderRadius:10,
                  border:"1px solid var(--border)", background:"var(--surface2)",
                  display:"flex", alignItems:"center", justifyContent:"center",
                  textDecoration:"none", flexShrink:0,
                }}>
                  <ShoppingCart style={{ width:15, height:15, color:"var(--text2)" }}/>
                  {itemCount > 0 && (
                    <span style={{
                      position:"absolute", top:-5, right:-5,
                      width:16, height:16, borderRadius:"50%",
                      background:"linear-gradient(135deg,#f43f5e,#e11d48)",
                      boxShadow:"0 2px 6px rgba(244,63,94,.45)",
                      display:"flex", alignItems:"center", justifyContent:"center",
                      color:"#fff", fontSize:9, fontWeight:900,
                    }}>
                      {itemCount > 9 ? "9+" : itemCount}
                    </span>
                  )}
                </Link>

                {/* hamburger — mobile only */}
                <button onClick={()=>setMobileOpen(!mobileOpen)} style={{
                  width:34, height:34, borderRadius:10, border:"1px solid var(--border)",
                  background:"var(--surface2)", display:"flex", alignItems:"center", justifyContent:"center",
                  cursor:"pointer", flexShrink:0,
                }} className="nav-hamburger">
                  {mobileOpen
                    ? <X style={{ width:15, height:15, color:"var(--text2)" }}/>
                    : <Menu style={{ width:15, height:15, color:"var(--text2)" }}/>}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile dropdown */}
          {mobileOpen && (
            <div style={{
              borderTop:"1px solid var(--border)",
              background: navBg,
              padding:"12px 16px 16px",
            }} className="nav-mobile-menu">
              {/* Mobile search */}
              <form onSubmit={handleNavSearch} style={{ position:"relative", marginBottom:10 }}>
                <Search style={{ position:"absolute", left:12, top:"50%", transform:"translateY(-50%)", width:15, height:15, color:"var(--text3)", pointerEvents:"none" }}/>
                <input type="text" placeholder="Cari produk…"
                  value={navSearch} onChange={e=>setNavSearch(e.target.value)}
                  style={{
                    width:"100%", paddingLeft:38, paddingRight:12, paddingTop:10, paddingBottom:10,
                    borderRadius:12, fontSize:14, fontWeight:500, outline:"none",
                    background:"var(--surface2)", border:"1px solid var(--border)", color:"var(--text)",
                    boxSizing:"border-box",
                  }}
                />
              </form>
              {/* Mobile role links */}
              <div style={{ display:"flex", flexDirection:"column", gap:4 }}>
                {roles.map(({ href, label, icon:Icon, match }) => {
                  const active = match(pathname);
                  return (
                    <Link key={href} href={href}
                      style={{
                        display:"flex", alignItems:"center", gap:12,
                        padding:"12px 16px", borderRadius:14,
                        fontSize:14, fontWeight:600, textDecoration:"none",
                        background: active ? "linear-gradient(135deg,#6366f1,#8b5cf6)" : "transparent",
                        color: active ? "#fff" : "var(--text2)",
                      }}>
                      <Icon style={{ width:16, height:16 }}/>{label}
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Bottom accent line */}
        <div style={{
          height:1,
          background:"linear-gradient(90deg,transparent,rgba(99,102,241,.5),rgba(139,92,246,.5),transparent)",
        }}/>
      </header>

      {/* Responsive styles */}
      <style>{`
        .nav-search-desktop  { display: none !important; }
        .nav-roles-desktop   { display: none !important; }
        .nav-hamburger       { display: flex !important; }

        @media (min-width: 768px) {
          .nav-search-desktop  { display: flex !important; }
          .nav-roles-desktop   { display: flex !important; }
          .nav-hamburger       { display: none !important; }
          .nav-mobile-menu     { display: none !important; }
          .nav-actions         { margin-left: 0 !important; }
        }
      `}</style>

      {/* Spacer: navbar 60px + accent line 1px */}
      <div style={{ height:61 }} aria-hidden/>
    </>
  );
}
