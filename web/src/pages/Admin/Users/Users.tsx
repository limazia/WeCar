import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Plus } from "@phosphor-icons/react";
import debounce from "lodash/debounce";

import { User } from "@shared/interfaces";
import { UserService } from "@shared/services/UserService";
import { useAuth } from "@shared/hooks/useAuth";
import { groupRow } from "@shared/helpers/groupRow";

import { Head } from "@components/Head";
import { Empty } from "@components/Empty";
import { UserCard } from "@components/Cards/Admin";
import { RedirectPermission } from "@components/Permission";
import { ActionButtons } from "@components/ActionButtons";
import { Loading } from "@components/Loading";

import { ReactComponent as EmptyImage } from "@assets/empty.svg";

export function Users() {
  const { user } = useAuth();

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const sortUsers = (userA: User, userB: User): number => {
    const myUserId = user?.id;

    const parseDate = (dateString: string | undefined): Date | undefined => {
      if (dateString) {
        return new Date(dateString);
      }
      return undefined;
    };

    const dateA = parseDate(userA.created_at);
    const dateB = parseDate(userB.created_at);

    if (dateA && dateB) {
      if (userA.id === myUserId) {
        return -1;
      }
      return dateB.getTime() - dateA.getTime();
    }

    return 0;
  };

  const loadData = async () => {
    try {
      const { results } = await UserService.list();

      if (results) {
        const sortedUsers = [...results].sort(sortUsers);
        setUsers(sortedUsers);
        setLoading(false);
      }
    } catch (error) {
      setLoading(true);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDeleteClick = async ({ id, name }: User): Promise<void> => {
    if (window.confirm(`Deseja excluir "${name}"?`)) {
      try {
        const { error, message } = await UserService.delete(id);

        if (error) {
          toast.error(error);
        }

        toast.success(message);
        loadData();
      } catch (error) {
        toast.error("Erro ao excluir usuário!");
      }
    }
  };

  const refreshList = debounce(() => {
    toast.success("Lista atualizada!");
    loadData();
  }, 3000);

  const userItems = groupRow(users);

  if (loading) return <Loading type="spinner" />;

  return (
    <>
      <Head title="Usuários" />
      <RedirectPermission required={["users.list"]} />
      <div className="container pb-5">
        <div className="row">
          <div className="col-md-12">
            <div className="d-flex align-items-center justify-content-end">
              <ActionButtons
                onRefreshClick={refreshList}
                permission={["users.create"]}
                to="/admin/users/create"
                label="Novo usuário"
              />
            </div>
          </div>
          <div className="col-md-12 mt-4">
            {users?.length > 0 ? (
              <>
                {userItems.map((group, index) => (
                  <div
                    className={`row ${index !== 0 ? "mt-4" : "mt-0"}`}
                    key={index}
                  >
                    {group.map((user) => (
                      <div
                        key={user.id}
                        className="col-sm-12 col-md-6 col-lg-4 mb-sm-5 mb-lg-0"
                      >
                        <UserCard
                          item={user}
                          loading={loading}
                          handleDeleteClick={handleDeleteClick}
                        />
                      </div>
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
                      title="Nenhum usuário foi encontrado"
                      description=" Começe cadastrando agora mesmo"
                    />

                    <div className="d-flex justify-content-center mt-4">
                      <Link
                        className="btn btn-primary-w"
                        to="/admin/users/create"
                      >
                        <Plus size={20} className="mr-1" /> Novo usuário
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
