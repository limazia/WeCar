import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import api from "~/utils/services/api";

import { Head } from "~/components/Partials/Head";
import { Spinner } from "~/components/Partials/Spinner";

export function BrandCreate() {
  const navigate = useNavigate();
  const INITIAL_STATE = {
    brand_name: "",
    brand_slug: "",
  };

  const [brand, setBrand] = useState(INITIAL_STATE);
  const [loading, setLoading] = useState(false);

  const onInputChange = (event) => {
    const { name, value } = event.target;

    setBrand({ ...brand, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { brand_name, brand_slug } = brand;

    if (brand_name && brand_slug) {
      setLoading(true);

      try {
        const { data } = await api.post("/api/brand", { brand });
        const { error, message } = data;

        if (message) {
          toast.success(message);
          setBrand(INITIAL_STATE);
          setLoading(false);
          navigate("../brands");
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
      <Head title="Cadastrar marca" />
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                <h3 className="card-title">Cadastrar marca</h3>
                <div className="mt-5">
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="brand_name">Nome da marca</label>
                          <input
                            type="text"
                            id="brand_name"
                            name="brand_name"
                            className="form-control"
                            value={brand.brand_name}
                            onChange={onInputChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="brand_slug">Slug da marca</label>
                          <input
                            type="text"
                            id="brand_slug"
                            name="brand_slug"
                            className="form-control"
                            value={brand.brand_slug}
                            onChange={onInputChange}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <button
                          className="btn btn-create btn-block"
                          disabled={
                            !brand.brand_name || !brand.brand_slug
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