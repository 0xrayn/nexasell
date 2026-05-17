const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(
  'https://xpuevmulifizyylheohv.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhwdWV2bXVsaWZpenl5bGhlb2h2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3ODk2NTM0NSwiZXhwIjoyMDk0NTQxMzQ1fQ.b6bfLI7TF09HdXcegzoXIleWzxvHGexlTaAl--9KZZE'
)

const users = [
  { email: 'admin@nexasell.id',  password: 'admin123456', role: 'admin',   name: 'Admin NexaSell', phone: '081200000001' },
  { email: 'kasir@nexasell.id',  password: 'kasir123456', role: 'cashier', name: 'Siti Rahayu',    phone: '081200000002' },
  { email: 'kasir2@nexasell.id', password: 'kasir123456', role: 'cashier', name: 'Budi Santoso',   phone: '081200000003' },
]

async function seed() {
  for (const u of users) {
    const { data, error } = await supabase.auth.admin.createUser({
      email: u.email,
      password: u.password,
      email_confirm: true,
    })
    if (error) { console.error('✗', u.email, error.message); continue; }

    const { error: profileError } = await supabase.from('profiles').upsert({
      id: data.user.id,
      role: u.role,
      full_name: u.name,
      phone: u.phone,
    })
    if (profileError) { console.error('✗ profile', u.email, profileError.message); continue; }
    console.log('✓', u.email)
  }
  console.log('Done!')
}

seed()