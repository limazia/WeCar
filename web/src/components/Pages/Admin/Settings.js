import { useEffect, useState } from "react";

import useAuth from "~/utils/hooks/useAuth";

import { Head } from "~/components/Partials/Head";
import { Loading } from "~/components/Partials/Loading";
import { NameModal } from "~/components/Modals/Settings/Name";
import { EmailModal } from "~/components/Modals/Settings/Email";
import { PasswordModal } from "~/components/Modals/Settings/Password";
import { Permission } from "~/components/Core/Permission";

export function Settings() {
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

  return (
    <>
      <Head title="Configuração de conta" />
      <NameModal />
      <EmailModal />
      <PasswordModal />
      <div className="container">
        <div className="row d-flex justify-content-center align-items-center mt-5">
          <div className="col-xs-12 col-md-6">
            <div className="card card-settings mb-5">
              <div className="card-body">
                <h5 className="card-title">Informações da Conta</h5>
                <div className="row">
                  <div className="col-md-12">
                    <div className="input-editable">
                      <span>Nome</span>
                      <p>
                        {user.name}
                        <Permission required={["admin"]}>
                          <button
                            className="btn btn-link"
                            data-toggle="modal"
                            data-target="#nameModal"
                          >
                            Editar
                          </button>
                        </Permission>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="input-editable">
                      <span>Email</span>
                      <p>
                        {user.email}
                        <button
                          className="btn btn-link"
                          data-toggle="modal"
                          data-target="#emailModal"
                        >
                          Editar
                        </button>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="input-editable">
                      <span>Senha</span>
                      <p>
                        ***********
                        <button
                          className="btn btn-link"
                          data-toggle="modal"
                          data-target="#passwordModal"
                        >
                          Alterar
                        </button>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <small className="text-muted">
                      Registrado em: {user.createdAt}
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
