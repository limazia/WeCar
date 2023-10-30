import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { Toastify } from "@components/Toastify";
import { Routes } from "./Router";

import { ConfigProvider } from "@shared/contexts/ConfigContext";
import { AuthProvider } from "@shared/contexts/AuthContext";

import "./styles/styles.css";

const rootElement = document.getElementById("app");

if (rootElement) {
  createRoot(rootElement as HTMLElement).render(
    <BrowserRouter>
      <ConfigProvider>
        <AuthProvider>
          <Routes />
          <Toastify />
        </AuthProvider>
      </ConfigProvider>
    </BrowserRouter>
  );
}
