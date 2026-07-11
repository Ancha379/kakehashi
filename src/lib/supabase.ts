import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!url || !anonKey) {
  // Gagal keras & jelas kalau env belum di-set (lokal: .env.local; CI: GitHub Secrets).
  throw new Error(
    'Supabase env belum di-set. Isi VITE_SUPABASE_URL & VITE_SUPABASE_ANON_KEY (lihat .env.local).'
  );
}

export const supabase = createClient(url, anonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
});
