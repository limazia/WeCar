import { Fragment } from "react";
import { Outlet } from "react-router-dom";

import { HeaderAdmin } from "~/components/Partials/Header";

export function Admin() {
  return (
    <Fragment>
      <header>
        <HeaderAdmin />
      </header>
      <main>
        <Outlet />
      </main>
    </Fragment>
  );
}
