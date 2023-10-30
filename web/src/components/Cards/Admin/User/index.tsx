import { Trash } from "@phosphor-icons/react";
import { Link } from "react-router-dom";

import { useAuth } from "@shared/hooks/useAuth";
import { User } from "@shared/interfaces";

import { Button } from "@components/Forms/Button";
import { Permission } from "@components/Permission";

interface UserCardProps {
  item: User;
  loading: boolean;
  handleDeleteClick: (item: User) => void;
}

export function UserCard({ item, loading, handleDeleteClick }: UserCardProps) {
  const { user } = useAuth();

  return (
    <>
      {item.is_deleteable && (
        <div className="card card-users">
          <div className="card-body">
            <div>
              {item.id === user?.id ? (
                <h5 className="font-weight-bold">{item.name}</h5>
              ) : (
                <h5>{item.name}</h5>
              )}

              <small className="text-muted d-block">{item.role}</small>
              <small className="text-muted">{item.email}</small>
            </div>
          </div>

          {item.is_deleteable && (
            <Permission required={["users.update", "users.delete"]}>
              <div className="card-footer">
                <Permission required={["users.update"]}>
                  <Link
                    className="btn btn-edit btn-block"
                    to={`/admin/users/update/${item.id}`}
                  >
                    Editar
                  </Link>
                </Permission>

                {item.id !== user?.id && (
                  <Permission required={["users.delete"]}>
                    <Button
                      className="btn btn-delete btn-block"
                      loading={loading}
                      disabled={loading}
                      onClick={() => handleDeleteClick(item)}
                    >
                      <Trash size={20} />
                    </Button>
                  </Permission>
                )}
              </div>
            </Permission>
          )}
        </div>
      )}
    </>
  );
}
