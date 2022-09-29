import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import api, { getBrands, getModels, getModelById } from "~/utils/services/api";

import { TableModels } from "~/components/Tables/Models";
import { Loading } from "~/components/Partials/Loading";
import { Head } from "~/components/Partials/Head";
import { Spinner } from "~/components/Forms/Spinner";

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
    const { results } = await getModels();

    if (results) {
      setModels(results);
    }
  }

  const goCreate = () => navigate("/model/create");

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
    </>
  );
}

export function ModelCreate() {
  const navigate = useNavigate();
  const INITIAL_STATE = {
    model_name: "",
    model_slug: "",
    id_brand: "",
  };

  const [model, setModel] = useState(INITIAL_STATE);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCars();
  }, []);

  const loadCars = async () => {
    const { results } = await getBrands();

    setBrands(results);
  };

  const onInputChange = (event) => {
    const { name, value } = event.target;

    setModel({ ...model, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { model_name, model_slug } = model;

    if (model_name && model_slug) {
      setLoading(true);

      try {
        const { data } = await api.post("/api/model", { model });
        const { error, message } = data;

        if (message) {
          toast.success(message);
          setModel(INITIAL_STATE);
          setLoading(false);
          navigate("../models");
        } else {
          toast.error(error);
          setLoading(false);
        }
      } catch (ex) {
        console.log(ex);
        toast.error("Houve um problema com o servidor!");
        setLoading(false);
      }
    } else {
      toast.error("Preencha todos os campos para continuar!");
    }
  };

  return (
    <>
      <Head title="Cadastrar modelo" />
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                <h3 className="card-title">Cadastrar modelo</h3>
                <div className="mt-5">
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="model_name">Nome do modelo</label>
                          <input
                            type="text"
                            id="model_name"
                            name="model_name"
                            className="form-control"
                            value={model.model_name}
                            onChange={onInputChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="model_slug">Slug do modelo</label>
                          <input
                            type="text"
                            id="model_slug"
                            name="model_slug"
                            className="form-control"
                            value={model.model_slug}
                            onChange={onInputChange}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="form-group">
                          <label htmlFor="id_brand">Marca</label>
                          <select
                            name="id_brand"
                            id="id_brand"
                            className="form-control"
                            onChange={onInputChange}
                            value=""
                          >
                            <option disabled value="" />
                            {brands.map((brand) => (
                              <option
                                key={brand.brand_id}
                                value={brand.brand_id}
                              >
                                {brand.brand_name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <button
                          className="btn btn-create btn-block"
                          disabled={
                            !model.model_name || !model.model_slug
                              ? true
                              : false
                          }
                        >
                          {loading ? <Spinner /> : "Criar modelo"}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export function ModelUpdate() {
  const { model_id } = useParams();
  const navigate = useNavigate();

  const [model, setModel] = useState({
    model_name: "",
    model_slug: "",
    id_brand: "",
  });
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCars();
  }, []);

  const loadCars = async () => {
    const { results } = await getBrands();

    setBrands(results);
  };

  useEffect(() => {
    loadModelById(model_id);
  }, []);

  async function loadModelById(model_id) {
    const { results, error } = await getModelById(model_id);

    console.log(results);

    if (error) {
      navigate("../models");
    } else {
      setModel(results);
    }
  }

  const onInputChange = (event) => {
    const { name, value } = event.target;

    setModel({ ...model, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { model_name, model_slug, id_brand } = model;

    if (model_name && model_slug) {
      setLoading(true);

      try {
        const { data } = await api.put(`/api/model/${model_id}`, { 
          model_name,
          model_slug,
          id_brand
         });
        const { error, message } = data;

        if (message) {
          toast.success(message);
          setLoading(false);
          navigate("../models");
        } else {
          toast.error(error);
          setLoading(false);
        }
      } catch (ex) {
        console.log(ex);
        toast.error("Houve um problema com o servidor!");
        setLoading(false);
      }
    } else {
      toast.error("Preencha todos os campos para continuar!");
    }
  };

  return (
    <>
      <Head title={`Editar ${model?.model_name}`} />
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                <h3 className="card-title">Editar modelo</h3>
                <div className="mt-5">
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="model_name">Nome do modelo</label>
                          <input
                            type="text"
                            id="model_name"
                            name="model_name"
                            className="form-control"
                            value={model?.model_name}
                            onChange={onInputChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="model_slug">Slug do modelo</label>
                          <input
                            type="text"
                            id="model_slug"
                            name="model_slug"
                            className="form-control"
                            value={model?.model_slug}
                            onChange={onInputChange}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="form-group">
                          <label htmlFor="id_brand">Marca</label>
                          <select
                            name="id_brand"
                            id="id_brand"
                            className="form-control"
                            value={model.id_brand}
                            onChange={onInputChange}
                          >
                            {brands.map(({ brand_id, brand_name }) => (
                              <option key={brand_id} value={brand_id}>
                                {brand_name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <button
                          className="btn btn-create btn-block"
                          disabled={
                            !model?.model_name || !model?.model_slug
                              ? true
                              : false
                          }
                        >
                          {loading ? <Spinner /> : "Atualizar"}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
