import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { ArrowsClockwise, Plus, Trash } from "@phosphor-icons/react";
import debounce from "lodash/debounce";

import { Model } from "@utils/interfaces";
import { ModelService } from "@utils/services/ModelService";

import { Head } from "@components/Head";
import { Empty } from "@components/Empty";
import { Input } from "@components/Forms/Input";
import { Button } from "@components/Forms/Button";
import { BrandLogo } from "@components/BrandLogo";
import { Permission, RedirectPermission } from "@components/Permission";

import { ReactComponent as EmptyImage } from "@assets/empty.svg";

export function Models() {
  const [models, setModels] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadModels();
  }, [search]);

  useEffect(() => {
    window.addEventListener("refresh-models", () => loadModels());

    return () => {
      window.removeEventListener("refresh-models", () => loadModels());
    };
  }, []);

  async function loadModels() {
    try {
      const { results } = await ModelService.list();

      if (results) {
        const filtered = results.filter(
          (model: Model) =>
            model.model_name.toLowerCase().includes(search.toLowerCase()) ||
            model.model_slug.toLowerCase().includes(search.toLowerCase())
        );
        setModels(filtered);
        setLoading(false);
      }
    } catch (ex) {
      setLoading(true);
    }
  }

  const handleDeleteClick = async (item: Model) => {
    if (window.confirm(`Deseja excluir "${item.model_name}"?`)) {
      try {
        const { error, message } = await ModelService.delete({
          model_id: item.model_id.toString(),
        });

        if (message) {
          toast.success(message);
          const event = new CustomEvent("refresh-models");
          window.dispatchEvent(event);
        }

        if (error) {
          toast.error(error);
        }
      } catch (ex) {
        toast.error("Houve um problema com o servidor!");
      }
    }
  };

  const refreshModels = debounce(() => {
    toast.success("Lista atualizada!");

    const event = new CustomEvent("refresh-models");
    window.dispatchEvent(event);
  }, 3000);

  const groupsOfThreeItems = models.reduce((grupos, item, index) => {
    const grupoIndex = Math.floor(index / 3);

    if (!grupos[grupoIndex]) {
      grupos[grupoIndex] = [];
    }

    grupos[grupoIndex].push(item);
    return grupos;
  }, [] as Model[][]);

  if (loading) return <div />;

  return (
    <>
      <Head title="Modelos" />
      <RedirectPermission required={["models.list"]} />
      <div className="container pb-5">
        <div className="row">
          <div className="col-md-12">
            <div className="d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center">
                <Input
                  type="text"
                  name="search"
                  placeholder={`Pesquisar ${
                    models.length === 1 ? "modelo" : "modelos"
                  }`}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <div className="d-flex">
                <button className="btn btn-link" onClick={refreshModels}>
                  <ArrowsClockwise size={20} />
                </button>
                <Permission required={["models.create"]}>
                  <Link className="btn btn-primary-w" to="/admin/models/create">
                    <Plus size={20} className="mr-1" /> Novo modelo
                  </Link>
                </Permission>
              </div>
            </div>
          </div>
          <div className="col-md-12 mt-4">
            {models?.length > 0 ? (
              <>
                {groupsOfThreeItems.map((group, index) => (
                  <div
                    className={`row ${index !== 0 ? "mt-4" : "mt-0"}`}
                    key={index}
                  >
                    {group.map((item, itemIndex) => (
                      <div className="col-md-4" key={itemIndex}>
                        <div className="card card-models">
                          <BrandLogo
                            brand_slug={item.brand_slug ? item.brand_slug : ""}
                            className="card-img-top brand-logo"
                          />
                          <div className="card-body">
                            <div>
                              <h5>{item.model_name}</h5>
                              <small className="text-muted">
                                {item.model_slug}
                              </small>
                            </div>
                          </div>

                          <Permission
                            required={["models.update", "models.delete"]}
                          >
                            <div className="card-footer">
                              <Permission required={["models.update"]}>
                                <Link
                                  className="btn btn-edit btn-block"
                                  to={`/admin/models/edit/${item.model_id}`}
                                >
                                  Editar
                                </Link>
                              </Permission>

                              <Permission required={["models.delete"]}>
                                <Button
                                  className="btn btn-delete btn-block"
                                  loading={loading}
                                  disabled={loading}
                                  onClick={() => handleDeleteClick(item)}
                                >
                                  <Trash size={20} />
                                </Button>
                              </Permission>
                            </div>
                          </Permission>
                        </div>
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
