import { Fragment, useState } from "react";

import useAuth from "~/hooks/useAuth";

import { Head } from "~/components/Partials/Head";
import { Loading } from "~/components/Partials/Loading";
import { useEffect } from "react";

export function Dashboard() {
  const { logout } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, [loading]);

  const handleLogout = () => {
    logout();
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <Fragment>
      <Head title="Painel Administrativo" />
      <h1>Dashboard</h1>
      <button onClick={handleLogout}>saad</button>
    </Fragment>
  );
}
