import { Outlet } from "react-router-dom";

import { NavbarAdmin } from "@components/Navbar";
import { BottomTabs } from "@components/BottomTabs";
import { Sidebar } from "@components/Sidebar";

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
