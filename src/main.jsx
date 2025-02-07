import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import DashboardLayout from "./layout/DashboardLayout";
import Users from "./pages/dashboard/Users";
import UserDetail from "./components/dashboard/users/UserDetail";
import Products from "./pages/dashboard/Products";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Users />} />
          <Route path="/user-detail/:id" element={<UserDetail />} />
          <Route path="/products" element={<Products/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
