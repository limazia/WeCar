import { Fragment } from "react";
import { destroyCookie } from "nookies";

import { Head } from "~/components/Partials/Head";

export function Dashboard() {
  const handleLogout = () => {
    destroyCookie(undefined, "wecar.token");
    destroyCookie(undefined, "wecar.refreshToken");
 
  };

  return (
    <Fragment>
      <Head title="Painel Administrativo" />
      <h1>Dashboard</h1>
      <button onClick={handleLogout}>saad</button>
    </Fragment>
  );
}
