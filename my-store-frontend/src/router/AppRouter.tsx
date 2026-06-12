import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ROUTES } from "../constants";
import PrivateRoute from "./PrivateRoute";

// Lazy-loaded pages
const Home = React.lazy(() => import("../pages/Home"));
const Products = React.lazy(() => import("../pages/Products"));
const ProductDetail = React.lazy(() => import("../pages/ProductDetail"));
const Cart = React.lazy(() => import("../pages/Cart"));
const Checkout = React.lazy(() => import("../pages/Checkout"));
const Orders = React.lazy(() => import("../pages/Orders"));
const Profile = React.lazy(() => import("../pages/Profile"));
const Login = React.lazy(() => import("../pages/Auth/Login/login_page"));
const Register = React.lazy(
  () => import("../pages/Auth/Register/register_page"),
);
const AdminDashboard = React.lazy(() => import("../pages/Admin/Dashboard"));
const AdminProducts = React.lazy(() => import("../pages/Admin/Products/product_page"));
const AdminOrders = React.lazy(() => import("../pages/Admin/Orders"));

// Layouts
import MainLayout from "../components/layout/MainLayout";

const AppRouter: React.FC = () => (
  <BrowserRouter>
    <React.Suspense
      fallback={<div className="loading-screen">กำลังโหลด...</div>}
    >
      <Routes>
        {/* Public routes — ไม่ต้อง login */}
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.REGISTER} element={<Register />} />

        {/* Public routes with MainLayout */}
        <Route element={<MainLayout />}>
          <Route path={ROUTES.HOME} element={<Home />} />
          <Route path={ROUTES.PRODUCTS} element={<Products />} />
          <Route path={ROUTES.PRODUCT_DETAIL} element={<ProductDetail />} />

          {/* Protected routes — ต้อง login ก่อน */}
          <Route element={<PrivateRoute />}>
            <Route path={ROUTES.CART} element={<Cart />} />
            <Route path={ROUTES.CHECKOUT} element={<Checkout />} />
            <Route path={ROUTES.ORDERS} element={<Orders />} />
            <Route path={ROUTES.PROFILE} element={<Profile />} />
            <Route path={ROUTES.ADMIN.DASHBOARD} element={<AdminDashboard />} />
            <Route path={ROUTES.ADMIN.PRODUCTS} element={<AdminProducts />} />
            <Route path={ROUTES.ADMIN.ORDERS} element={<AdminOrders />} />
          </Route>
        </Route>

        {/* Fallback — redirect ไปหน้า Home เสมอ */}
        <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
      </Routes>
    </React.Suspense>
  </BrowserRouter>
);

export default AppRouter;
