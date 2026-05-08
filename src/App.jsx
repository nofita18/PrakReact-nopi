import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom"; // ✅ tambah ini
import "./assets/tailwind.css";
//import Dashboard from "./pages/Dashboard";
//import Orders from "./pages/Orders";
//import Customers from "./pages/Customers";
//import NotFound from "./pages/NotFound";
//import Error400 from "./pages/Error400";
//import Error401 from "./pages/Error401";
//import Error403 from "./pages/Error403";
//import MainLayout from "./layouts/MainLayout";
import React, { Suspense, useState } from "react";
import Loading from "./components/Loading";
//import AuthLayout from "./layouts/AuthLayout";
//import Login from "./pages/auth/Login";
//import Forgot from "./pages/auth/Forgot";
//import Register from "./pages/auth/Register";

const Dashboard = React.lazy(() => import("./pages/Dashboard"))
const Orders = React.lazy(() => import("./pages/Orders"))
const Customers = React.lazy(() => import("./pages/Customers"))
const NotFound = React.lazy(() => import("./pages/NotFound"))
const Error400 = React.lazy(() => import("./pages/Error400"))
const Error401 = React.lazy(() => import("./pages/Error401"))
const Error403 = React.lazy(() => import("./pages/Error403"))
const MainLayout = React.lazy(() => import("./layouts/MainLayout"))
const AuthLayout = React.lazy(() => import("./layouts/AuthLayout"))
const Login = React.lazy(() => import("./pages/auth/Login"))
const Forgot = React.lazy(() => import("./pages/auth/Forgot"))
const Register = React.lazy(() => import("./pages/auth/Register"))

function App() {
  const [count, setCount] = useState(0);
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
      <Route element={<MainLayout />}>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/error400" element={<Error400 />} />
        <Route path="/error401" element={<Error401 />} />
        <Route path="/error403" element={<Error403 />} />
      </Route>
      <Route element={<AuthLayout/>}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register/>} />
            <Route path="/forgot" element={<Forgot/>} />
      </Route>
    </Routes>
    </Suspense>
    
  );
}

export default App;
