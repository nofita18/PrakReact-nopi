import { Routes, Route } from "react-router-dom";
import "./assets/tailwind.css";
import React, { Suspense } from "react";
import Loading from "./components/Loading";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import RoleGuard from "./components/RoleGuard";

const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Orders = React.lazy(() => import("./pages/Orders"));
const Customers = React.lazy(() => import("./pages/Customers"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
const Error400 = React.lazy(() => import("./pages/Error400"));
const Error401 = React.lazy(() => import("./pages/Error401"));
const Error403 = React.lazy(() => import("./pages/Error403"));
const MainLayout = React.lazy(() => import("./layouts/MainLayout"));
const AuthLayout = React.lazy(() => import("./layouts/AuthLayout"));
const Login = React.lazy(() => import("./pages/auth/Login"));
const Forgot = React.lazy(() => import("./pages/auth/Forgot"));
const Register = React.lazy(() => import("./pages/auth/Register"));
const Products = React.lazy(() => import("./pages/products"));
const FiturXyz = React.lazy(() => import("./pages/FiturXyz"));
const Note = React.lazy(() => import("./pages/Note"));
const ProductDetail = React.lazy(() => import("./pages/ProductDetail"));
const Components = React.lazy(() => import("./pages/Components"));

function App() {
  return (
    <AuthProvider>
      <Suspense fallback={<Loading />}>
        <Routes>
          {/* 🔐 Auth Layout — halaman publik */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot" element={<Forgot />} />
          </Route>

          {/* 🔐 Main Layout — semua halaman di bawah ini butuh login */}
          <Route
            element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/" element={<Dashboard />} />
            <Route
              path="/orders"
              element={
                <RoleGuard allowedRoles={["Admin", "Member"]}>
                  <Orders />
                </RoleGuard>
              }
            />
            <Route
              path="/customers"
              element={
                <RoleGuard allowedRoles={["Admin"]}>
                  <Customers />
                </RoleGuard>
              }
            />
            <Route
              path="/products"
              element={
                <RoleGuard allowedRoles={["Admin", "Member"]}>
                  <Products />
                </RoleGuard>
              }
            />
            <Route
              path="/products/:id"
              element={
                <RoleGuard allowedRoles={["Admin", "Member"]}>
                  <ProductDetail />
                </RoleGuard>
              }
            />
            <Route
              path="/components"
              element={
                <RoleGuard allowedRoles={["Admin"]}>
                  <Components />
                </RoleGuard>
              }
            />
            <Route path="/fiturXyz" element={<FiturXyz />} />
            <Route path="/note" element={<Note />} />
            <Route path="/error400" element={<Error400 />} />
            <Route path="/error401" element={<Error401 />} />
            <Route path="/error403" element={<Error403 />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </AuthProvider>
  );
}

export default App;
