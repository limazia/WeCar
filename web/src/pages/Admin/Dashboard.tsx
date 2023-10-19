import { Link } from "react-router-dom";
import {
  Disc,
  Car,
  Cards,
  Archive,
  Users,
  ArrowRight,
} from "@phosphor-icons/react";

import { Head } from "@components/Head";
import { Permission } from "@components/Permission";

export function Dashboard() {
  return (
    <>
      <Head title="Painel Administrativo" />
      <Permission
        required={[
          "brands.list",
          "models.list",
          "cars.list",
          "groups.list",
          "users.list",
        ]}
      >
        <div className="container">
          <div className="row">
            <div className="col-md-7">
              <div className="card card-options">
                <div className="card-header">
                  <h5>Opções do sistema</h5>
                </div>
                <div className="card-body">
                  <Permission required={["brands.list"]}>
                    <Link className="item" to="./brands">
                      <div className="options">
                        <div className="icon">
                          <Disc size={32} />
                        </div>
                        <span>Marcas</span>
                      </div>

                      <ArrowRight size={25} />
                    </Link>
                  </Permission>

                  <Permission required={["models.list"]}>
                    <Link className="item" to="./models">
                      <div className="options">
                        <div className="icon">
                          <Cards size={32} />
                        </div>
                        <span>Modelos</span>
                      </div>

                      <ArrowRight size={25} />
                    </Link>
                  </Permission>

                  <Permission required={["cars.list"]}>
                    <Link className="item" to="./cars">
                      <div className="options">
                        <div className="icon">
                          <Car size={32} />
                        </div>
                        <span>Carros</span>
                      </div>

                      <ArrowRight size={25} />
                    </Link>
                  </Permission>

                  <Permission required={["groups.list"]}>
                    <Link className="item" to="./groups">
                      <div className="options">
                        <div className="icon">
                          <Archive size={32} />
                        </div>
                        <span>Grupos</span>
                      </div>

                      <ArrowRight size={25} />
                    </Link>
                  </Permission>

                  <Permission required={["users.list"]}>
                    <Link className="item" to="./users">
                      <div className="options">
                        <div className="icon">
                          <Users size={32} />
                        </div>
                        <span>Usuários</span>
                      </div>

                      <ArrowRight size={25} />
                    </Link>
                  </Permission>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Permission>
    </>
  );
}
