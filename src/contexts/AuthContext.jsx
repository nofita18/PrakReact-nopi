import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../services/supabaseClient";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Cek session saat pertama render
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(
          session.user.id,
          session.user.user_metadata
        );
      }
      setLoading(false);
    });

    // Listen untuk perubahan auth (login/logout)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(
          session.user.id,
          session.user.user_metadata
        );
      } else {
        setProfile(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Ambil data profile dari tabel profiles
  // Jika belum ada, buat via RPC (bypass RLS)
  const fetchProfile = async (userId, userMeta) => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (data) {
      setProfile(data);
    } else if (error?.code === "PGRST116") {
      // Profile belum ada — buat via RPC
      const fullName = userMeta?.full_name || "User";

      try {
        await supabase.rpc("create_profile", {
          user_id: userId,
          user_full_name: fullName,
        });
        // Set profile locally
        setProfile({
          id: userId,
          full_name: fullName,
          role: "Guest",
          tier: "Bronze",
          points: 0,
        });
      } catch (e) {
        console.warn("Gagal buat profile via RPC:", e.message);
      }
    }
  };

  // Login
  const login = async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
  };

  // Register
  const register = async (fullName, email, password) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });
    if (error) throw error;

    // Buat profile via RPC (bypass RLS) — lebih reliable
    if (data?.user) {
      try {
        await supabase.rpc("create_profile", {
          user_id: data.user.id,
          user_full_name: fullName,
        });
      } catch (e) {
        console.warn("Gagal create profile via RPC:", e.message);
      }
    }
  };

  // Logout
  const logout = async () => {
    await supabase.auth.signOut();
    setProfile(null);
  };

  // Reset Password
  const resetPassword = async (email) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/login`,
    });
    if (error) throw error;
  };

  // Reload profile (dipanggil setelah update poin/tier)
  const refreshProfile = () => {
    if (user) fetchProfile(user.id, user.user_metadata);
  };

  const value = {
    user,
    session,
    profile,
    loading,
    login,
    register,
    logout,
    resetPassword,
    refreshProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth harus digunakan di dalam AuthProvider");
  }
  return context;
}
