import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Plus } from "@phosphor-icons/react";
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

import { ReactComponent as EmptyImage } from "@assets/empty.svg";

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
          <div className="col-md-12">
            <div className="d-flex align-items-center justify-content-end">
              <ActionButtons
                onRefreshClick={refreshList}
                permission={["models.create"]}
                to="/admin/models/create"
                label="Novo modelo"
              />
            </div>
          </div>
          <div className="col-md-12 mt-4">
            {models?.length > 0 ? (
              <>
                {modelItems.map((group, index) => (
                  <div
                    className={`row ${index !== 0 ? "mt-4" : "mt-0"}`}
                    key={index}
                  >
                    {group.map((model) => (
                      <div key={model.model_id} className="col-sm-12 col-md-6 col-lg-4 mb-sm-5 mb-lg-0">
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
                        to="/admin/models/create"
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
