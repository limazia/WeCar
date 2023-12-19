import { Outlet } from "react-router-dom";

import { useAuth } from "@shared/hooks/useAuth";

import { Head } from "@components/Head";
import { Navigation } from "@components/Cards/Settings";

export function Settings() {
  const { logout } = useAuth();

  const handleLogout = () => logout();

  return (
    <>
      <Head title="Configuração de conta" />

      <div className="container pb-5">
        <div className="row">
          <div className="col-sm-12 col-md-4">
            <Navigation />
          </div>
          <div className="col-sm-12 col-md-8">
            <Outlet />
          </div>
        </div>

        <div className="d-sm-block d-md-none">
          <div className="row mt-4">
            <div className="col-md-12">
              <button className="btn btn-danger btn-block" onClick={handleLogout}>
                Sair do WeCar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
