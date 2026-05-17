# 🚀 NexaSell — Panduan Setup Backend

## Apa yang sudah ditambahkan

### Backend baru
- `lib/supabase/` — Supabase client (browser + server + admin)
- `lib/supabase/types.ts` — TypeScript types lengkap
- `middleware.ts` — Auth guard otomatis untuk `/admin` dan `/cashier`
- `supabase/schema.sql` — Schema database + seed produk

### API Routes (`app/api/`)
| Route | Method | Fungsi |
|---|---|---|
| `/api/products` | GET | Ambil semua produk (filter, search, pagination) |
| `/api/products` | POST | Tambah produk (admin only) |
| `/api/products/[id]` | GET | Detail satu produk |
| `/api/products/[id]` | PUT | Update produk (admin only) |
| `/api/products/[id]` | DELETE | Soft-delete produk (admin only) |
| `/api/orders` | GET | Daftar order (admin: semua, kasir: miliknya) |
| `/api/orders` | POST | Buat order baru |
| `/api/orders/[id]` | GET | Detail order |
| `/api/orders/[id]` | PATCH | Update status order |
| `/api/upload` | POST | Upload gambar ke Supabase Storage |
| `/api/admin/profile` | GET/PATCH | Profil admin |
| `/api/admin/analytics` | GET | Data dashboard & analytics |
| `/api/auth/callback` | GET | Supabase auth callback |

### Frontend yang diupdate
- `app/admin/login/page.tsx` — Real Supabase Auth (login + register)
- `app/cashier/login/page.tsx` — Real Supabase Auth
- `app/admin/products/page.tsx` — Fetch dari API, delete real
- `app/admin/products/add/page.tsx` — POST ke API + upload gambar
- `app/admin/products/edit/[id]/page.tsx` — Fetch + PUT ke API
- `app/customer/checkout/page.tsx` — POST order ke API

---

## Langkah Setup

### 1. Install dependencies

```bash
cd nexasell
npm install
```

### 2. Buat project Supabase

1. Buka [supabase.com](https://supabase.com) → Sign in → New Project
2. Isi nama project: `nexasell`, pilih region terdekat (Singapore)
3. Tunggu project selesai dibuat (~2 menit)

### 3. Setup database

1. Di Supabase Dashboard → klik **SQL Editor** (ikon database)
2. Klik **New query**
3. Copy seluruh isi file `supabase/schema.sql`
4. Paste ke SQL Editor → klik **Run**
5. Seharusnya muncul pesan sukses dan tabel-tabel terbuat

### 4. Setup Supabase Storage

1. Di Supabase Dashboard → **Storage** → **New bucket**
2. Nama bucket: `products`
3. **Centang "Public bucket"** (agar gambar bisa diakses publik)
4. Klik Create

### 5. Isi environment variables

```bash
cp .env.example .env.local
```

Buka `.env.local`, lalu isi nilai-nilainya:

1. Di Supabase Dashboard → **Project Settings** → **API**
2. Copy **Project URL** → paste ke `NEXT_PUBLIC_SUPABASE_URL`
3. Copy **anon / public** key → paste ke `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Copy **service_role** key → paste ke `SUPABASE_SERVICE_ROLE_KEY`

Contoh `.env.local` yang sudah diisi:
```
NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJI...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJI...
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 6. Buat akun admin pertama

**Opsi A — Lewat UI (lebih mudah):**
1. Jalankan `npm run dev`
2. Buka `http://localhost:3000/admin/login`
3. Klik tab **Daftar**, isi form → Submit
4. Akun otomatis mendapat role `admin`

**Opsi B — Lewat Supabase Dashboard:**
1. Supabase → **Authentication** → **Users** → **Add user**
2. Isi email & password → Create
3. Supabase → **SQL Editor** → jalankan:
```sql
-- Ganti UUID dengan ID user yang baru dibuat
INSERT INTO profiles (id, role, full_name)
VALUES ('UUID-USER-DISINI', 'admin', 'Admin NexaSell');
```

### 7. Buat akun kasir

Sama seperti admin, tapi jalankan:
```sql
INSERT INTO profiles (id, role, full_name)
VALUES ('UUID-KASIR-DISINI', 'cashier', 'Nama Kasir');
```
Atau lewat UI admin (fitur kelola user bisa ditambahkan nanti).

### 8. Jalankan aplikasi

```bash
npm run dev
```

Buka `http://localhost:3000` — seharusnya sudah fully functional!

---

## Verifikasi semua berjalan

| Halaman | Yang harus terjadi |
|---|---|
| `/admin/login` | Login berhasil, redirect ke `/admin` |
| `/admin/products` | List produk dari database tampil |
| `/admin/products/add` | Form submit → produk masuk database |
| `/admin/products/edit/[id]` | Data produk load dari DB, edit tersimpan |
| `/cashier/login` | Login kasir berhasil |
| `/customer/checkout` | Submit order → order masuk database |

---

## Troubleshooting

**Error: "Invalid API key"**
→ Cek `.env.local`, pastikan tidak ada spasi ekstra atau baris kosong.

**Error: "relation products does not exist"**
→ Schema SQL belum dijalankan. Ulangi langkah 3.

**Upload gambar gagal**
→ Pastikan bucket `products` sudah dibuat dan **Public** (langkah 4).

**Login redirect loop**
→ Hapus cookies browser, coba lagi. Pastikan role di tabel `profiles` sudah benar.

**RLS error di API**
→ API routes menggunakan `createAdminClient()` yang pakai service role key — pastikan `SUPABASE_SERVICE_ROLE_KEY` sudah diisi di `.env.local`.

---

## Deploy ke Vercel (opsional)

1. Push project ke GitHub
2. Import ke [vercel.com](https://vercel.com)
3. Di Vercel → **Environment Variables**, tambahkan semua variabel dari `.env.local`
4. Ganti `NEXT_PUBLIC_APP_URL` menjadi URL production kamu
5. Deploy!

Di Supabase Dashboard → **Authentication** → **URL Configuration**:
- Site URL: `https://nexasell-kamu.vercel.app`
- Redirect URLs: tambahkan `https://nexasell-kamu.vercel.app/api/auth/callback`
