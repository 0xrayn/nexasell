"use client";
import { useState } from "react";
import { User, Lock, Bell, Shield, Camera, Check, Eye, EyeOff } from "lucide-react";

const TABS = [
  { id:"profile",  label:"Profil",         icon:User   },
  { id:"password", label:"Ganti Password", icon:Lock   },
  { id:"notif",    label:"Notifikasi",     icon:Bell   },
  { id:"security", label:"Keamanan",       icon:Shield },
];

const NOTIFS = [
  { key:"trx",    label:"Transaksi Baru",  desc:"Notifikasi setiap ada transaksi masuk",  default:true  },
  { key:"stock",  label:"Stok Menipis",    desc:"Alert ketika stok produk di bawah 10",   default:true  },
  { key:"report", label:"Laporan Harian",  desc:"Ringkasan penjualan harian via email",    default:false },
  { key:"update", label:"Update Sistem",   desc:"Info update dan maintenance",             default:false },
];

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [saved,     setSaved]     = useState(false);
  const [showOld,   setShowOld]   = useState(false);
  const [showNew,   setShowNew]   = useState(false);
  const [profile,   setProfile]   = useState({ name:"Admin User", email:"admin@nexasell.id", phone:"081234567890", bio:"Administrator NexaSell" });
  const [pwForm,    setPwForm]    = useState({ old:"", newPw:"", confirm:"" });
  const [pwErr,     setPwErr]     = useState("");
  // All notif toggles as a single state object (fixes Rules of Hooks)
  const [notifs,    setNotifs]    = useState<Record<string,boolean>>(
    Object.fromEntries(NOTIFS.map(n => [n.key, n.default]))
  );

  const showSaved = () => { setSaved(true); setTimeout(() => setSaved(false), 2500); };

  const handleProfileSave = (e: React.FormEvent) => { e.preventDefault(); showSaved(); };
  const handlePwSave      = (e: React.FormEvent) => {
    e.preventDefault();
    if (pwForm.newPw !== pwForm.confirm) { setPwErr("Password baru tidak cocok"); return; }
    if (pwForm.newPw.length < 8)         { setPwErr("Minimal 8 karakter");        return; }
    setPwErr(""); showSaved();
  };

  const Field = ({ label, value, onChange, type="text", placeholder="" }: {
    label:string; value:string; onChange:(v:string)=>void; type?:string; placeholder?:string;
  }) => (
    <div>
      <label className="block text-xs font-bold mb-2" style={{ color:"var(--text2)" }}>{label}</label>
      <input type={type} value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder}
        className="w-full px-4 py-3 rounded-2xl text-sm font-medium outline-none transition-all"
        style={{ background:"var(--surface2)", border:"1.5px solid var(--border)", color:"var(--text)" }}
        onFocus={e=>(e.target.style.borderColor="#6366f1")}
        onBlur ={e=>(e.target.style.borderColor="var(--border)")} />
    </div>
  );

  const PwField = ({ label, value, onChange, show, onToggle }: {
    label:string; value:string; onChange:(v:string)=>void; show:boolean; onToggle:()=>void;
  }) => (
    <div>
      <label className="block text-xs font-bold mb-2" style={{ color:"var(--text2)" }}>{label}</label>
      <div className="relative">
        <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ color:"var(--text3)" }} />
        <input type={show?"text":"password"} value={value} onChange={e=>onChange(e.target.value)} required
          className="w-full pl-11 pr-12 py-3 rounded-2xl text-sm font-medium outline-none transition-all"
          style={{ background:"var(--surface2)", border:"1.5px solid var(--border)", color:"var(--text)" }}
          onFocus={e=>(e.target.style.borderColor="#6366f1")}
          onBlur ={e=>(e.target.style.borderColor="var(--border)")} />
        <button type="button" onClick={onToggle} className="absolute right-3.5 top-1/2 -translate-y-1/2" style={{ color:"var(--text3)" }}>
          {show ? <EyeOff className="w-4 h-4"/> : <Eye className="w-4 h-4"/>}
        </button>
      </div>
    </div>
  );

  const Toggle = ({ checked, onChange }: { checked:boolean; onChange:(v:boolean)=>void }) => (
    <button type="button" onClick={()=>onChange(!checked)}
      className="w-11 h-6 rounded-full transition-all relative flex-shrink-0"
      style={{ background: checked ? "#6366f1" : "var(--surface3,#e5e7eb)" }}>
      <div className="w-5 h-5 rounded-full bg-white shadow-md absolute top-0.5 transition-all"
        style={{ left: checked ? "calc(100% - 22px)" : "2px" }} />
    </button>
  );

  return (
    <div className="p-4 sm:p-6 lg:p-8 w-full max-w-full" style={{ background:"var(--bg)", minHeight:"100vh" }}>
      {/* Header */}
      <div className="mb-7">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-1" style={{ color:"var(--text3)" }}>Account</p>
        <h1 className="font-black text-2xl" style={{ color:"var(--text)", fontFamily:"Outfit,sans-serif" }}>Pengaturan</h1>
        <p className="text-sm mt-0.5" style={{ color:"var(--text2)" }}>Kelola profil dan keamanan akun Anda</p>
      </div>

      {/* Save toast */}
      {saved && (
        <div className="flex items-center gap-3 px-4 py-3 rounded-2xl mb-5"
          style={{ background:"rgba(16,185,129,0.1)", border:"1px solid rgba(16,185,129,0.25)", color:"#10b981" }}>
          <Check className="w-4 h-4 flex-shrink-0" />
          <span className="text-sm font-semibold">Perubahan berhasil disimpan!</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-5">

        {/* Sidebar */}
        <div className="rounded-3xl p-3 h-fit" style={{ background:"var(--surface)", border:"1px solid var(--border)" }}>
          {/* Avatar */}
          <div className="flex flex-col items-center p-4 mb-1">
            <div className="relative mb-3">
              <div className="w-20 h-20 rounded-3xl flex items-center justify-center text-white text-2xl font-black shadow-xl"
                style={{ background:"linear-gradient(135deg,#6366f1,#8b5cf6)" }}>A</div>
              <button className="absolute -bottom-1 -right-1 w-7 h-7 rounded-xl flex items-center justify-center shadow-md"
                style={{ background:"var(--surface)", border:"2px solid var(--bg)" }}>
                <Camera className="w-3.5 h-3.5" style={{ color:"var(--text2)" }} />
              </button>
            </div>
            <p className="font-black text-sm" style={{ color:"var(--text)" }}>{profile.name}</p>
            <p className="text-[10px]" style={{ color:"var(--text3)" }}>{profile.email}</p>
          </div>

          <div className="space-y-0.5">
            {TABS.map(t => (
              <button key={t.id} onClick={()=>setActiveTab(t.id)}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl text-sm font-semibold transition-all text-left"
                style={activeTab===t.id ? { background:"rgba(99,102,241,0.1)", color:"#6366f1" } : { color:"var(--text2)" }}
                onMouseEnter={e=>{ if(activeTab!==t.id) e.currentTarget.style.background="var(--surface2)"; }}
                onMouseLeave={e=>{ if(activeTab!==t.id) e.currentTarget.style.background=""; }}>
                <t.icon className="w-4 h-4 flex-shrink-0" />
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="rounded-3xl p-6" style={{ background:"var(--surface)", border:"1px solid var(--border)" }}>

          {/* ── Profile ── */}
          {activeTab==="profile" && (
            <form onSubmit={handleProfileSave} className="space-y-5">
              <div>
                <h2 className="font-black text-lg mb-1" style={{ color:"var(--text)", fontFamily:"Outfit,sans-serif" }}>Edit Profil</h2>
                <p className="text-sm" style={{ color:"var(--text2)" }}>Update informasi akun Anda</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Nama Lengkap" value={profile.name}  onChange={v=>setProfile(p=>({...p,name:v}))} />
                <Field label="Email"        value={profile.email} onChange={v=>setProfile(p=>({...p,email:v}))} type="email" />
                <Field label="No. Telepon"  value={profile.phone} onChange={v=>setProfile(p=>({...p,phone:v}))} type="tel" />
                <div>
                  <label className="block text-xs font-bold mb-2" style={{ color:"var(--text2)" }}>Bio</label>
                  <textarea value={profile.bio} onChange={e=>setProfile(p=>({...p,bio:e.target.value}))} rows={3}
                    className="w-full px-4 py-3 rounded-2xl text-sm font-medium outline-none transition-all resize-none"
                    style={{ background:"var(--surface2)", border:"1.5px solid var(--border)", color:"var(--text)" }}
                    onFocus={e=>(e.target.style.borderColor="#6366f1")}
                    onBlur ={e=>(e.target.style.borderColor="var(--border)")} />
                </div>
              </div>
              <button type="submit" className="px-8 py-3 rounded-2xl text-white font-black text-sm"
                style={{ background:"linear-gradient(135deg,#6366f1,#7c3aed)", boxShadow:"0 4px 16px rgba(99,102,241,0.35)" }}>
                Simpan Perubahan
              </button>
            </form>
          )}

          {/* ── Password ── */}
          {activeTab==="password" && (
            <form onSubmit={handlePwSave} className="space-y-5">
              <div>
                <h2 className="font-black text-lg mb-1" style={{ color:"var(--text)", fontFamily:"Outfit,sans-serif" }}>Ganti Password</h2>
                <p className="text-sm" style={{ color:"var(--text2)" }}>Minimal 8 karakter</p>
              </div>
              <div className="max-w-md space-y-4">
                <PwField label="Password Saat Ini" value={pwForm.old}    onChange={v=>setPwForm(f=>({...f,old:v}))}    show={showOld} onToggle={()=>setShowOld(s=>!s)} />
                <PwField label="Password Baru"     value={pwForm.newPw}  onChange={v=>setPwForm(f=>({...f,newPw:v}))}  show={showNew} onToggle={()=>setShowNew(s=>!s)} />
                <div>
                  <label className="block text-xs font-bold mb-2" style={{ color:"var(--text2)" }}>Konfirmasi Password Baru</label>
                  <input type="password" value={pwForm.confirm} onChange={e=>setPwForm(f=>({...f,confirm:e.target.value}))} required
                    className="w-full px-4 py-3 rounded-2xl text-sm font-medium outline-none transition-all"
                    style={{ background:"var(--surface2)", border:`1.5px solid ${pwErr?"#ef4444":"var(--border)"}`, color:"var(--text)" }}
                    onFocus={e=>(e.target.style.borderColor="#6366f1")}
                    onBlur ={e=>(e.target.style.borderColor=pwErr?"#ef4444":"var(--border)")} />
                  {pwErr && <p className="text-xs text-red-500 mt-1">{pwErr}</p>}
                </div>
              </div>
              <button type="submit" className="px-8 py-3 rounded-2xl text-white font-black text-sm"
                style={{ background:"linear-gradient(135deg,#6366f1,#7c3aed)", boxShadow:"0 4px 16px rgba(99,102,241,0.35)" }}>
                Update Password
              </button>
            </form>
          )}

          {/* ── Notifications ── */}
          {activeTab==="notif" && (
            <div className="space-y-1">
              <div className="mb-5">
                <h2 className="font-black text-lg mb-1" style={{ color:"var(--text)", fontFamily:"Outfit,sans-serif" }}>Notifikasi</h2>
                <p className="text-sm" style={{ color:"var(--text2)" }}>Atur preferensi notifikasi Anda</p>
              </div>
              {NOTIFS.map((n, i) => (
                <div key={n.key} className="flex items-center justify-between py-4"
                  style={{ borderBottom: i < NOTIFS.length-1 ? "1px solid var(--border)" : "none" }}>
                  <div>
                    <p className="text-sm font-bold" style={{ color:"var(--text)" }}>{n.label}</p>
                    <p className="text-xs mt-0.5" style={{ color:"var(--text3)" }}>{n.desc}</p>
                  </div>
                  <Toggle checked={notifs[n.key]} onChange={v=>setNotifs(prev=>({...prev,[n.key]:v}))} />
                </div>
              ))}
              <div className="pt-4">
                <button onClick={showSaved} className="px-8 py-3 rounded-2xl text-white font-black text-sm"
                  style={{ background:"linear-gradient(135deg,#6366f1,#7c3aed)", boxShadow:"0 4px 16px rgba(99,102,241,0.35)" }}>
                  Simpan Preferensi
                </button>
              </div>
            </div>
          )}

          {/* ── Security ── */}
          {activeTab==="security" && (
            <div className="space-y-5">
              <div>
                <h2 className="font-black text-lg mb-1" style={{ color:"var(--text)", fontFamily:"Outfit,sans-serif" }}>Keamanan</h2>
                <p className="text-sm" style={{ color:"var(--text2)" }}>Kelola keamanan akun Anda</p>
              </div>
              <div className="space-y-3">
                {[
                  { t:"Two-Factor Auth",  d:"Login dengan 2FA untuk keamanan ekstra",  badge:"Nonaktif", col:"#ef4444" },
                  { t:"Session Aktif",    d:"Anda login dari 1 perangkat",              badge:"1 sesi",   col:"#10b981" },
                  { t:"Login History",    d:"Terakhir login: Hari ini, 09:30",          badge:"Lihat",    col:"#6366f1" },
                ].map(item => (
                  <div key={item.t} className="flex items-center justify-between p-4 rounded-2xl"
                    style={{ background:"var(--surface2)", border:"1px solid var(--border)" }}>
                    <div>
                      <p className="text-sm font-bold" style={{ color:"var(--text)" }}>{item.t}</p>
                      <p className="text-xs mt-0.5" style={{ color:"var(--text3)" }}>{item.d}</p>
                    </div>
                    <span className="text-[10px] font-black px-2.5 py-1 rounded-full cursor-pointer"
                      style={{ background:`${item.col}15`, color:item.col, border:`1px solid ${item.col}25` }}>
                      {item.badge}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
