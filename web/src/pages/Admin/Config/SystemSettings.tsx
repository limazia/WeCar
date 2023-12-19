import { Link } from "react-router-dom";
import { ArrowSquareOut, Pencil } from "@phosphor-icons/react";
import { toast } from "react-toastify";
import debounce from "lodash/debounce";

import { useConfig } from "@shared/hooks/useConfig";

import { Head } from "@components/Head";
import { ActionButtons } from "@components/ActionButtons";
import { Permission, RedirectPermission } from "@components/Permission";

export function SystemSettings() {
  const { config } = useConfig();

  const refreshConfig = debounce(() => {
    toast.success("Configurações atualizada!");

    const event = new CustomEvent("refresh-config");
    window.dispatchEvent(event);
  }, 3000);

  const facebook = `https://www.facebook.com/${config?.facebook}`;
  const instagram = `https://www.instagram.com/${config?.instagram}`;

  return (
    <>
      <Head title="Configurações" />
      <RedirectPermission required={["settings.view"]} />

      <div className="container pb-5">
        <div className="row">
          <div className="col-md-12 mt-4">
            <div className="card">
              <div className="card-body">
                <div className="d-flex align-items-center justify-content-between">
                  <h4>Configurações</h4>

                  <div className="d-flex align-items-center">
                    <ActionButtons onRefreshClick={refreshConfig} />
                    <Permission required={["settings.update"]}>
                      <Link to="/admin/settings/web/update">
                        <Pencil size={20} />
                      </Link>
                    </Permission>
                  </div>
                </div>

                <div className="mt-3">
                  <div className="row">
                    <div className="col-md-4">
                      <div className="d-flex flex-column">
                        <span className="text-muted font-weight-bold">
                          WhatsApp
                        </span>
                        <p>{config?.whatsApp}</p>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="d-flex flex-column">
                        <span className="text-muted font-weight-bold">
                          Facebook
                        </span>
                        <p className="d-flex align-items-center mb-0">
                          /{config?.facebook}{" "}
                          <a href={facebook} target="_blank" rel="noreferrer">
                            <ArrowSquareOut size={18} className="ml-2" />
                          </a>
                        </p>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="d-flex flex-column">
                        <span className="text-muted font-weight-bold">
                          Instagram
                        </span>
                        <p className="d-flex align-items-center mb-0">
                          /{config?.instagram}{" "}
                          <a href={instagram} target="_blank" rel="noreferrer">
                            <ArrowSquareOut size={18} className="ml-2" />
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-4">
                      <div className="d-flex flex-column">
                        <span className="text-muted font-weight-bold">
                          Endereço
                        </span>
                        <p>{config?.address}</p>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="d-flex flex-column">
                        <span className="text-muted font-weight-bold">
                          Telefone
                        </span>
                        <p>{config?.telephone}</p>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="d-flex flex-column">
                        <span className="text-muted font-weight-bold">
                          E-mail
                        </span>
                        <p>{config?.email}</p>
                      </div>
                    </div>
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
