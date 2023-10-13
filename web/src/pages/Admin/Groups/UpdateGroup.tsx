import { useState, useEffect, FormEvent } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { ArrowLeft } from "@phosphor-icons/react";

import { GroupService } from "@utils/services/GroupService";
import { permissions as ListPermissions } from "@utils/database/permisisons";
import { Permission } from "@utils/interfaces";

import { Head } from "@components/Head";
import { Input } from "@components/Forms/Input";
import { Button } from "@components/Forms/Button";
import { RedirectPermission } from "@components/Permission";

interface PermissionProps {
  label: string;
  description: string;
}

export function UpdateGroup() {
  const { group_id } = useParams() as { group_id: string };
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [permissions, setPermissions] = useState<PermissionProps[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadGroupById(group_id);
  }, []);

  async function loadGroupById(group_id: string) {
    const data = await GroupService.findById({ group_id });

    const response = Array.isArray(data) ? data[0] : data;

    if (response === undefined) {
      navigate("/admin/groups");
    } else {
      if (!response.is_deleteable) {
        navigate("/admin/");
      }

      setName(response.group_name);

      const groupPermissions = response.group_permissions
        .split(",")
        .map((label: string) => {
          return {
            label,
          };
        });

      setPermissions(groupPermissions);
    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);

    try {
      const { error, message } = await GroupService.update({
        group_id,
        group_name: name,
        group_permissions: permissions.map((item) => item.label).toString(),
      });

      if (message) {
        toast.success(message);
        setName("");
        setPermissions([]);
        setLoading(false);

        navigate("/admin/groups");
      }

      if (error) {
        toast.error(error);
        setLoading(false);
      }
    } catch (ex) {
      setLoading(false);
    }
  }

  const handleItemSelection = (item: PermissionProps) => {
    const itemIndex = permissions.findIndex(
      (selectedItem) => selectedItem.label === item.label
    );

    if (itemIndex === -1) {
      setPermissions([...permissions, item]);
    } else {
      const updatePermissions = [...permissions];
      updatePermissions.splice(itemIndex, 1);
      setPermissions(updatePermissions);
    }
  };

  const groupsOfTwoItems = ListPermissions.reduce((grupos, item, index) => {
    const grupoIndex = Math.floor(index / 2);

    if (!grupos[grupoIndex]) {
      grupos[grupoIndex] = [];
    }

    grupos[grupoIndex].push(item);
    return grupos;
  }, [] as Permission[][]);

  const validate = loading || !name || !permissions.length;

  return (
    <>
      <Head title="Editando grupo" />
      <RedirectPermission required={["update_group"]} />
      <div className="container pb-5">
        <div className="row d-flex justify-content-center">
          <div className="col-md-12">
            <div className="card card-groups">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <Link to="/admin/groups/">
                    <ArrowLeft size={20} className="mr-2" color="#000" />
                  </Link>
                  <h5 className="card-title mb-0">Editando grupo</h5>
                </div>

                <form onSubmit={handleSubmit} className="mt-4">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group">
                        <label htmlFor="group_name">Nome do grupo</label>
                        <Input
                          type="text"
                          id="group_name"
                          name="group_name"
                          disabled={loading}
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                        <small id="group_name" className="form-text text-muted">
                          Exemplo: Administrador, Supervisor, Vendedor
                        </small>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <label>Grupo de permissão</label>

                      {groupsOfTwoItems.map((group, index) => (
                        <div className="row mt-1 pb-4" key={index}>
                          {group.map((item, index) => (
                            <div
                              key={`permission-${index}`}
                              className="col-md-6"
                            >
                              <div className="card">
                                <div className="card-body">
                                  <b>{item.name}</b>
                                  {item.permissions.map((permission, index) => (
                                    <div key={index} className="mb-0 mt-3">
                                      <span
                                        className={`badge badge-permission ${
                                          permissions.some(
                                            (selectedItem) =>
                                              selectedItem.label ===
                                              permission.label
                                          )
                                            ? "selected"
                                            : ""
                                        }`}
                                        onClick={() =>
                                          handleItemSelection(permission)
                                        }
                                      >
                                        {permission.label}
                                      </span>
                                      <small className="text-muted d-block mt-1">
                                        {permission.description}
                                      </small>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <Button
                        type="submit"
                        className="btn btn-primary-w btn-block"
                        disabled={validate}
                        loading={loading}
                      >
                        Atualizar grupo
                      </Button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
