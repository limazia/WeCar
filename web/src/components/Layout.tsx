import { Outlet } from "react-router-dom";

import { AnimatedOutlet } from "@components/AnimatedOutlet";
import { Footer } from "@components/Footer";
import { Navbar, NavbarAdmin, Utility } from "@components/Navbar";
import { WhatsApp } from "@components/WhatsApp";
import { BottomTabs } from "./BottomTabs";
import { Sidebar } from "./Sidebar";

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
      <div className="container-fluid">
        <div className="row">
          <nav className="col-md-3 col-lg-2 d-sm-none d-lg-block px-0">
            <Sidebar />
          </nav>

          <main className="col-md-9 col-lg-10">
            <header>
              <NavbarAdmin />
            </header>

            <div className="mb-5">
              <Outlet />
            </div>
          </main>

          <BottomTabs />
        </div>
      </div>
    </>
  );
}
