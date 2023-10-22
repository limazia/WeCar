import { Outlet } from "react-router-dom";

import { Head } from "@components/Head";
import { Navigation } from "@components/Cards/Settings";

export function Settings() {
  return (
    <>
      <Head title="Configuração de conta" />
      <div className="container pb-5">
        <div className="row">
          <div className="col-md-4">
            <Navigation />
          </div>
          <div className="col-md-8">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
