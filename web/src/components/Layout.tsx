import { Outlet } from "react-router-dom";

import { AnimatedOutlet } from "@components/AnimatedOutlet";
import { Footer } from "@components/Footer";
import { Navbar, NavbarAdmin, Utility } from "@components/Navbar";
import { WhatsApp } from "@components/WhatsApp";

export function Layout() {
  return (
    <>
      <header>
        <Utility />
        <Navbar />
      </header>
      <main className="h-100">
        <WhatsApp />
        <AnimatedOutlet>
          <Outlet />
        </AnimatedOutlet>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export function AdminLayout() {
  return (
    <>
      <header>
        <NavbarAdmin />
      </header>
      <main className="h-100">
        <Outlet />
      </main>
    </>
  );
}
