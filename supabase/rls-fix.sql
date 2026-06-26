-- ============================================================
-- FIX: Buat RPC Function untuk create profile (bypass RLS)
-- dan hapus trigger lama yang bermasalah
-- ============================================================

-- 1️⃣ Hapus trigger lama yang bermasalah (jika masih ada)
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user;

-- 2️⃣ Buat RPC Function create_profile (bypass RLS via SECURITY DEFINER)
CREATE OR REPLACE FUNCTION public.create_profile(
    user_id UUID,
    user_full_name TEXT DEFAULT ''
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    INSERT INTO public.profiles (id, full_name, role, tier, points)
    VALUES (user_id, user_full_name, 'Guest', 'Bronze', 0)
    ON CONFLICT (id) DO NOTHING;
END;
$$;

-- Beri izin anon dan authenticated untuk memanggil fungsi ini
GRANT EXECUTE ON FUNCTION public.create_profile TO anon, authenticated;


-- ============================================================
-- 🔧 Untuk user yang sudah terlanjur register (ada di auth.users tapi
--    tidak punya profile), buat manual dengan query di bawah.
--    Cari UUID user di: Supabase Dashboard → Authentication → Users
-- ============================================================

-- INSERT INTO profiles (id, full_name, role, tier, points)
-- VALUES ('USER_UUID', 'Nama User', 'Guest', 'Bronze', 0);

-- Atau, user bisa login saja dan profile akan dibuat otomatis
-- oleh kode fetchProfile di aplikasi.


-- ============================================================
-- 🔧 Upgrade user jadi Admin (setelah profile dibuat):
-- ============================================================

-- UPDATE profiles SET role = 'Admin' WHERE id = 'USER_UUID';


-- ============================================================
-- ✅ Verifikasi
-- ============================================================

-- Cek semua policy di tabel profiles:
-- SELECT * FROM pg_policies WHERE tablename = 'profiles';
