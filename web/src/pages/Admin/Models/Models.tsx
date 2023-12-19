import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import debounce from "lodash/debounce";

import { Model } from "@shared/interfaces";
import { ModelService } from "@shared/services/ModelService";
import { groupRow } from "@shared/helpers/groupRow";

import { Head } from "@components/Head";
import { Empty } from "@components/Empty";
import { ModelCard } from "@components/Cards/Admin";
import { RedirectPermission } from "@components/Permission";
import { ActionButtons } from "@components/ActionButtons";
import { Loading } from "@components/Loading";



export function Models() {
  const [models, setModels] = useState<Model[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      const { results } = await ModelService.list();

      if (results) {
        setModels(results);
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
    model_id,
    model_name,
  }: Model): Promise<void> => {
    if (window.confirm(`Deseja excluir "${model_name}"?`)) {
      try {
        const { error, message } = await ModelService.delete(model_id);

        if (error) {
          toast.error(error);
        }

        toast.success(message);
        loadData();
      } catch (error) {
        toast.error("Erro ao excluir modelo!");
      }
    }
  };

  const refreshList = debounce(() => {
    toast.success("Lista atualizada!");
    loadData();
  }, 3000);

  const modelItems = groupRow(models);

  if (loading) return <Loading type="spinner" />;

  return (
    <>
      <Head title="Modelos" />
      <RedirectPermission required={["models.list"]} />

      <div className="container pb-5">
        <div className="row">
          <div className="col-md-12 mt-4">
            <div className="card">
              <div className="card-body">
                <div className="d-flex align-items-center justify-content-between">
                  <h4>Modelos</h4>

                  <ActionButtons
                    onRefreshClick={refreshList}
                    permission={["models.create"]}
                    to="/admin/models/create"
                  />
                </div>

                <div className="mt-3">
                  {models?.length > 0 ? (
                    <>
                      {modelItems.map((group, index) => (
                        <div
                          className={`row ${index !== 0 ? "mt-4" : "mt-0"}`}
                          key={index}
                        >
                          {group.map((model) => (
                            <div
                              key={model.model_id}
                              className="col-sm-12 col-md-6 col-lg-4 mb-sm-5 mb-lg-0"
                            >
                              <ModelCard
                                item={model}
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
                        title="Nenhum modelo foi encontrado"
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
