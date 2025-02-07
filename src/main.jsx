import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import DashboardLayout from "./layout/DashboardLayout";
import Users from "./pages/dashboard/Users";
import UserDetail from "./components/dashboard/users/UserDetail";
import Products from "./pages/dashboard/Products";
import CreateProduct from "./pages/dashboard/CreateProduct";
import MyPrdouct from "./pages/dashboard/MyPrdouct";
import AuthProvider from "./provider/AuthProvider";
import Registration from "./pages/auth/Registration";
import Login from "./pages/auth/Login";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index={true} element={<Users />} />
            <Route path="/dashboard/user-detail/:id" element={<UserDetail />} />
            <Route path="/dashboard/products" element={<Products />} />
            <Route path="/dashboard/add-product" element={<CreateProduct />} />
            <Route path="/dashboard/my-product/:id" element={<MyPrdouct />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
