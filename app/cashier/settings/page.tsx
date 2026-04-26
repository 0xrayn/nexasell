"use client";
import { useState } from "react";
import { User, Lock, Bell, Shield, Camera, Check, Eye, EyeOff, Clock } from "lucide-react";

const TABS = [
  { id:"profile",  label:"Profil",         icon:User   },
  { id:"password", label:"Ganti Password", icon:Lock   },
  { id:"notif",    label:"Notifikasi",     icon:Bell   },
  { id:"security", label:"Keamanan",       icon:Shield },
];

const NOTIFS = [
  { key:"new_trx",  label:"Transaksi Masuk",  desc:"Notifikasi setiap ada pelanggan baru",     default:true  },
  { key:"shift",    label:"Reminder Shift",    desc:"Pengingat 15 menit sebelum shift berakhir",default:true  },
  { key:"report",   label:"Laporan Shift",     desc:"Ringkasan transaksi di akhir shift",        default:false },
  { key:"system",   label:"Update Sistem",     desc:"Info update dan maintenance",               default:false },
];

export default function CashierSettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [saved,     setSaved]     = useState(false);
  const [showOld,   setShowOld]   = useState(false);
  const [showNew,   setShowNew]   = useState(false);
  const [profile,   setProfile]   = useState({ name:"Siti Rahayu", username:"siti", phone:"081298765432", shift:"pagi" });
  const [pwForm,    setPwForm]    = useState({ old:"", newPw:"", confirm:"" });
  const [pwErr,     setPwErr]     = useState("");
  const [notifs,    setNotifs]    = useState<Record<string,boolean>>(
    Object.fromEntries(NOTIFS.map(n => [n.key, n.default]))
  );

  const ACCENT = "#10b981";
  const showSaved = () => { setSaved(true); setTimeout(() => setSaved(false), 2500); };

  const handleProfileSave = (e: React.FormEvent) => { e.preventDefault(); showSaved(); };
  const handlePwSave      = (e: React.FormEvent) => {
    e.preventDefault();
    if (pwForm.newPw !== pwForm.confirm) { setPwErr("Password tidak cocok"); return; }
    if (pwForm.newPw.length < 8)         { setPwErr("Minimal 8 karakter");   return; }
    setPwErr(""); showSaved();
  };

  const Field = ({ label, value, onChange, type="text" }: { label:string; value:string; onChange:(v:string)=>void; type?:string }) => (
    <div>
      <label className="block text-xs font-bold mb-2" style={{ color:"var(--text2)" }}>{label}</label>
      <input type={type} value={value} onChange={e=>onChange(e.target.value)}
        className="w-full px-4 py-3 rounded-2xl text-sm font-medium outline-none transition-all"
        style={{ background:"var(--surface2)", border:"1.5px solid var(--border)", color:"var(--text)" }}
        onFocus={e=>(e.target.style.borderColor=ACCENT)} onBlur={e=>(e.target.style.borderColor="var(--border)")} />
    </div>
  );

  const Toggle = ({ checked, onChange }: { checked:boolean; onChange:(v:boolean)=>void }) => (
    <button type="button" onClick={()=>onChange(!checked)}
      className="w-11 h-6 rounded-full transition-all relative flex-shrink-0"
      style={{ background: checked ? ACCENT : "var(--surface3,#e5e7eb)" }}>
      <div className="w-5 h-5 rounded-full bg-white shadow-md absolute top-0.5 transition-all"
        style={{ left: checked ? "calc(100% - 22px)" : "2px" }} />
    </button>
  );

  return (
    <div className="p-4 sm:p-6 lg:p-8 w-full max-w-full" style={{ background:"var(--bg)", minHeight:"100vh" }}>
      <div className="mb-7">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-1" style={{ color:"var(--text3)" }}>Account</p>
        <h1 className="font-black text-2xl" style={{ color:"var(--text)", fontFamily:"Outfit,sans-serif" }}>Pengaturan</h1>
        <p className="text-sm mt-0.5" style={{ color:"var(--text2)" }}>Kelola profil dan preferensi kasir</p>
      </div>

      {saved && (
        <div className="flex items-center gap-3 px-4 py-3 rounded-2xl mb-5"
          style={{ background:"rgba(16,185,129,0.1)", border:"1px solid rgba(16,185,129,0.25)", color:ACCENT }}>
          <Check className="w-4 h-4 flex-shrink-0" />
          <span className="text-sm font-semibold">Perubahan berhasil disimpan!</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-5">
        {/* Sidebar */}
        <div className="rounded-3xl p-3 h-fit" style={{ background:"var(--surface)", border:"1px solid var(--border)" }}>
          <div className="flex flex-col items-center p-4 mb-1">
            <div className="relative mb-3">
              <div className="w-20 h-20 rounded-3xl flex items-center justify-center text-white text-2xl font-black shadow-xl"
                style={{ background:"linear-gradient(135deg,#10b981,#06b6d4)" }}>S</div>
              <button className="absolute -bottom-1 -right-1 w-7 h-7 rounded-xl flex items-center justify-center shadow-md"
                style={{ background:"var(--surface)", border:"2px solid var(--bg)" }}>
                <Camera className="w-3.5 h-3.5" style={{ color:"var(--text2)" }} />
              </button>
            </div>
            <p className="font-black text-sm" style={{ color:"var(--text)" }}>{profile.name}</p>
            <p className="text-[10px]" style={{ color:"var(--text3)" }}>@{profile.username}</p>
            <div className="flex items-center gap-1.5 mt-2 px-2.5 py-1 rounded-full"
              style={{ background:"rgba(16,185,129,0.1)", border:"1px solid rgba(16,185,129,0.2)" }}>
              <Clock className="w-3 h-3" style={{ color:ACCENT }} />
              <span className="text-[10px] font-bold capitalize" style={{ color:ACCENT }}>Shift {profile.shift}</span>
            </div>
          </div>
          <div className="space-y-0.5">
            {TABS.map(t => (
              <button key={t.id} onClick={()=>setActiveTab(t.id)}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl text-sm font-semibold transition-all text-left"
                style={activeTab===t.id ? { background:`${ACCENT}15`, color:ACCENT } : { color:"var(--text2)" }}
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

          {activeTab==="profile" && (
            <form onSubmit={handleProfileSave} className="space-y-5">
              <div>
                <h2 className="font-black text-lg mb-1" style={{ color:"var(--text)", fontFamily:"Outfit,sans-serif" }}>Edit Profil</h2>
                <p className="text-sm" style={{ color:"var(--text2)" }}>Update informasi akun kasir Anda</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Nama Lengkap" value={profile.name}     onChange={v=>setProfile(p=>({...p,name:v}))} />
                <Field label="Username"     value={profile.username} onChange={v=>setProfile(p=>({...p,username:v}))} />
                <Field label="No. Telepon"  value={profile.phone}    onChange={v=>setProfile(p=>({...p,phone:v}))} type="tel" />
                <div>
                  <label className="block text-xs font-bold mb-2" style={{ color:"var(--text2)" }}>Shift</label>
                  <div className="grid grid-cols-3 gap-2">
                    {["pagi","siang","malam"].map(s => (
                      <button key={s} type="button" onClick={()=>setProfile(p=>({...p,shift:s}))}
                        className="py-2.5 rounded-2xl text-xs font-bold capitalize transition-all"
                        style={profile.shift===s
                          ? { background:`linear-gradient(135deg,${ACCENT},#059669)`, color:"#fff", boxShadow:"0 2px 8px rgba(16,185,129,0.3)" }
                          : { background:"var(--surface2)", border:"1px solid var(--border)", color:"var(--text2)" }}>
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <button type="submit" className="px-8 py-3 rounded-2xl text-white font-black text-sm"
                style={{ background:`linear-gradient(135deg,${ACCENT},#059669)`, boxShadow:"0 4px 16px rgba(16,185,129,0.35)" }}>
                Simpan Perubahan
              </button>
            </form>
          )}

          {activeTab==="password" && (
            <form onSubmit={handlePwSave} className="space-y-5">
              <div>
                <h2 className="font-black text-lg mb-1" style={{ color:"var(--text)", fontFamily:"Outfit,sans-serif" }}>Ganti Password</h2>
                <p className="text-sm" style={{ color:"var(--text2)" }}>Minimal 8 karakter</p>
              </div>
              <div className="max-w-md space-y-4">
                {[
                  { label:"Password Saat Ini", val:pwForm.old,    set:(v:string)=>setPwForm(f=>({...f,old:v})),    show:showOld, toggle:()=>setShowOld(s=>!s) },
                  { label:"Password Baru",     val:pwForm.newPw,  set:(v:string)=>setPwForm(f=>({...f,newPw:v})), show:showNew, toggle:()=>setShowNew(s=>!s) },
                ].map(({ label, val, set, show, toggle }) => (
                  <div key={label}>
                    <label className="block text-xs font-bold mb-2" style={{ color:"var(--text2)" }}>{label}</label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ color:"var(--text3)" }} />
                      <input type={show?"text":"password"} value={val} onChange={e=>set(e.target.value)} required
                        className="w-full pl-11 pr-12 py-3 rounded-2xl text-sm font-medium outline-none transition-all"
                        style={{ background:"var(--surface2)", border:"1.5px solid var(--border)", color:"var(--text)" }}
                        onFocus={e=>(e.target.style.borderColor=ACCENT)} onBlur={e=>(e.target.style.borderColor="var(--border)")} />
                      <button type="button" onClick={toggle} className="absolute right-3.5 top-1/2 -translate-y-1/2" style={{ color:"var(--text3)" }}>
                        {show ? <EyeOff className="w-4 h-4"/> : <Eye className="w-4 h-4"/>}
                      </button>
                    </div>
                  </div>
                ))}
                <div>
                  <label className="block text-xs font-bold mb-2" style={{ color:"var(--text2)" }}>Konfirmasi Password Baru</label>
                  <input type="password" value={pwForm.confirm} onChange={e=>setPwForm(f=>({...f,confirm:e.target.value}))} required
                    className="w-full px-4 py-3 rounded-2xl text-sm font-medium outline-none transition-all"
                    style={{ background:"var(--surface2)", border:`1.5px solid ${pwErr?"#ef4444":"var(--border)"}`, color:"var(--text)" }}
                    onFocus={e=>(e.target.style.borderColor=ACCENT)} onBlur={e=>(e.target.style.borderColor=pwErr?"#ef4444":"var(--border)")} />
                  {pwErr && <p className="text-xs text-red-500 mt-1">{pwErr}</p>}
                </div>
              </div>
              <button type="submit" className="px-8 py-3 rounded-2xl text-white font-black text-sm"
                style={{ background:`linear-gradient(135deg,${ACCENT},#059669)`, boxShadow:"0 4px 16px rgba(16,185,129,0.35)" }}>
                Update Password
              </button>
            </form>
          )}

          {activeTab==="notif" && (
            <div>
              <div className="mb-5">
                <h2 className="font-black text-lg mb-1" style={{ color:"var(--text)", fontFamily:"Outfit,sans-serif" }}>Notifikasi</h2>
                <p className="text-sm" style={{ color:"var(--text2)" }}>Atur preferensi notifikasi kasir</p>
              </div>
              <div className="space-y-0">
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
              </div>
              <div className="pt-4">
                <button onClick={showSaved} className="px-8 py-3 rounded-2xl text-white font-black text-sm"
                  style={{ background:`linear-gradient(135deg,${ACCENT},#059669)`, boxShadow:"0 4px 16px rgba(16,185,129,0.35)" }}>
                  Simpan Preferensi
                </button>
              </div>
            </div>
          )}

          {activeTab==="security" && (
            <div className="space-y-5">
              <div>
                <h2 className="font-black text-lg mb-1" style={{ color:"var(--text)", fontFamily:"Outfit,sans-serif" }}>Keamanan</h2>
                <p className="text-sm" style={{ color:"var(--text2)" }}>Kelola keamanan akun kasir</p>
              </div>
              <div className="space-y-3">
                {[
                  { t:"Status Shift",    d:"Shift Pagi aktif sejak 07:00",       badge:"Aktif",      col:ACCENT    },
                  { t:"Session Aktif",   d:"Login dari 1 perangkat",             badge:"1 sesi",     col:ACCENT    },
                  { t:"Login Terakhir",  d:"Hari ini pukul 07:02",               badge:"Tadi",       col:"#6366f1" },
                  { t:"PIN Kasir",       d:"Gunakan PIN untuk transaksi cepat",   badge:"Atur PIN",   col:"#f59e0b" },
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
