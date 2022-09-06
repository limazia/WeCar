import { Fragment } from "react";
import { Outlet } from "react-router-dom";

import { AnimatedPage } from "~/components/Animation/AnimatedPage";
import { HeaderAdmin } from "~/components/Partials/Header";
import { SidebarAdmin } from "~/components/Partials/Sidebar";

export function Admin() {
  return (
    <Fragment>
      <header className="header" id="header">
        <HeaderAdmin />
      </header>
      <aside>
        <SidebarAdmin />
      </aside>
      <main>
        <AnimatedPage>
          <Outlet />
        </AnimatedPage>
      </main>
    </Fragment>
  );
}
