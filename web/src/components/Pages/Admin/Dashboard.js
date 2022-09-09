import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import useAuth from "~/hooks/useAuth";

import { Head } from "~/components/Partials/Head";
import { Loading } from "~/components/Partials/Loading";
import { Permission } from "~/components/Core/Permission";

export function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user !== null) {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    } else {
      setLoading(true);
    }
  }, [user, loading]);

  if (loading) {
    return <Loading />;
  }

  const goBrands = () => navigate("./brands");
  const goModels = () => navigate("./models");
  const goCars = () => navigate("./cars");
  const goUsers = () => navigate("./users");

  return (
    <Fragment>
      <Head title="Painel Administrativo" />
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            <div className="card card-options">
              <div className="card-header px-0">
                <h5>Opções do sistema</h5>
              </div>
              {user.permissions ? (
                <div className="card-body px-0">
                  <Permission required={["admin", "brands"]}>
                    <button
                      className="btn btn-option btn-block mt-3"
                      onClick={goBrands}
                    >
                      <div className="d-flex align-items-center">
                        <div className="icon-box">
                          <i className="far fa-mask"></i>
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
              ) : (
                <div className="alert alert-danger">KKKKKKKKKKKKKKKKK</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
