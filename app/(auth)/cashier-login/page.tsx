"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Zap, Lock, User, ArrowRight, CreditCard, Receipt, Clock, CheckCircle2, Briefcase } from "lucide-react";
import Link from "next/link";

export default function CashierLoginPage() {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [tab, setTab] = useState<"login"|"register">("login");
  const [form, setForm] = useState({ name:"", username:"siti", password:"cashier123", confirm:"", shift:"pagi" });
  const [err, setErr] = useState("");
  const [focused, setFocused] = useState<string|null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tab==="register" && form.password!==form.confirm) { setErr("Password tidak cocok"); return; }
    setErr(""); setLoading(true);
    setTimeout(()=>{ setDone(true); }, 1000);
    setTimeout(()=>{ router.push("/cashier"); }, 1700);
  };

  const features = [
    { icon: CreditCard, label: "Proses Pembayaran", desc: "Multi-metode pembayaran", color: "#34d399" },
    { icon: Receipt,    label: "Cetak Struk",       desc: "Otomatis & cepat",        color: "#38bdf8" },
    { icon: Clock,      label: "Shift Tracking",    desc: "Pantau jam kerja",         color: "#fb923c" },
    { icon: Briefcase,  label: "Laporan Shift",     desc: "Rekap penjualan harian",   color: "#a78bfa" },
  ];

  const shifts = [
    { value:"pagi",  label:"🌅 Pagi (06:00 – 14:00)" },
    { value:"siang", label:"☀️ Siang (14:00 – 22:00)" },
    { value:"malam", label:"🌙 Malam (22:00 – 06:00)" },
  ];

  return (
    <div className="min-h-screen flex overflow-hidden" style={{ background:"var(--bg)", fontFamily:"Outfit,sans-serif" }}>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        @keyframes ringSpin { to { transform: translate(-50%,-50%) rotate(360deg); } }
        @keyframes ringSpinRev { to { transform: translate(-50%,-50%) rotate(-360deg); } }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes fadeInUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes scaleIn { from{opacity:0;transform:scale(0.88)} to{opacity:1;transform:scale(1)} }
        @keyframes checkPop { 0%{transform:scale(0);opacity:0} 60%{transform:scale(1.2)} 100%{transform:scale(1);opacity:1} }
        @keyframes shimmer { from{background-position:-200% center} to{background-position:200% center} }
        @keyframes slideLeft { from{opacity:0;transform:translateX(-32px)} to{opacity:1;transform:translateX(0)} }
        @keyframes slideRight { from{opacity:0;transform:translateX(32px)} to{opacity:1;transform:translateX(0)} }
        .feat-card { transition: transform 0.25s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.25s ease; }
        .feat-card:hover { transform: translateY(-3px) scale(1.02); }
        .btn-green { transition: transform 0.15s ease, box-shadow 0.15s ease; }
        .btn-green:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 10px 32px rgba(16,185,129,0.5) !important; }
        .btn-green:active:not(:disabled) { transform: translateY(0); }
        .tab-btn { transition: all 0.25s cubic-bezier(0.4,0,0.2,1); }
        .panel-l { animation: slideLeft 0.7s cubic-bezier(0.16,1,0.3,1) both; }
        .panel-r { animation: slideRight 0.7s cubic-bezier(0.16,1,0.3,1) 0.08s both; }
        .f1 { animation: fadeInUp 0.5s cubic-bezier(0.16,1,0.3,1) both; }
        .f2 { animation: fadeInUp 0.5s cubic-bezier(0.16,1,0.3,1) 0.07s both; }
        .f3 { animation: fadeInUp 0.5s cubic-bezier(0.16,1,0.3,1) 0.13s both; }
        .f4 { animation: fadeInUp 0.5s cubic-bezier(0.16,1,0.3,1) 0.18s both; }
        .f5 { animation: fadeInUp 0.5s cubic-bezier(0.16,1,0.3,1) 0.22s both; }
        .f6 { animation: fadeInUp 0.5s cubic-bezier(0.16,1,0.3,1) 0.27s both; }
        .icon-anim { transition: color 0.2s; }
        .eye-btn { transition: color 0.2s; }
        .eye-btn:hover { color: #10b981 !important; }
        .link-admin { transition: color 0.2s; }
        .link-admin:hover { color: #818cf8 !important; }
        select option { background: #0c1120; color: #f1f5f9; }
      `}</style>

      {/* LEFT PANEL */}
      <div className="hidden lg:flex flex-col w-[52%] relative overflow-hidden panel-l"
        style={{ background:"linear-gradient(145deg,#031209 0%,#072318 45%,#041510 100%)" }}>

        <div className="absolute inset-0 pointer-events-none">
          <div style={{ position:"absolute",top:"-15%",left:"-8%",width:520,height:520,borderRadius:"50%",
            background:"radial-gradient(circle,rgba(16,185,129,0.25) 0%,transparent 65%)", animation:"float 8s ease-in-out infinite" }} />
          <div style={{ position:"absolute",bottom:"-10%",right:"-5%",width:400,height:400,borderRadius:"50%",
            background:"radial-gradient(circle,rgba(5,150,105,0.18) 0%,transparent 65%)", animation:"float 10s ease-in-out infinite reverse" }} />
          <div style={{ position:"absolute",inset:0,opacity:0.03,
            backgroundImage:"linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)",
            backgroundSize:"56px 56px" }} />
          <div style={{ position:"absolute",top:"42%",left:"52%",width:400,height:400,borderRadius:"50%",
            border:"1px solid rgba(16,185,129,0.14)",transform:"translate(-50%,-50%)",animation:"ringSpin 30s linear infinite" }} />
          <div style={{ position:"absolute",top:"42%",left:"52%",width:250,height:250,borderRadius:"50%",
            border:"1px dashed rgba(52,211,153,0.18)",transform:"translate(-50%,-50%)",animation:"ringSpinRev 18s linear infinite" }} />
          <div style={{ position:"absolute",top:"42%",left:"52%",width:130,height:130,borderRadius:"50%",
            border:"1px solid rgba(16,185,129,0.12)",transform:"translate(-50%,-50%)",animation:"ringSpin 12s linear infinite" }} />
        </div>

        <div className="relative z-10 flex flex-col h-full p-14">
          <Link href="/" className="inline-flex items-center gap-3 w-fit" style={{ animation:"fadeInUp 0.5s ease both" }}>
            <div className="w-11 h-11 rounded-2xl flex items-center justify-center"
              style={{ background:"linear-gradient(135deg,#10b981,#059669)", boxShadow:"0 4px 24px rgba(16,185,129,0.6)",
                transition:"transform 0.3s" }}
              onMouseEnter={e=>(e.currentTarget.style.transform="scale(1.1)")}
              onMouseLeave={e=>(e.currentTarget.style.transform="scale(1)")}>
              <Zap className="w-5 h-5 text-white" strokeWidth={2.5} />
            </div>
            <span className="font-black text-2xl text-white tracking-tight">Nexa<span style={{ color:"#34d399" }}>Sell</span></span>
          </Link>

          <div className="mt-14 flex-1 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-6 w-fit"
              style={{ background:"rgba(16,185,129,0.15)",border:"1px solid rgba(16,185,129,0.3)",animation:"fadeInUp 0.5s ease 0.1s both" }}>
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" style={{ animation:"pulse 2s ease-in-out infinite" }} />
              <span className="text-[10px] font-bold tracking-widest uppercase" style={{ color:"rgba(255,255,255,0.7)" }}>Cashier Station</span>
            </div>

            <h2 className="font-black leading-tight mb-4" style={{ fontSize:"clamp(28px,3.5vw,42px)",color:"#fff",animation:"fadeInUp 0.5s ease 0.15s both" }}>
              Kasir Digital<br />
              <span style={{ background:"linear-gradient(90deg,#34d399,#6ee7b7,#10b981)",backgroundSize:"200%",
                WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",animation:"shimmer 4s linear infinite" }}>
                Lebih Mudah.
              </span>
            </h2>
            <p className="text-sm leading-relaxed max-w-xs mb-10" style={{ color:"rgba(255,255,255,0.4)",animation:"fadeInUp 0.5s ease 0.2s both" }}>
              Proses transaksi dengan cepat, mudah, dan akurat. Sistem POS modern untuk pengalaman kasir terbaik.
            </p>

            <div className="grid grid-cols-2 gap-3" style={{ animation:"fadeInUp 0.5s ease 0.25s both" }}>
              {features.map(({ icon: Icon, label, desc, color }) => (
                <div key={label} className="feat-card p-4 rounded-2xl cursor-default"
                  style={{ background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.08)",backdropFilter:"blur(12px)" }}>
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3"
                    style={{ background:`${color}18`,border:`1px solid ${color}28` }}>
                    <Icon className="w-4 h-4" style={{ color }} />
                  </div>
                  <p className="font-bold text-sm text-white leading-tight">{label}</p>
                  <p className="text-[10px] mt-0.5 font-medium" style={{ color:"rgba(255,255,255,0.35)" }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>

          <p className="text-[11px]" style={{ color:"rgba(255,255,255,0.18)" }}>© 2026 NexaSell · Cashier Station</p>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="flex-1 flex items-center justify-center px-6 sm:px-10 py-12 panel-r relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage:"radial-gradient(circle at 80% 20%, rgba(16,185,129,0.05) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(5,150,105,0.04) 0%, transparent 50%)"
        }} />

        <div className="w-full max-w-md relative z-10">
          <Link href="/" className="flex lg:hidden items-center gap-2.5 mb-8">
            <div className="w-9 h-9 rounded-2xl flex items-center justify-center"
              style={{ background:"linear-gradient(135deg,#10b981,#059669)",boxShadow:"0 3px 14px rgba(16,185,129,0.4)" }}>
              <Zap className="w-4 h-4 text-white" strokeWidth={2.5} />
            </div>
            <span className="font-black text-xl" style={{ color:"var(--text)" }}>Nexa<span style={{ color:"#10b981" }}>Sell</span></span>
          </Link>

          {done ? (
            <div className="text-center" style={{ animation:"scaleIn 0.4s cubic-bezier(0.34,1.56,0.64,1) both" }}>
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ background:"rgba(16,185,129,0.1)",border:"2px solid rgba(16,185,129,0.3)" }}>
                <CheckCircle2 className="w-10 h-10" style={{ color:"#10b981",animation:"checkPop 0.5s cubic-bezier(0.34,1.56,0.64,1) both" }} />
              </div>
              <p className="font-black text-xl mb-1" style={{ color:"var(--text)" }}>Siap bertugas!</p>
              <p className="text-sm" style={{ color:"var(--text2)" }}>Membuka Cashier Dashboard...</p>
            </div>
          ) : (<>
            <div className="mb-7 f1">
              <h1 className="font-black text-2xl sm:text-3xl mb-1.5" style={{ color:"var(--text)" }}>
                {tab==="login" ? "Mulai Shift 🧾" : "Daftar Kasir Baru"}
              </h1>
              <p className="text-sm" style={{ color:"var(--text2)" }}>
                {tab==="login" ? "Login ke Cashier Station NexaSell" : "Buat akun kasir baru"}
              </p>
            </div>

            <div className="flex p-1 rounded-2xl mb-6 f2" style={{ background:"var(--surface2)",border:"1px solid var(--border)" }}>
              {(["login","register"] as const).map(t => (
                <button key={t} onClick={()=>setTab(t)} className="tab-btn flex-1 py-2.5 rounded-xl text-sm font-bold"
                  style={tab===t
                    ? { background:"linear-gradient(135deg,#10b981,#059669)",color:"#fff",boxShadow:"0 2px 12px rgba(16,185,129,0.4)" }
                    : { color:"var(--text2)",background:"transparent" }}>
                  {t==="login" ? "Masuk" : "Daftar"}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {tab==="register" && (
                <div className="f3">
                  <label className="block text-xs font-bold mb-2" style={{ color:"var(--text2)" }}>Nama Lengkap</label>
                  <input type="text" value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))}
                    placeholder="Nama kasir" required className="w-full px-4 py-3 rounded-2xl text-sm font-medium outline-none"
                    style={{ background:"var(--surface2)",border:`1.5px solid ${focused==="name"?"#10b981":"var(--border)"}`,
                      color:"var(--text)",transition:"border-color 0.2s, box-shadow 0.2s",
                      boxShadow:focused==="name"?"0 0 0 3px rgba(16,185,129,0.12)":"none" }}
                    onFocus={()=>setFocused("name")} onBlur={()=>setFocused(null)} />
                </div>
              )}

              <div className="f3">
                <label className="block text-xs font-bold mb-2" style={{ color:"var(--text2)" }}>Username</label>
                <div className="relative">
                  <User className="icon-anim absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
                    style={{ color:focused==="user"?"#10b981":"var(--text3)" }} />
                  <input type="text" value={form.username} onChange={e=>setForm(f=>({...f,username:e.target.value}))}
                    placeholder="Username kasir" required className="w-full pl-11 pr-4 py-3 rounded-2xl text-sm font-medium outline-none"
                    style={{ background:"var(--surface2)",border:`1.5px solid ${focused==="user"?"#10b981":"var(--border)"}`,
                      color:"var(--text)",transition:"border-color 0.2s, box-shadow 0.2s",
                      boxShadow:focused==="user"?"0 0 0 3px rgba(16,185,129,0.12)":"none" }}
                    onFocus={()=>setFocused("user")} onBlur={()=>setFocused(null)} />
                </div>
              </div>

              <div className="f4">
                <label className="block text-xs font-bold mb-2" style={{ color:"var(--text2)" }}>Password</label>
                <div className="relative">
                  <Lock className="icon-anim absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
                    style={{ color:focused==="pass"?"#10b981":"var(--text3)" }} />
                  <input type={show?"text":"password"} value={form.password} onChange={e=>setForm(f=>({...f,password:e.target.value}))}
                    placeholder="Password" required className="w-full pl-11 pr-12 py-3 rounded-2xl text-sm font-medium outline-none"
                    style={{ background:"var(--surface2)",border:`1.5px solid ${focused==="pass"?"#10b981":"var(--border)"}`,
                      color:"var(--text)",transition:"border-color 0.2s, box-shadow 0.2s",
                      boxShadow:focused==="pass"?"0 0 0 3px rgba(16,185,129,0.12)":"none" }}
                    onFocus={()=>setFocused("pass")} onBlur={()=>setFocused(null)} />
                  <button type="button" onClick={()=>setShow(s=>!s)}
                    className="eye-btn absolute right-3.5 top-1/2 -translate-y-1/2 p-1 rounded-lg" style={{ color:"var(--text3)" }}>
                    {show ? <EyeOff className="w-4 h-4"/> : <Eye className="w-4 h-4"/>}
                  </button>
                </div>
              </div>

              {tab==="register" && (<>
                <div className="f4">
                  <label className="block text-xs font-bold mb-2" style={{ color:"var(--text2)" }}>Konfirmasi Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ color:"var(--text3)" }} />
                    <input type={show?"text":"password"} value={form.confirm} onChange={e=>setForm(f=>({...f,confirm:e.target.value}))}
                      placeholder="Ulangi password" required className="w-full pl-11 pr-4 py-3 rounded-2xl text-sm font-medium outline-none"
                      style={{ background:"var(--surface2)",border:`1.5px solid ${err?"#ef4444":"var(--border)"}`,color:"var(--text)",transition:"border-color 0.2s" }}
                      onFocus={()=>setFocused("conf")} onBlur={()=>setFocused(null)} />
                  </div>
                  {err && <p className="text-xs text-red-400 mt-1.5">⚠ {err}</p>}
                </div>

                <div className="f4">
                  <label className="block text-xs font-bold mb-2" style={{ color:"var(--text2)" }}>Pilih Shift</label>
                  <select value={form.shift} onChange={e=>setForm(f=>({...f,shift:e.target.value}))}
                    className="w-full px-4 py-3 rounded-2xl text-sm font-medium outline-none appearance-none cursor-pointer"
                    style={{ background:"var(--surface2)",border:`1.5px solid ${focused==="shift"?"#10b981":"var(--border)"}`,
                      color:"var(--text)",transition:"border-color 0.2s" }}
                    onFocus={()=>setFocused("shift")} onBlur={()=>setFocused(null)}>
                    {shifts.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                  </select>
                </div>
              </>)}

              {tab==="login" && (
                <div className="f4 p-3.5 rounded-2xl text-xs"
                  style={{ background:"rgba(16,185,129,0.06)",border:"1px solid rgba(16,185,129,0.15)",color:"var(--text2)" }}>
                  <span className="font-semibold">Demo:</span>{" "}
                  <span className="font-black" style={{ color:"#34d399" }}>siti</span>
                  {" / "}
                  <span className="font-black" style={{ color:"#34d399" }}>cashier123</span>
                </div>
              )}

              <button type="submit" disabled={loading} className="btn-green f5 w-full py-3.5 rounded-2xl text-white font-black text-sm flex items-center justify-center gap-2"
                style={{ background:"linear-gradient(135deg,#10b981,#059669)",boxShadow:"0 4px 20px rgba(16,185,129,0.4)",opacity:loading?0.85:1 }}>
                {loading
                  ? <><div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white" style={{ animation:"spin 0.7s linear infinite" }} />Memproses...</>
                  : <>{tab==="login"?"Mulai Shift":"Daftar Kasir"} <ArrowRight className="w-4 h-4"/></>
                }
              </button>
            </form>

            <div className="mt-6 text-center f6">
              <Link href="/admin-login" className="link-admin text-xs font-semibold" style={{ color:"#6366f1" }}>
                Masuk sebagai Admin →
              </Link>
            </div>
          </>)}
        </div>
      </div>
    </div>
  );
}
