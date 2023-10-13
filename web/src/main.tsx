import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { AuthProvider } from "@utils/contexts/AuthContext";

import { Toastify } from "@components/Toastify";
import { Routes } from "./Router";

import "./styles/styles.css";

if (import.meta.env.VITE_APP_ENV === "production") {
  console.log = () => undefined;
  console.error = () => undefined;
  console.debug = () => undefined;
}

const rootElement = document.getElementById("app");

if (rootElement) {
  createRoot(rootElement as HTMLElement).render(
    <BrowserRouter>
      <AuthProvider>
        <Routes />
        <Toastify autoClose={5000} />
      </AuthProvider>
    </BrowserRouter>
  );
}
