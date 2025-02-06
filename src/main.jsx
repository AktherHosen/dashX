import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import DashboardLayout from "./layout/DashboardLayout";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardLayout />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
