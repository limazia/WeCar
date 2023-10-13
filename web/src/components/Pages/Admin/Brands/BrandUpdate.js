import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import api, { getBrandById } from "~/utils/services/api";

import { Head } from "~/components/Partials/Head";
import { Spinner } from "~/components/Partials/Spinner";

export function BrandUpdate() {
  const { brand_id } = useParams();
  const navigate = useNavigate();

  const [brand, setBrand] = useState({
    brand_name: "",
    brand_slug: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadBrandById(brand_id);
  }, []);

  async function loadBrandById(brand_id) {
    const { results, error } = await getBrandById(brand_id);

    console.log(results);

    if (error) {
      navigate("../brands");
    } else {
      setBrand(results);
    }
  }

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
        const { data } = await api.put(`/api/brand/${brand_id}`, {
          brand_name,
          brand_slug,
        });
        const { error, message } = data;

        if (message) {
          toast.success(message);
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
      <Head title={`Atualizar ${brand?.brand_name}`} />
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                <h3 className="card-title">Atualizar marca</h3>
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
                            value={brand?.brand_name}
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
                            value={brand?.brand_slug}
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
                            !brand?.brand_name || !brand?.brand_slug
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
