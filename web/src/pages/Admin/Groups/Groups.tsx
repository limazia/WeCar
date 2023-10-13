import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { ArrowsClockwise, Plus, Trash } from "@phosphor-icons/react";
import debounce from "lodash/debounce";

import { GroupService } from "@utils/services/GroupService";
import { Group } from "@utils/interfaces";

import { Head } from "@components/Head";
import { Empty } from "@components/Empty";
import { Input } from "@components/Forms/Input";
import { Button } from "@components/Forms/Button";
import { Permission, RedirectPermission } from "@components/Permission";

import { ReactComponent as EmptyImage } from "@assets/empty.svg";

export function Groups() {
  const [groups, setGroups] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadGroups();
  }, [search]);

  useEffect(() => {
    window.addEventListener("refresh-groups", () => loadGroups());

    return () => {
      window.removeEventListener("refresh-groups", () => loadGroups());
    };
  }, []);

  async function loadGroups() {
    try {
      const { results } = await GroupService.list();

      if (results) {
        const filtered = results.filter((group: Group) =>
          group.group_name.toLowerCase().includes(search.toLowerCase())
        );
        setGroups(filtered);
        setLoading(false);
      }
    } catch (ex) {
      setLoading(true);
    }
  }

  const handleDeleteClick = async (item: Group) => {
    if (window.confirm(`Deseja excluir "${item.group_name}"?`)) {
      try {
        const { error, message } = await GroupService.delete({
          group_id: item.group_id.toString(),
        });

        if (message) {
          toast.success(message);
          const event = new CustomEvent("refresh-groups");
          window.dispatchEvent(event);
        }

        if (error) {
          toast.error(error);
        }
      } catch (ex) {
        toast.error("Houve um problema com o servidor!");
      }
    }
  };

  const refreshUsers = debounce(() => {
    toast.success("Lista atualizada!");

    const event = new CustomEvent("refresh-groups");
    window.dispatchEvent(event);
  }, 3000);

  const groupsOfThreeItems = groups.reduce((grupos, item, index) => {
    const grupoIndex = Math.floor(index / 3);

    if (!grupos[grupoIndex]) {
      grupos[grupoIndex] = [];
    }

    grupos[grupoIndex].push(item);
    return grupos;
  }, [] as Group[][]);

  if (loading) return <div />;

  return (
    <>
      <Head title="Grupos" />
      <RedirectPermission required={["groups"]} />
      <div className="container pb-5">
        <div className="row">
          <div className="col-md-12">
            <div className="d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center">
                <Input
                  type="text"
                  name="search"
                  placeholder={`Pesquisar ${
                    groups.length === 1 ? "grupo" : "grupos"
                  }`}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <div className="d-flex">
                <button className="btn btn-link" onClick={refreshUsers}>
                  <ArrowsClockwise size={20} />
                </button>
                <Permission required={["create_group"]}>
                  <Link className="btn btn-primary-w" to="/admin/groups/create">
                    <Plus size={20} className="mr-1" /> Novo grupo
                  </Link>
                </Permission>
              </div>
            </div>
          </div>
          <div className="col-md-12 mt-4">
            {groups?.length > 0 ? (
              <>
                {groupsOfThreeItems.map((group, index) => (
                  <div
                    className={`row ${index !== 0 ? "mt-4" : "mt-0"}`}
                    key={index}
                  >
                    {group.map((item, itemIndex) => (
                      <>
                        {item.is_deleteable && (
                          <div className="col-md-4" key={itemIndex}>
                            <div className="card card-groups">
                              <div className="card-body">
                                <div>
                                  <h5>{item.group_name}</h5>
                                  {item.group_permissions.map(
                                    (permission, index) => (
                                      <span key={`permission-${index}`}>
                                        <small className="text-muted">
                                          {permission}
                                        </small>
                                        {index <
                                          item.group_permissions.length - 1 && (
                                          <span>, </span>
                                        )}
                                      </span>
                                    )
                                  )}
                                </div>
                              </div>

                              {item.is_deleteable && (
                                <Permission
                                  required={["update_group", "delete_group"]}
                                >
                                  <div className="card-footer">
                                    <Permission required={["update_brand"]}>
                                      <Link
                                        className="btn btn-edit btn-block"
                                        to={`/admin/groups/edit/${item.group_id}`}
                                      >
                                        Editar
                                      </Link>
                                    </Permission>

                                    <Permission required={["delete_group"]}>
                                      <Button
                                        className="btn btn-delete btn-block"
                                        loading={loading}
                                        disabled={loading}
                                        onClick={() => handleDeleteClick(item)}
                                      >
                                        <Trash size={20} />
                                      </Button>
                                    </Permission>
                                  </div>
                                </Permission>
                              )}
                            </div>
                          </div>
                        )}
                      </>
                    ))}
                  </div>
                ))}
              </>
            ) : (
              <div className="card">
                <div className="card-body">
                  <div className="col-md-12">
                    <Empty
                      imageElement={EmptyImage}
                      title="Nenhuma marca foi encontrada"
                      description=" Começe cadastrando agora mesmo"
                    />

                    <div className="d-flex justify-content-center mt-4">
                      <Link
                        className="btn btn-primary-w"
                        to="/admin/groups/create"
                      >
                        <Plus size={20} className="mr-1" /> Nova marca
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
