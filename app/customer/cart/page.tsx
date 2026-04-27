"use client";
import Link from "next/link";
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, ShieldCheck, Zap, Gift } from "lucide-react";
import { useCart } from "@/lib/CartContext";
import { formatRupiah } from "@/lib/utils";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";

export default function CartPage() {
  const { items, removeItem, updateQuantity, total, clearCart, itemCount } = useCart();

  /* ─── EMPTY STATE ─── */
  if (items.length === 0) return (
    <>
      <style>{`
        .cart-empty-wrap {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          background: var(--bg);
        }
        .cart-empty-body {
          /* Navbar is 66px tall (65px + 1px accent line) */
          min-height: calc(100vh - 66px);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 28px;
          padding: 60px 16px;
          position: relative;
          overflow: hidden;
        }
        /* big blurred circles for depth */
        .cart-empty-body::before {
          content: "";
          position: absolute;
          width: 500px; height: 500px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(99,102,241,0.09) 0%, transparent 70%);
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
        }
        .cart-empty-body::after {
          content: "";
          position: absolute;
          width: 300px; height: 300px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(139,92,246,0.07) 0%, transparent 70%);
          top: 30%; right: 20%;
          pointer-events: none;
        }
        .empty-bag-ring {
          animation: emptyRingSpin 12s linear infinite;
        }
        @keyframes emptyRingSpin {
          to { transform: rotate(360deg); }
        }
        .empty-bag-icon {
          animation: emptyBobble 3.5s ease-in-out infinite;
        }
        @keyframes emptyBobble {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        .empty-perk {
          display: flex; align-items: center; gap: 8px;
          padding: 10px 18px; border-radius: 40px;
          background: var(--surface);
          border: 1px solid var(--border);
          font-size: 12px; font-weight: 700;
          color: var(--text2);
          transition: border-color 0.2s, transform 0.2s;
        }
        .empty-perk:hover {
          border-color: rgba(99,102,241,0.35);
          transform: translateY(-2px);
        }
      `}</style>

      <div className="cart-empty-wrap">
        <Navbar />
        <div className="cart-empty-body">

          {/* Animated icon area */}
          <div style={{ position: "relative", width: 160, height: 160, zIndex: 1 }}>
            {/* Spinning dashed outer ring */}
            <svg className="empty-bag-ring" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} viewBox="0 0 160 160">
              <circle cx="80" cy="80" r="72" fill="none" stroke="rgba(99,102,241,0.2)" strokeWidth="1.5" strokeDasharray="8 6" />
            </svg>
            {/* Static inner ring */}
            <svg style={{ position: "absolute", inset: 10, width: "calc(100% - 20px)", height: "calc(100% - 20px)" }} viewBox="0 0 140 140">
              <circle cx="70" cy="70" r="62" fill="none" stroke="rgba(139,92,246,0.12)" strokeWidth="1" />
            </svg>
            {/* Icon circle */}
            <div className="empty-bag-icon" style={{
              position: "absolute", inset: 20,
              borderRadius: "50%",
              background: "linear-gradient(145deg, #eef0ff, #f3e8ff)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 16px 48px rgba(99,102,241,0.18), inset 0 1px 0 rgba(255,255,255,0.9)",
            }}>
              <ShoppingBag style={{ width: 44, height: 44, color: "#818cf8", strokeWidth: 1.5 }} />
            </div>
            {/* Badge */}
            <div style={{
              position: "absolute", top: 12, right: 12,
              width: 28, height: 28, borderRadius: "50%",
              background: "linear-gradient(135deg, #6366f1, #a78bfa)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 12, fontWeight: 900, color: "#fff",
              boxShadow: "0 4px 14px rgba(99,102,241,0.55)",
              zIndex: 2,
            }}>0</div>
            {/* Floating dot accents */}
            <div style={{ position: "absolute", top: 18, left: 22, width: 6, height: 6, borderRadius: "50%", background: "rgba(99,102,241,0.35)" }} />
            <div style={{ position: "absolute", bottom: 22, right: 18, width: 4, height: 4, borderRadius: "50%", background: "rgba(167,139,250,0.4)" }} />
            <div style={{ position: "absolute", bottom: 30, left: 14, width: 5, height: 5, borderRadius: "50%", background: "rgba(99,102,241,0.2)" }} />
          </div>

          {/* Copy */}
          <div style={{ textAlign: "center", maxWidth: 340, zIndex: 1 }}>
            <h2 style={{
              fontSize: 28, fontWeight: 900, margin: "0 0 10px",
              color: "var(--text)", fontFamily: "Outfit, sans-serif",
              letterSpacing: "-0.6px",
            }}>
              Keranjang Masih Kosong
            </h2>
            <p style={{ fontSize: 14, color: "var(--text2)", margin: 0, lineHeight: 1.65 }}>
              Belum ada produk yang ditambahkan. Yuk temukan produk impianmu dan mulai belanja sekarang!
            </p>
          </div>

          {/* CTA */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10, alignItems: "center", zIndex: 1 }}>
            <Link href="/" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "14px 32px", borderRadius: 16,
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              boxShadow: "0 10px 32px rgba(99,102,241,0.42), 0 1px 0 rgba(255,255,255,0.22) inset",
              color: "#fff", fontWeight: 800, fontSize: 14,
              textDecoration: "none", letterSpacing: "0.01em",
            }}>
              <Zap style={{ width: 16, height: 16 }} />
              Mulai Belanja Sekarang
            </Link>
          </div>

          {/* Perk pills */}
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center", zIndex: 1 }}>
            {[
              { emoji: "🚚", text: "Gratis Ongkir" },
              { emoji: "🛡️", text: "Produk Asli" },
              { emoji: "⚡", text: "Proses Cepat" },
              { emoji: "🎁", text: "Banyak Promo" },
            ].map(({ emoji, text }) => (
              <div className="empty-perk" key={text}>
                <span style={{ fontSize: 15 }}>{emoji}</span>
                {text}
              </div>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );

  /* ─── CART WITH ITEMS ─── */
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "var(--bg)" }}>
      <Navbar />

      <div style={{ flex: 1, maxWidth: 1040, margin: "0 auto", width: "100%", padding: "32px 20px 48px" }}>

        {/* Page header */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 32 }}>
          <div>
            <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--text3)", textDecoration: "none", fontWeight: 600, marginBottom: 6 }}>
              <ArrowLeft style={{ width: 13, height: 13 }} />
              Lanjut Belanja
            </Link>
            <h1 style={{ margin: 0, fontSize: 28, fontWeight: 900, color: "var(--text)", fontFamily: "Outfit, sans-serif", letterSpacing: "-0.6px", lineHeight: 1 }}>
              Keranjang
              <span style={{ marginLeft: 10, fontSize: 15, fontWeight: 500, color: "var(--text3)", letterSpacing: 0 }}>
                {itemCount} item
              </span>
            </h1>
          </div>
          <button onClick={clearCart} style={{
            fontSize: 12, fontWeight: 700, padding: "7px 14px", borderRadius: 10,
            color: "#f87171", background: "rgba(248,113,113,0.08)",
            border: "1px solid rgba(248,113,113,0.15)", cursor: "pointer",
          }}>
            Hapus Semua
          </button>
        </div>

        {/* Main grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 20 }} className="lg-cart-grid">
          <style>{`
            @media (min-width: 1024px) { .lg-cart-grid { grid-template-columns: 1fr 360px !important; } }
          `}</style>

          {/* Left: items */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
              <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.1em", color: "var(--text3)", textTransform: "uppercase" }}>Produk Dipilih</span>
              <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
            </div>

            {items.map((item) => (
              <div key={item.product.id} style={{
                display: "flex", gap: 16, padding: "16px",
                background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 20,
                position: "relative", overflow: "hidden",
              }}>
                <div style={{
                  position: "absolute", left: 0, top: 0, bottom: 0, width: 3,
                  background: "linear-gradient(180deg, #6366f1, #a78bfa)",
                  borderRadius: "20px 0 0 20px",
                }} />

                <Link href={`/customer/products/${item.product.id}`} style={{ flexShrink: 0 }}>
                  <div style={{ width: 90, height: 90, borderRadius: 14, overflow: "hidden", background: "var(--surface2)" }}>
                    <img src={item.product.image} alt={item.product.name}
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.3s" }}
                      onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1.08)"; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1)"; }}
                    />
                  </div>
                </Link>

                <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div>
                    <Link href={`/customer/products/${item.product.id}`} style={{ textDecoration: "none" }}>
                      <p style={{ margin: "0 0 4px", fontWeight: 800, fontSize: 14, color: "var(--text)", lineHeight: 1.3 }}>
                        {item.product.name}
                      </p>
                    </Link>
                    <span style={{ fontSize: 11, fontWeight: 600, color: "var(--text3)", textTransform: "capitalize", background: "var(--surface2)", padding: "2px 8px", borderRadius: 6, display: "inline-block" }}>
                      {item.product.category}
                    </span>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8, marginTop: 10 }}>
                    <div style={{ display: "inline-flex", alignItems: "center", border: "1.5px solid var(--border2)", borderRadius: 12, overflow: "hidden", background: "var(--surface2)" }}>
                      <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} style={{ width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", border: "none", background: "transparent", cursor: "pointer", color: "var(--text2)", transition: "background 0.15s" }}
                        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(99,102,241,0.1)"; (e.currentTarget as HTMLButtonElement).style.color = "#6366f1"; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "transparent"; (e.currentTarget as HTMLButtonElement).style.color = "var(--text2)"; }}>
                        <Minus style={{ width: 13, height: 13 }} />
                      </button>
                      <span style={{ width: 32, textAlign: "center", fontSize: 14, fontWeight: 900, color: "var(--text)", background: "var(--surface)", height: 32, display: "flex", alignItems: "center", justifyContent: "center", borderLeft: "1px solid var(--border)", borderRight: "1px solid var(--border)" }}>
                        {item.quantity}
                      </span>
                      <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} disabled={item.quantity >= item.product.stock} style={{ width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", border: "none", background: "transparent", cursor: "pointer", color: "var(--text2)", opacity: item.quantity >= item.product.stock ? 0.3 : 1, transition: "background 0.15s" }}
                        onMouseEnter={e => { if (item.quantity < item.product.stock) { (e.currentTarget as HTMLButtonElement).style.background = "rgba(99,102,241,0.1)"; (e.currentTarget as HTMLButtonElement).style.color = "#6366f1"; } }}
                        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "transparent"; (e.currentTarget as HTMLButtonElement).style.color = "var(--text2)"; }}>
                        <Plus style={{ width: 13, height: 13 }} />
                      </button>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{ textAlign: "right" }}>
                        <p style={{ margin: 0, fontWeight: 900, fontSize: 15, color: "#6366f1", fontFamily: "Outfit, sans-serif" }}>
                          {formatRupiah(item.product.price * item.quantity)}
                        </p>
                        {item.quantity > 1 && (
                          <p style={{ margin: 0, fontSize: 10, color: "var(--text3)", fontWeight: 600 }}>
                            {formatRupiah(item.product.price)} × {item.quantity}
                          </p>
                        )}
                      </div>
                      <button onClick={() => removeItem(item.product.id)} style={{ width: 34, height: 34, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid var(--border)", background: "var(--surface2)", cursor: "pointer", color: "var(--text3)", transition: "all 0.15s" }}
                        onMouseEnter={e => { const b = e.currentTarget as HTMLButtonElement; b.style.background = "rgba(248,113,113,0.1)"; b.style.borderColor = "rgba(248,113,113,0.3)"; b.style.color = "#f87171"; }}
                        onMouseLeave={e => { const b = e.currentTarget as HTMLButtonElement; b.style.background = "var(--surface2)"; b.style.borderColor = "var(--border)"; b.style.color = "var(--text3)"; }}>
                        <Trash2 style={{ width: 14, height: 14 }} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Trust bar */}
            <div style={{ display: "flex", gap: 0, marginTop: 8, background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 16, overflow: "hidden" }}>
              {[
                { icon: "🚚", label: "Gratis Ongkir", sub: "Ke seluruh Indonesia" },
                { icon: "🛡️", label: "100% Asli", sub: "Garansi keaslian produk" },
                { icon: "⚡", label: "Proses Cepat", sub: "Dikemas dalam 24 jam" },
              ].map(({ icon, label, sub }, i) => (
                <div key={label} style={{ flex: 1, padding: "14px 16px", textAlign: "center", borderLeft: i > 0 ? "1px solid var(--border)" : "none" }}>
                  <div style={{ fontSize: 20, marginBottom: 4 }}>{icon}</div>
                  <p style={{ margin: "0 0 2px", fontSize: 12, fontWeight: 800, color: "var(--text)" }}>{label}</p>
                  <p style={{ margin: 0, fontSize: 10, color: "var(--text3)", fontWeight: 500 }}>{sub}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: order summary */}
          <div style={{ position: "sticky", top: 82, height: "fit-content", display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ borderRadius: 16, padding: "14px 16px", background: "linear-gradient(135deg, #eef0ff, #f3e8ff)", border: "1px solid rgba(99,102,241,0.15)", display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 38, height: 38, borderRadius: 10, background: "rgba(99,102,241,0.12)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Gift style={{ width: 18, height: 18, color: "#6366f1" }} />
              </div>
              <div>
                <p style={{ margin: "0 0 2px", fontSize: 12, fontWeight: 800, color: "#4338ca" }}>Ongkos Kirim Gratis!</p>
                <p style={{ margin: 0, fontSize: 11, color: "#6366f1", fontWeight: 500 }}>Berlaku untuk semua pesanan</p>
              </div>
            </div>

            <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 20, overflow: "hidden" }}>
              <div style={{ padding: "16px 20px 14px", borderBottom: "1px solid var(--border)" }}>
                <p style={{ margin: 0, fontSize: 13, fontWeight: 800, color: "var(--text)", fontFamily: "Outfit, sans-serif" }}>Ringkasan Pesanan</p>
              </div>

              <div style={{ padding: "12px 20px", borderBottom: "1px solid var(--border)", maxHeight: 180, overflowY: "auto", display: "flex", flexDirection: "column", gap: 8 }}>
                {items.map(item => (
                  <div key={item.product.id} style={{ display: "flex", justifyContent: "space-between", gap: 8, alignItems: "center" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, flex: 1, minWidth: 0 }}>
                      <img src={item.product.image} alt="" style={{ width: 28, height: 28, borderRadius: 6, objectFit: "cover", flexShrink: 0 }} />
                      <span style={{ fontSize: 12, color: "var(--text2)", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>
                        {item.product.name}
                        <span style={{ color: "var(--text3)", marginLeft: 4 }}>×{item.quantity}</span>
                      </span>
                    </div>
                    <span style={{ fontSize: 12, fontWeight: 700, color: "var(--text)", flexShrink: 0 }}>{formatRupiah(item.product.price * item.quantity)}</span>
                  </div>
                ))}
              </div>

              <div style={{ padding: "14px 20px 0" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <span style={{ fontSize: 13, color: "var(--text2)" }}>Subtotal</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: "var(--text)" }}>{formatRupiah(total)}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16, alignItems: "center" }}>
                  <span style={{ fontSize: 13, color: "var(--text2)" }}>Ongkos Kirim</span>
                  <span style={{ fontSize: 13, fontWeight: 800, color: "#10b981", background: "rgba(16,185,129,0.1)", padding: "2px 10px", borderRadius: 8 }}>GRATIS</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 0", borderTop: "2px dashed var(--border2)", marginBottom: 16 }}>
                  <span style={{ fontSize: 15, fontWeight: 800, color: "var(--text)" }}>Total Bayar</span>
                  <span style={{ fontSize: 22, fontWeight: 900, color: "#6366f1", fontFamily: "Outfit, sans-serif", letterSpacing: "-0.5px" }}>{formatRupiah(total)}</span>
                </div>
              </div>

              <div style={{ padding: "0 20px 20px" }}>
                <Link href="/customer/checkout" style={{
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                  width: "100%", padding: "15px", borderRadius: 14,
                  background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                  boxShadow: "0 8px 28px rgba(99,102,241,0.38), 0 1px 0 rgba(255,255,255,0.18) inset",
                  color: "#fff", fontWeight: 800, fontSize: 14,
                  textDecoration: "none", letterSpacing: "0.02em", boxSizing: "border-box",
                }}>
                  Checkout Sekarang <span style={{ fontSize: 16 }}>→</span>
                </Link>
                <Link href="/" style={{ display: "block", textAlign: "center", marginTop: 12, fontSize: 12, fontWeight: 600, color: "var(--text3)", textDecoration: "none" }}>
                  atau lanjut belanja
                </Link>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
              <ShieldCheck style={{ width: 13, height: 13, color: "var(--text3)" }} />
              <span style={{ fontSize: 11, color: "var(--text3)", fontWeight: 600 }}>Transaksi aman & terenkripsi</span>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
