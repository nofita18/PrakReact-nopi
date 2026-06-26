-- ============================================================
-- TAHAP 1: Database Schema & Row Level Security (RLS)
-- Jalankan SQL ini di Supabase Dashboard -> SQL Editor
-- Urutan: Types -> Tables -> RLS -> Policies -> Trigger
-- ============================================================

-- ============================================================
-- 1️⃣ CUSTOM ENUM TYPES
-- ============================================================
CREATE TYPE user_role AS ENUM ('Admin', 'Member', 'Guest');
CREATE TYPE member_tier AS ENUM ('Bronze', 'Silver', 'Gold');
CREATE TYPE order_status AS ENUM ('Pending', 'Completed', 'Cancelled');

-- ============================================================
-- 2️⃣ TABLES
-- ============================================================

-- 2.1 TABLE: profiles (terintegrasi dengan auth.users)
CREATE TABLE profiles (
    id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
    full_name TEXT,
    role user_role DEFAULT 'Guest'::user_role NOT NULL,
    tier member_tier DEFAULT 'Bronze'::member_tier,
    points INT DEFAULT 0 NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 2.2 TABLE: products
CREATE TABLE products (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    price NUMERIC(12, 2) NOT NULL,
    stock INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 2.3 TABLE: customers
CREATE TABLE customers (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE,
    phone TEXT,
    address TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 2.4 TABLE: orders
CREATE TABLE orders (
    id BIGSERIAL PRIMARY KEY,
    profile_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    customer_id BIGINT REFERENCES customers(id) ON DELETE SET NULL,
    total_amount NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    points_earned INT DEFAULT 0,
    status order_status DEFAULT 'Pending'::order_status NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 2.5 TABLE: order_items
CREATE TABLE order_items (
    id BIGSERIAL PRIMARY KEY,
    order_id BIGINT REFERENCES orders(id) ON DELETE CASCADE NOT NULL,
    product_id BIGINT REFERENCES products(id) ON DELETE SET NULL,
    quantity INT NOT NULL CHECK (quantity > 0),
    price_at_purchase NUMERIC(12, 2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);


-- ============================================================
-- 3️⃣ ENABLE ROW LEVEL SECURITY
-- ============================================================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;


-- ============================================================
-- 4️⃣ RLS POLICIES
-- ============================================================

-- 4.1 PROFILES
-- User biasa hanya bisa melihat profilnya sendiri
CREATE POLICY "Pengguna bisa melihat profil sendiri" ON profiles
    FOR SELECT USING (auth.uid() = id);

-- User bisa insert profil sendiri (untuk registrasi dari frontend)
CREATE POLICY "User bisa insert profil sendiri" ON profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

-- User bisa update profil sendiri
CREATE POLICY "User bisa update profil sendiri" ON profiles
    FOR UPDATE USING (auth.uid() = id);

-- Admin bisa mengelola semua profil
CREATE POLICY "Admin bisa mengelola semua profil" ON profiles
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE id = auth.uid() AND role = 'Admin'
        )
    );

-- 4.2 PRODUCTS
-- Semua user terautentikasi bisa melihat produk
CREATE POLICY "Semua user terautentikasi bisa melihat produk" ON products
    FOR SELECT USING (auth.role() = 'authenticated');

-- Admin memiliki akses penuh ke produk
CREATE POLICY "Admin memiliki akses penuh ke produk" ON products
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE id = auth.uid() AND role = 'Admin'
        )
    );

-- 4.3 CUSTOMERS
-- Hanya Admin yang bisa akses tabel customers
CREATE POLICY "Hanya Admin yang bisa akses tabel customers" ON customers
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE id = auth.uid() AND role = 'Admin'
        )
    );

-- 4.4 ORDERS
-- Admin bisa akses semua orders
CREATE POLICY "Admin bisa akses semua orders" ON orders
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE id = auth.uid() AND role = 'Admin'
        )
    );

-- Member bisa melihat order milik sendiri
CREATE POLICY "Member bisa melihat order milik sendiri" ON orders
    FOR SELECT USING (profile_id = auth.uid());

-- Member bisa membuat order sendiri
CREATE POLICY "Member bisa membuat order sendiri" ON orders
    FOR INSERT WITH CHECK (profile_id = auth.uid());

-- 4.5 ORDER_ITEMS
-- Akses order_items berdasarkan relasi ke orders
CREATE POLICY "Akses order items berdasarkan relasi order" ON order_items
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM orders
            WHERE orders.id = order_items.order_id
            AND (
                orders.profile_id = auth.uid()
                OR EXISTS (
                    SELECT 1 FROM profiles
                    WHERE id = auth.uid() AND role = 'Admin'
                )
            )
        )
    );


-- ============================================================
-- 5️⃣ RPC FUNCTION: Auto-create profile (bypass RLS via SECURITY DEFINER)
-- Dipanggil dari frontend untuk membuat profile tanpa terkendala RLS
-- ============================================================

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
-- ✅ SELESAI - Semua tabel, RLS, dan trigger sudah dibuat
-- ============================================================

-- 👉 Langkah selanjutnya:
-- 1. Jika register mengalami Error 500, DROP trigger berikut agar profile
--    dibuat dari frontend (lebih stabil):
--    DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
--    DROP FUNCTION IF EXISTS public.handle_new_user;
--
-- 2. Daftarkan 1 user melalui halaman Register aplikasi
-- 3. Jalankan query berikut di SQL Editor untuk upgrade role user ke Admin:
--    UPDATE profiles SET role = 'Admin' WHERE id = '<UUID_USER_DARI_AUTH>';
-- 4. Refresh halaman, login sebagai Admin, dan aplikasi siap digunakan
