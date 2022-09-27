import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import useAuth from "~/utils/hooks/useAuth";

import { Head } from "~/components/Partials/Head";
import { Loading } from "~/components/Partials/Loading";
import { Permission } from "~/components/Core/Permission";

export function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [splash, setSplash] = useState(true);

  useEffect(() => {
    if (user !== null) {
      setTimeout(() => setSplash(false), 2000);
    } else {
      setSplash(true);
    }
  }, [user, splash]);

  if (splash) {
    return <Loading type="animated" />;
  }

  const goBrands = () => navigate("./brands");
  const goModels = () => navigate("./models");
  const goCars = () => navigate("./cars");
  const goUsers = () => navigate("./users");

  return (
    <>
      <Head title="Painel Administrativo" />
      <div className="container">
        <div className="row">
          {user.permissions && (
            <div className="col-md-8">
              <div className="card card-options">
                <div className="card-header px-0">
                  <h5>Opções do sistema</h5>
                </div>
                <div className="card-body pt-0 px-0">
                  <Permission required={["admin", "brands"]}>
                    <button
                      className="btn btn-option btn-block mt-3"
                      onClick={goBrands}
                    >
                      <div className="d-flex align-items-center">
                        <div className="icon-box">
                          <i className="far fa-compact-disc"></i>
                        </div>
                        Marcas
                      </div>
                      <i className="fas fa-angle-right"></i>
                    </button>
                  </Permission>
                  <Permission required={["admin", "models"]}>
                    <button
                      className="btn btn-option btn-block mt-4"
                      onClick={goModels}
                    >
                      <div className="d-flex align-items-center">
                        <div className="icon-box">
                          <i className="far fa-tire"></i>
                        </div>
                        Modelos
                      </div>
                      <i className="fas fa-angle-right"></i>
                    </button>
                  </Permission>
                  <Permission required={["admin", "cars"]}>
                    <button
                      className="btn btn-option btn-block mt-4"
                      onClick={goCars}
                    >
                      <div className="d-flex align-items-center">
                        <div className="icon-box">
                          <i className="far fa-cars"></i>
                        </div>
                        Carros
                      </div>
                      <i className="fas fa-angle-right"></i>
                    </button>
                  </Permission>
                  <Permission required={["admin", "users"]}>
                    <button
                      className="btn btn-option btn-block mt-4"
                      onClick={goUsers}
                    >
                      <div className="d-flex align-items-center">
                        <div className="icon-box">
                          <i className="far fa-users"></i>
                        </div>
                        Usuarios
                      </div>
                      <i className="fas fa-angle-right"></i>
                    </button>
                  </Permission>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
