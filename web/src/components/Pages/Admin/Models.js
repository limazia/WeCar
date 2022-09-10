import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import WebRepository from "~/services/WebRepository";

import { TableModels } from "~/components/Tables/Models";
import { Loading } from "~/components/Partials/Loading";

import { Empty } from "~/components/Images";

export function Models() {
  const navigate = useNavigate([]);
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadModels();

    window.addEventListener("refresh-models", () => {
      loadModels();
    });

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [loading]);

  if (loading) {
    return <Loading />;
  }

  async function loadModels() {
    const { results } = await WebRepository.getModels();

    if (results) {
      setModels(results);
    }
  }

  const goCreate = () => navigate("/model/create");

  const columns = [
    {
      Header: "Marca",
    },
    {
      Header: "Slug",
    },
    {
      Header: "Data de cadastro",
    },
  ];

  return (
    <div className="container">
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
                  <small className="empty-description mt-3 pb-4">
                    Começe cadastrando agora mesmo
                  </small>
                  <button className="btn btn-create" onClick={goCreate}>
                    <i className="far fa-plus mr-1"></i> Cadastrar modelo
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ModelCreate() {
  return <h1>ModelCreate</h1>;
}

export function ModelView() {
  return <h1>ModelView</h1>;
}
