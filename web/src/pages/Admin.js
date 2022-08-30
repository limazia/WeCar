import { Fragment } from "react";
import { Outlet } from "react-router-dom";

import { AnimatedPage } from "~/components/Animation/AnimatedPage";

export function Admin() {
  return (
    <Fragment>
      <main>
        <AnimatedPage>
          <Outlet />
        </AnimatedPage>
      </main>
    </Fragment>
  );
}
