-- ============================================================
--  NexaSell — Seed Users & Profiles
--  Jalankan di Supabase SQL Editor
--
--  LANGKAH:
--  1. Jalankan bagian "BUAT USER" dulu (Step 1)
--  2. Copy UUID yang muncul di hasil query
--  3. Paste UUID ke bagian "INSERT PROFILES" (Step 2)
--  4. Jalankan bagian Step 2
-- ============================================================

-- ══════════════════════════════════════════════════════════════
--  STEP 1 — Buat user di Supabase Auth
--  Jalankan ini dulu, lalu lihat hasilnya untuk dapat UUID
-- ══════════════════════════════════════════════════════════════

-- Buat admin
SELECT id FROM auth.users WHERE email = 'admin@nexasell.id';
-- Kalau kosong (belum ada), buat dengan query ini:

INSERT INTO auth.users (
  id,
  instance_id,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  role,
  aud
) VALUES (
  gen_random_uuid(),
  '00000000-0000-0000-0000-000000000000',
  'admin@nexasell.id',
  crypt('admin123456', gen_salt('bf')),
  NOW(),
  '{"provider":"email","providers":["email"]}',
  '{"full_name":"Admin NexaSell"}',
  NOW(),
  NOW(),
  'authenticated',
  'authenticated'
),
(
  gen_random_uuid(),
  '00000000-0000-0000-0000-000000000000',
  'kasir@nexasell.id',
  crypt('kasir123456', gen_salt('bf')),
  NOW(),
  '{"provider":"email","providers":["email"]}',
  '{"full_name":"Siti Rahayu"}',
  NOW(),
  NOW(),
  'authenticated',
  'authenticated'
),
(
  gen_random_uuid(),
  '00000000-0000-0000-0000-000000000000',
  'kasir2@nexasell.id',
  crypt('kasir123456', gen_salt('bf')),
  NOW(),
  '{"provider":"email","providers":["email"]}',
  '{"full_name":"Budi Santoso"}',
  NOW(),
  NOW(),
  'authenticated',
  'authenticated'
);

-- Lihat UUID yang baru dibuat:
SELECT id, email, created_at
FROM auth.users
WHERE email IN ('admin@nexasell.id', 'kasir@nexasell.id', 'kasir2@nexasell.id')
ORDER BY created_at DESC;

-- ══════════════════════════════════════════════════════════════
--  STEP 2 — Insert profiles
--  Copy UUID dari hasil Step 1, paste ke sini
-- ══════════════════════════════════════════════════════════════

-- CARA PALING MUDAH: jalankan query ini langsung
-- (otomatis ambil UUID dari auth.users tanpa perlu copy-paste)

INSERT INTO profiles (id, role, full_name, phone)
SELECT
  u.id,
  CASE u.email
    WHEN 'admin@nexasell.id'  THEN 'admin'::user_role
    WHEN 'kasir@nexasell.id'  THEN 'cashier'::user_role
    WHEN 'kasir2@nexasell.id' THEN 'cashier'::user_role
  END,
  CASE u.email
    WHEN 'admin@nexasell.id'  THEN 'Admin NexaSell'
    WHEN 'kasir@nexasell.id'  THEN 'Siti Rahayu'
    WHEN 'kasir2@nexasell.id' THEN 'Budi Santoso'
  END,
  CASE u.email
    WHEN 'admin@nexasell.id'  THEN '081200000001'
    WHEN 'kasir@nexasell.id'  THEN '081200000002'
    WHEN 'kasir2@nexasell.id' THEN '081200000003'
  END
FROM auth.users u
WHERE u.email IN ('admin@nexasell.id', 'kasir@nexasell.id', 'kasir2@nexasell.id')
ON CONFLICT (id) DO UPDATE
  SET
    role      = EXCLUDED.role,
    full_name = EXCLUDED.full_name,
    phone     = EXCLUDED.phone;

-- Verifikasi hasil:
SELECT
  p.id,
  u.email,
  p.role,
  p.full_name,
  p.phone,
  p.created_at
FROM profiles p
JOIN auth.users u ON u.id = p.id
ORDER BY p.role, p.full_name;
