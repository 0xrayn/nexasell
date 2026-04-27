# NexaSell — Modern POS & Storefront System

NexaSell adalah aplikasi **Point of Sale (POS) fullstack modern** berbasis Next.js 15, dirancang untuk bisnis retail yang membutuhkan toko online pelanggan, panel kasir, dan dashboard admin dalam satu platform.

> ⚠️ **Status:** Frontend only (MVP). Backend & database integration direncanakan untuk versi berikutnya.

---

## ✨ Fitur Utama

### 🛍️ Customer Storefront (`/`)
- Hero section dengan Flash Sale countdown dan Best Sellers
- Pencarian produk real-time dengan filter kategori
- Sorting produk (terpopuler, rating, harga)
- Halaman detail produk dengan pilihan jumlah
- Keranjang belanja persisten (Context API)
- Halaman checkout dengan ringkasan order

### 🖥️ Admin Dashboard (`/admin`)
- Ringkasan revenue, transaksi, dan produk terlaris
- Grafik penjualan bulanan (Recharts)
- Manajemen produk: tambah, edit, hapus
- Halaman analytics dengan statistik lengkap
- Pengaturan toko

### 💳 Kasir Panel (`/cashier`)
- Antarmuka kasir untuk proses transaksi
- Riwayat transaksi harian
- Pengaturan profil kasir

### 🎨 UI/UX
- Dark / Light mode dengan zero flash (inline script SSR-safe)
- Desain responsif penuh (mobile-first)
- Animasi halus dengan CSS keyframes
- Ticker promo, trust badges, kategori pill filter

---

## 🗂️ Struktur Proyek

```
nexasell/
├── app/
│   ├── page.tsx                  # Customer storefront (homepage)
│   ├── layout.tsx                # Root layout + ThemeProvider + CartProvider
│   ├── globals.css               # CSS variables, animations, utilities
│   ├── customer/
│   │   ├── products/[id]/        # Halaman detail produk
│   │   ├── cart/                 # Keranjang belanja
│   │   └── checkout/             # Halaman checkout
│   ├── admin/
│   │   ├── page.tsx              # Dashboard admin
│   │   ├── products/             # CRUD produk (add, edit)
│   │   ├── analytics/            # Halaman analitik
│   │   └── settings/             # Pengaturan admin
│   └── cashier/
│       ├── page.tsx              # Panel kasir
│       ├── history/              # Riwayat transaksi
│       └── settings/             # Pengaturan kasir
├── components/
│   ├── ui/
│   │   ├── Navbar.tsx            # Navigasi utama
│   │   └── Footer.tsx            # Footer
│   ├── admin/
│   │   ├── AdminSidebar.tsx      # Sidebar admin collapsible
│   │   └── RevenueChart.tsx      # Chart pendapatan
│   ├── cashier/
│   │   └── CashierSidebar.tsx    # Sidebar kasir
│   └── customer/
│       └── ProductCard.tsx       # Kartu produk
├── lib/
│   ├── CartContext.tsx           # Global cart state
│   ├── ThemeContext.tsx          # Dark/light mode state
│   ├── SidebarContext.tsx        # Sidebar collapse state
│   └── utils.ts                  # Helper (formatRupiah, dll)
└── data/
    └── products.ts               # Data produk, kategori, transaksi (mock)
```

---

## 🚀 Cara Menjalankan

### Prasyarat
- Node.js 18+
- npm / yarn / pnpm

### Instalasi

```bash
git clone https://github.com/username/nexasell.git
cd nexasell
npm install
```

### Development

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

### Build Production

```bash
npm run build
npm start
```

---

## 🖼️ Screenshots

> *Screenshots akan ditambahkan.*

| Halaman | Deskripsi |
|--------|-----------|
| `/` | Customer storefront — hero, flash sale, produk |
| `/customer/cart` | Keranjang belanja |
| `/customer/checkout` | Halaman checkout |
| `/admin` | Dashboard admin dengan chart revenue |
| `/admin/products` | Manajemen produk |
| `/cashier` | Panel transaksi kasir |

---

## 🛣️ Roadmap

### Backend (direncanakan)
- [ ] REST API / Next.js Route Handlers
- [ ] Database integration (PostgreSQL + Prisma atau MongoDB)
- [ ] Autentikasi JWT untuk admin & kasir
- [ ] Upload gambar produk (Cloudinary / S3)
- [ ] Laporan & export PDF/Excel

### Frontend (direncanakan)
- [ ] Notifikasi real-time (WebSocket)
- [ ] PWA support (offline mode)
- [ ] Multi-bahasa (i18n)
- [ ] Integrasi payment gateway (Midtrans / Xendit)

---

## 🛠️ Tech Stack

| Layer | Teknologi |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 + CSS Variables |
| Icons | Lucide React |
| Charts | Recharts |
| State | React Context API |
| Font | Outfit (Google Fonts) |

---

## 🔒 Keamanan (Catatan Frontend)

- Tidak ada API key atau secret yang ter-expose di client
- Data produk saat ini menggunakan mock data statis
- Saat backend diimplementasi: gunakan environment variables (`.env.local`) untuk semua credential
- Jangan commit file `.env` ke repository

---

## 📄 Lisensi

MIT License — bebas digunakan untuk proyek pribadi maupun komersial.

---

## 👤 Kontributor

Dibuat dengan ❤️ menggunakan Next.js. Kontribusi welcome — buka issue atau pull request!
