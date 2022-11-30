import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getModels } from "~/utils/services/api";

import { TableModels } from "~/components/Tables/Models";
import { Loading } from "~/components/Partials/Loading";
import { Head } from "~/components/Partials/Head";
import { Permission } from "~/components/Core/Permission";

import { Empty } from "~/components/Images";

export function ModelsList() {
  const navigate = useNavigate([]);
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadModels();

    window.addEventListener("refresh-models", loadModels);

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [loading]);

  if (loading) {
    return <Loading />;
  }

  async function loadModels() {
    const { results } = await getModels();

    if (results) {
      setModels(results);
    }
  }

  const goCreate = () => navigate("../model/create");

  const columns = [
    {
      Header: "Modelo",
      accessor: "model_name",
    },
    {
      Header: "Slug",
      accessor: "model_slug",
    },
    {
      Header: "Marca",
      accessor: "brand_name",
    },
    {
      Header: "Data de cadastro",
      accessor: "createdAt",
    },
  ];

  return (
    <>
      <Head title="Modelos" />
      <div className="container mt-3 pb-5">
        <div className="row">
          <div className="col-md-12">
            <div className="card card-customers">
              <div className="card-body">
                {models.length > 0 ? (
                  <TableModels columns={columns} data={models} />
                ) : (
                  <div className="col-sm-12 empty-car text-center">
                    <div className="empty-image pb-3">
                      <Empty className="img-fluid" />
                    </div>
                    <span className="empty-title">
                      Nenhum modelo foi encontrado
                    </span>
                    <Permission required={["admin", "create_model"]}>
                      <small className="empty-description mt-3 pb-4">
                        Começe cadastrando agora mesmo
                      </small>
                      <button
                        className="btn btn-create-table"
                        onClick={goCreate}
                      >
                        <i className="far fa-plus mr-1"></i> Cadastrar modelo
                      </button>
                    </Permission>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
