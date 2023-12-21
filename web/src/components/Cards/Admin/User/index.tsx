import { Link } from "react-router-dom";
import { Pencil, Trash } from "@phosphor-icons/react";

import { useAuth } from "@shared/hooks/useAuth";
import { User } from "@shared/interfaces";

import { Button } from "@components/Forms/Button";
import { Permission } from "@components/Permission";
import { Spinner } from "@components/Spinner";

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
                <div className="row">
                  <Permission required={["users.update"]}>
                    <div className="col">
                      <Link
                        className="btn btn-edit btn-block"
                        to={`/admin/users/update/${item.id}`}
                      >
                        <Pencil size={20} />
                      </Link>
                    </div>
                  </Permission>

                  {item.id !== user?.id && (
                    <Permission required={["users.delete"]}>
                      <div className="col">
                        <Button
                          className="btn btn-delete btn-block"
                          disabled={loading}
                          onClick={() => handleDeleteClick(item)}
                        >
                          {loading ? <Spinner /> : <Trash size={20} />}
                        </Button>
                      </div>
                    </Permission>
                  )}
                </div>
              </div>
            </Permission>
          )}
        </div>
      )}
    </>
  );
}
