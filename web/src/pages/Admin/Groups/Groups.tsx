import { useEffect, useState } from "react";
import { toast } from "react-toastify";
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
          <div className="col-md-12 mt-4">
            <div className="card">
              <div className="card-body">
                <div className="d-flex align-items-center justify-content-between">
                  <h4>Grupos</h4>

                  <ActionButtons
                    onRefreshClick={refreshList}
                    permission={["groups.create"]}
                    to="/admin/groups/create"
                  />
                </div>

                <div className="mt-3">
                  {groups?.length > 0 ? (
                    <>
                      {groupItems.map((group, index) => (
                        <div
                          className={`row ${index !== 0 ? "mt-4" : "mt-0"}`}
                          key={index}
                        >
                          {group.map((group) => (
                            <div
                              key={group.group_id}
                              className="col-sm-12 col-md-6 col-lg-4 mb-sm-5 mb-lg-0"
                            >
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
                    <div className="col-md-12">
                      <Empty
                        title="Nenhum grupo foi encontrado"
                        description='Cadastre agora mesmo clicando no botão "+"'
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
