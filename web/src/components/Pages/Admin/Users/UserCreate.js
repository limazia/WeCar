import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Select, { components } from "react-select";
import { toast } from "react-toastify";

import api from "~/utils/services/api";
import { permissions as PermissionsDB } from "~/utils/database/permissions";
import { CustomGroupHeading, customStyles } from "~/utils/misc/selectTypes";

import { Head } from "~/components/Partials/Head";
import { Spinner } from "~/components/Partials/Spinner";
import { PermissionsModal } from "~/components/Modals/Admin/Permissions";

export function UserCreate() {
  const navigate = useNavigate();
  const INITIAL_STATE = {
    name: "",
    email: "",
    permissions: [],
    password: "",
    confirm_password: "",
  };

  const [user, setUser] = useState(INITIAL_STATE);
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setPermissions(
      Object.entries(PermissionsDB).map(([key, row]) => ({
        label: key,
        options: row.map(({ permission }) => ({
          value: permission,
          label: permission,
        })),
      }))
    );
  }, []);

  const onInputChange = (event) => {
    const { name, value } = event.target;

    setUser({ ...user, [name]: value });
  };

  const onSelectChange = (event) => {
    if (event) {
      setUser((prevState) => ({
        ...prevState,
        permissions: event,
      }));
    }
  };

  const NoOptionsMessage = (props) => {
    return (
      <components.NoOptionsMessage {...props}>
        <span className="custom-css-class">
          Nenhuma permissão foi encontrada
        </span>
      </components.NoOptionsMessage>
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, permissions, confirm_password } = user;

    if (name && email && password && confirm_password) {
      setLoading(true);

      try {
        const { data } = await api.post("/api/user", {
          name,
          email,
          permissions,
          password,
          confirm_password,
        });
        const { error, message } = data;

        if (message) {
          toast.success(message);
          setUser(INITIAL_STATE);
          setLoading(false);
          navigate("../users");
        } else {
          toast.error(error);
          setLoading(false);
        }
      } catch (ex) {
        console.log(ex);
        toast.error("Houve um problema com o servidor!");
        setLoading(false);
      }
    } else {
      toast.error("Preencha todos os campos para continuar!");
    }
  };

  return (
    <>
      <Head title="Cadastrar usuário" />
      <PermissionsModal />
      <div className="container pb-5">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                <h3 className="card-title">Cadastrar usuário</h3>
                <div className="mt-5">
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-md-6 col-sm-12">
                        <div className="form-group">
                          <label htmlFor="name">Nome</label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            className="form-control"
                            value={user?.name}
                            onChange={onInputChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-6 col-sm-12">
                        <div className="form-group">
                          <label htmlFor="email">Email</label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            className="form-control"
                            value={user?.email}
                            onChange={onInputChange}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row mt-2">
                      <div className="col-md-12">
                        <div className="form-group">
                          <label>Permissões</label>
                          <Select
                            name="permissions"
                            placeholder="Selecione as Permissões"
                            styles={customStyles}
                            menuPortalTarget={document.body}
                            menuPlacement="auto"
                            value={user?.permissions}
                            onChange={onSelectChange}
                            options={permissions}
                            isMulti
                            components={{
                              GroupHeading: CustomGroupHeading,
                              DropdownIndicator: () => null,
                              IndicatorSeparator: () => null,
                              NoOptionsMessage,
                            }}
                          />
                          <small
                            className="form-text text-muted"
                            data-toggle="modal"
                            data-target="#permissionsModal"
                            style={{ cursor: "pointer" }}
                          >
                            Ver lista de permissões
                          </small>
                        </div>
                      </div>
                    </div>
                    <div className="row mt-2">
                      <div className="col-md-6 col-sm-12">
                        <div className="form-group">
                          <label htmlFor="password">Senha</label>
                          <input
                            type="password"
                            id="password"
                            name="password"
                            className="form-control"
                            value={user?.password}
                            onChange={onInputChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-6 col-sm-12">
                        <div className="form-group">
                          <label htmlFor="confirm_password">
                            Confirmar senha
                          </label>
                          <input
                            type="password"
                            id="confirm_password"
                            name="confirm_password"
                            className="form-control"
                            value={user?.confirm_password}
                            onChange={onInputChange}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row mt-2">
                      <div className="col-md-12">
                        <button
                          className="btn btn-create btn-block"
                          disabled={
                            !user.name ||
                            !user.email ||
                            !user.password ||
                            !user.confirm_password
                              ? true
                              : false
                          }
                        >
                          {loading ? <Spinner /> : "Cadastrar"}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
