import { Link } from "react-router-dom";
import { Pencil, Trash } from "@phosphor-icons/react";

import { Group } from "@shared/interfaces";

import { Button } from "@components/Forms/Button";
import { Permission } from "@components/Permission";
import { Spinner } from "@components/Spinner";

interface GroupCardProps {
  item: Group;
  loading: boolean;
  handleDeleteClick: (item: Group) => void;
}

export function GroupCard({
  item,
  loading,
  handleDeleteClick,
}: GroupCardProps) {
  return (
    <>
      {item.is_deleteable && (
        <div className="card card-groups">
          <div className="card-body">
            <div>
              <h5>{item.group_name}</h5>
              {item.group_permissions.map((permission, index) => (
                <span key={`permission-${index}`}>
                  <small className="text-muted">
                    {permission}
                    {index < item.group_permissions.length - 1 && <>, </>}
                  </small>
                </span>
              ))}
            </div>
          </div>

          {item.is_deleteable && (
            <Permission required={["update_group", "delete_group"]}>
              <div className="card-footer">
                <div className="row">
                  <Permission required={["update_brand"]}>
                    <div className="col">
                      <Link
                        className="btn btn-edit btn-block"
                        to={`/admin/groups/update/${item.group_id}`}
                      >
                        <Pencil size={20} />
                      </Link>
                    </div>
                  </Permission>

                  <Permission required={["delete_group"]}>
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
                </div>
              </div>
            </Permission>
          )}
        </div>
      )}
    </>
  );
}
