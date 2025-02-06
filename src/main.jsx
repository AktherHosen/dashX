import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import DashboardLayout from "./layout/DashboardLayout";
import Users from "./pages/dashboard/Users";
import UserDetail from "./components/dashboard/users/UserDetail";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Users />} />
          <Route path="/user-detail/:id" element={<UserDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
