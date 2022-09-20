import { Fragment } from "react";
import { Outlet } from "react-router-dom";

import { getToken } from "~/utils/services/auth";

import { HeaderAdmin } from "~/components/Partials/Header";

export function Admin() {
  return (
    <Fragment>
      {getToken() && (
        <header>
          <HeaderAdmin />
        </header>
      )}
      <main>
        <Outlet />
      </main>
    </Fragment>
  );
}
