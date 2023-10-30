import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Plus } from "@phosphor-icons/react";
import debounce from "lodash/debounce";

import { Group } from "@shared/interfaces";
import { GroupService } from "@shared/services/GroupService";
import { groupRow } from "@shared/helpers/groupRow";

import { Head } from "@components/Head";
import { Empty } from "@components/Empty";
import { GroupCard } from "@components/Cards/Admin";
import { RedirectPermission } from "@components/Permission";
import { ActionButtons } from "@components/ActionButtons";
import { Loading } from "@components/Loading";

import { ReactComponent as EmptyImage } from "@assets/empty.svg";

export function Groups() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      const { results } = await GroupService.list();

      if (results) {
        setGroups(results);
        setLoading(false);
      }
    } catch (error) {
      setLoading(true);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDeleteClick = async ({
    group_id,
    group_name,
  }: Group): Promise<void> => {
    if (window.confirm(`Deseja excluir "${group_name}"?`)) {
      try {
        const { error, message } = await GroupService.delete(group_id);

        if (error) {
          toast.error(error);
        }

        toast.success(message);
        loadData();
      } catch (error) {
        toast.error("Erro ao excluir grupo!");
      }
    }
  };

  const refreshList = debounce(() => {
    toast.success("Lista atualizada!");
    loadData();
  }, 3000);

  const groupItems = groupRow(groups);

  if (loading) return <Loading type="spinner" />;

  return (
    <>
      <Head title="Grupos" />
      <RedirectPermission required={["groups.list"]} />
      <div className="container pb-5">
        <div className="row">
          <div className="col-md-12">
            <div className="d-flex align-items-center justify-content-end">
              <ActionButtons
                onRefreshClick={refreshList}
                permission={["groups.create"]}
                to="/admin/groups/create"
                label="Novo grupo"
              />
            </div>
          </div>
          <div className="col-md-12 mt-4">
            {groups?.length > 0 ? (
              <>
                {groupItems.map((group, index) => (
                  <div
                    className={`row ${index !== 0 ? "mt-4" : "mt-0"}`}
                    key={index}
                  >
                    {group.map((group) => (
                      <div key={group.group_id} className="col-sm-12 col-md-6 col-lg-4 mb-sm-5 mb-lg-0">
                        <GroupCard
                          item={group}
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
                      title="Nenhum grupo foi encontrado"
                      description=" Começe cadastrando agora mesmo"
                    />

                    <div className="d-flex justify-content-center mt-4">
                      <Link
                        className="btn btn-primary-w"
                        to="/admin/groups/create"
                      >
                        <Plus size={20} className="mr-1" /> Novo grupo
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
