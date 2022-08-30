import { Fragment } from "react";
import { Outlet } from "react-router-dom";

import { AnimatedPage } from "~/components/Animation/AnimatedPage";
import { Footer } from "~/components/Footer";
import { Header } from "~/components/Header";
import { WhatsApp } from "~/components/Floating";

export function Home() {
  return (
    <Fragment>
      <Header />
      <main>
        <WhatsApp />
        <AnimatedPage>
          <Outlet />
        </AnimatedPage>
        <Footer />
      </main>
    </Fragment>
  );
}
