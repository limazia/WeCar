import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ArrowLeft } from "@phosphor-icons/react";

import { BrandService } from "@utils/services/BrandService";

import { Head } from "@components/Head";
import { Input } from "@components/Forms/Input";
import { Button } from "@components/Forms/Button";
import { RedirectPermission } from "@components/Permission";

export function CreateBrand() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);

    try {
      const { error, message } = await BrandService.create({
        brand_name: name,
        brand_slug: slug,
      });

      if (message) {
        toast.success(message);
        setName("");
        setSlug("");
        setLoading(false);

        navigate("/admin/brands");
      }

      if (error) {
        toast.error(error);
        setLoading(false);
      }
    } catch (ex) {
      setLoading(false);
    }
  }

  const validate = loading || !name || !slug;

  return (
    <>
      <Head title="Nova marca" />
      <RedirectPermission required={["brands.create"]} />
      <div className="container pb-5">
        <div className="row d-flex justify-content-center">
          <div className="col-md-12">
            <div className="card card-brands">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <Link to="/admin/brands/">
                    <ArrowLeft size={20} className="mr-2" color="#000" />
                  </Link>
                  <h5 className="card-title mb-0">Nova marca</h5>
                </div>

                <form onSubmit={handleSubmit} className="mt-4">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="brand_name">*Nome da marca</label>
                        <Input
                          type="text"
                          id="brand_name"
                          name="brand_name"
                          disabled={loading}
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                        <small id="brand_name" className="form-text text-muted">
                          Exemplo: Mercedes-Benz, Mercedes Benz
                        </small>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="brand_slug">*Slug</label>
                        <Input
                          type="text"
                          id="brand_slug"
                          name="brand_slug"
                          disabled={loading}
                          value={slug}
                          onChange={(e) => setSlug(e.target.value)}
                        />
                        <small id="brand_slug" className="form-text text-muted">
                          Exemplo: mercedes-benz, mercedesbenz, mercedes
                        </small>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <Button
                        type="submit"
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
