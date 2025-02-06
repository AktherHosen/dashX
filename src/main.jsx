import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import DashboardLayout from "./layout/DashboardLayout";
import Users from "./pages/dashboard/Users";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Users />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
