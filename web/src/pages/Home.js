import { Fragment } from "react";
import { Outlet } from "react-router-dom";

import { AnimatedPage } from "~/components/Animation/AnimatedPage";
import { Footer } from "~/components/Partials/Footer";
import { Header, Utility } from "~/components/Partials/Header";
//import { WhatsApp } from "~/components/Floating";

export function Home() {
  return (
    <Fragment>
      <header>
        <Utility />
        <Header />
      </header>
      <main>
        <AnimatedPage>
          <Outlet />
        </AnimatedPage>
        <Footer />
      </main>
    </Fragment>
  );
}
