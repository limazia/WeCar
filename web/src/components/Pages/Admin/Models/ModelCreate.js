import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import api, { getBrands } from "~/utils/services/api";

import { Head } from "~/components/Partials/Head";
import { Spinner } from "~/components/Partials/Spinner";

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
                          {loading ? <Spinner /> : "Cadastrar"}
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
