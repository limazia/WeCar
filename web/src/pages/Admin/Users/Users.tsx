import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { ArrowsClockwise, Plus, Trash } from "@phosphor-icons/react";
import debounce from "lodash/debounce";

import { UserService } from "@utils/services/UserService";
import { useAuth } from "@utils/hooks/useAuth";
import { User } from "@utils/interfaces";

import { Head } from "@components/Head";
import { Empty } from "@components/Empty";
import { Input } from "@components/Forms/Input";
import { Button } from "@components/Forms/Button";
import { Permission } from "@components/Permission";

import { ReactComponent as EmptyImage } from "@assets/empty.svg";

export function Users() {
  const { user } = useAuth();

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUsers();
  }, [search]);

  useEffect(() => {
    window.addEventListener("refresh-brands", () => loadUsers());

    return () => {
      window.removeEventListener("refresh-brands", () => loadUsers());
    };
  }, []);

  async function loadUsers() {
    try {
      const { results } = await UserService.list();

      if (results) {
        const filtered = results.filter(
          (user: User) =>
            user.name.toLowerCase().includes(search.toLowerCase()) ||
            user.email.toLowerCase().includes(search.toLowerCase())
        );
        setUsers(filtered);
        setLoading(false);
      }
    } catch (ex) {
      setLoading(true);
    }
  }

  const handleDeleteClick = async (item: User) => {
    if (window.confirm(`Deseja excluir "${item.name}"?`)) {
      try {
        const { error, message } = await UserService.delete({
          id: item.id.toString(),
        });

        if (message) {
          toast.success(message);
          const event = new CustomEvent("refresh-brands");
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

    const event = new CustomEvent("refresh-brands");
    window.dispatchEvent(event);
  }, 3000);

  const groupsOfThreeItems = users.reduce((grupos, item, index) => {
    const grupoIndex = Math.floor(index / 3);

    if (!grupos[grupoIndex]) {
      grupos[grupoIndex] = [];
    }

    grupos[grupoIndex].push(item);
    return grupos;
  }, [] as User[][]);

  if (loading) return <div />;

  return (
    <>
      <Head title="Usuários" />
      <div className="container pb-5">
        <div className="row">
          <div className="col-md-12">
            <div className="d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center">
                <Input
                  type="text"
                  name="search"
                  placeholder={`Pesquisar ${
                    users.length === 1 ? "usuário" : "usuários"
                  }`}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <div className="d-flex">
                <button className="btn btn-link" onClick={refreshUsers}>
                  <ArrowsClockwise size={20} />
                </button>
                <Permission required={["create_user"]}>
                  <Link className="btn btn-primary-w" to="/admin/users/create">
                    <Plus size={20} className="mr-1" /> Novo usuário
                  </Link>
                </Permission>
              </div>
            </div>
          </div>
          <div className="col-md-12 mt-4">
            {users?.length > 0 ? (
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
                            <div className="card card-users">
                              <div className="card-body">
                                <div>
                                  {item.id === user?.id ? (
                                    <h5 className="font-weight-bold">
                                      {item.name}
                                    </h5>
                                  ) : (
                                    <h5>{item.name}</h5>
                                  )}

                                  <small className="text-muted d-block">
                                    {item.group.name}
                                  </small>
                                  <small className="text-muted">
                                    {item.email}
                                  </small>
                                </div>
                              </div>

                              {item.is_deleteable && (
                                <Permission
                                  required={["update_user", "delete_user"]}
                                >
                                  <div className="card-footer">
                                    <Permission required={["update_user"]}>
                                      <Link
                                        className="btn btn-edit btn-block"
                                        to={`/admin/users/edit/${item.id}`}
                                      >
                                        Editar
                                      </Link>
                                    </Permission>

                                    {item.id !== user?.id && (
                                      <Permission required={["delete_user"]}>
                                        <Button
                                          className="btn btn-delete btn-block"
                                          loading={loading}
                                          disabled={loading}
                                          onClick={() =>
                                            handleDeleteClick(item)
                                          }
                                        >
                                          <Trash size={20} />
                                        </Button>
                                      </Permission>
                                    )}
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
                        to="/admin/users/create"
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
