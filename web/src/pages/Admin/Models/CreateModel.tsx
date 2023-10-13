import { useState, useEffect, FormEvent } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft } from "@phosphor-icons/react";
import { toast } from "react-toastify";

import { BrandService } from "@utils/services/BrandService";
import { ModelService } from "@utils/services/ModelService";

import { Head } from "@components/Head";
import { Input } from "@components/Forms/Input";
import { Button } from "@components/Forms/Button";
import { Select } from "@components/Forms/Select";
import { RedirectPermission } from "@components/Permission";

export function CreateModel() {
  const { model_id } = useParams() as { model_id: string };
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [brand, setBrand] = useState("");
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadBrands();
  }, []);

  async function loadBrands() {
    const { results } = await BrandService.list();

    if (results) {
      setBrands(results);
      setLoading(false);
    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);

    try {
      const { error, message } = await ModelService.create({
        model_id,
        model_name: name,
        model_slug: slug,
        id_brand: brand,
      });

      if (message) {
        toast.success(message);
        setName("");
        setSlug("");
        setBrand("");
        setLoading(false);

        navigate("/admin/models");
      }

      if (error) {
        toast.error(error);
        setLoading(false);
      }
    } catch (ex) {
      setLoading(false);
    }
  }

  const validate = loading || !name || !slug || !brand;

  return (
    <>
      <Head title="Novo modelo" />
      <RedirectPermission required={["create_model"]} />
      <div className="container pb-5">
        <div className="row">
          <div className="col-md-12">
            <div className="card card-models">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <Link to="/admin/models/">
                    <ArrowLeft size={20} className="mr-2" color="#000" />
                  </Link>
                  <h5 className="card-title mb-0">Novo modelo</h5>
                </div>

                <form onSubmit={handleSubmit} className="mt-4">
                  <div className="row">
                    <div className="col-md-4">
                      <div className="form-group">
                        <label htmlFor="model_name">Nome do modelo</label>
                        <Input
                          type="text"
                          id="model_name"
                          name="model_name"
                          disabled={loading}
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                        <small id="model_name" className="form-text text-muted">
                          Exemplo: A5, TT, 320I, C180
                        </small>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label htmlFor="model_slug">Slug</label>
                        <Input
                          type="text"
                          id="model_slug"
                          name="model_slug"
                          disabled={loading}
                          value={slug}
                          onChange={(e) => setSlug(e.target.value)}
                        />
                        <small id="model_slug" className="form-text text-muted">
                          Exemplo: a5, tt, 320i, c180
                        </small>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label htmlFor="id_brand">Marca</label>
                        <Select.Root
                          name="id_brand"
                          id="id_brand"
                          defaultValue=""
                          disabled={loading}
                          value={brand}
                          onChange={(e) => setBrand(e.target.value)}
                        >
                          <Select.Option disabled value="">
                            Selecione uma marca
                          </Select.Option>
                          {brands?.map(({ brand_id, brand_name }) => (
                            <Select.Option key={brand_id} value={brand_id}>
                              {brand_name}
                            </Select.Option>
                          ))}
                        </Select.Root>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <Button
                        className="btn btn-primary-w btn-block"
                        disabled={validate}
                        loading={loading}
                      >
                        Finalizar
                      </Button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
