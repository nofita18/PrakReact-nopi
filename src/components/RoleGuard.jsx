import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Loading from "./Loading";

/**
 * RoleGuard — Cegah akses berdasarkan role user
 * Props:
 *   - allowedRoles: Array of role names yang diizinkan (contoh: ["Admin", "Member"])
 *   - children: Komponen yang akan dirender jika role sesuai
 *   - fallbackPath: Path tujuan jika role tidak sesuai (default: "/")
 *
 * Jika role tidak sesuai → redirect ke fallbackPath
 */
export default function RoleGuard({
  children,
  allowedRoles = [],
  fallbackPath = "/",
}) {
  const { session, profile, loading } = useAuth();

  if (loading) {
    return <Loading />;
  }

  // Belum login, redirect ke login
  if (!session) {
    return <Navigate to="/login" replace />;
  }

  // Cek role
  const userRole = profile?.role;
  if (!userRole || !allowedRoles.includes(userRole)) {
    return <Navigate to={fallbackPath} replace />;
  }

  return children;
}
