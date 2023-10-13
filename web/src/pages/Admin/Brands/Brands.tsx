import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { ArrowsClockwise, Plus, Trash } from "@phosphor-icons/react";
import debounce from "lodash/debounce";

import { Brand } from "@utils/interfaces";
import { BrandService } from "@utils/services/BrandService";

import { Head } from "@components/Head";
import { Empty } from "@components/Empty";
import { Input } from "@components/Forms/Input";
import { Button } from "@components/Forms/Button";
import { BrandLogo } from "@components/BrandLogo";
import { Permission, RedirectPermission } from "@components/Permission";

import { ReactComponent as EmptyImage } from "@assets/empty.svg";

export function Brands() {
  const [brands, setBrands] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBrands();
  }, [search]);

  useEffect(() => {
    window.addEventListener("refresh-brands", () => loadBrands());

    return () => {
      window.removeEventListener("refresh-brands", () => loadBrands());
    };
  }, []);

  async function loadBrands() {
    try {
      const { results } = await BrandService.list();

      if (results) {
        const filtered = results.filter(
          (brand: Brand) =>
            brand.brand_name.toLowerCase().includes(search.toLowerCase()) ||
            brand.brand_slug.toLowerCase().includes(search.toLowerCase())
        );
        setBrands(filtered);
        setLoading(false);
      }
    } catch (ex) {
      setLoading(true);
    }
  }

  const handleDeleteClick = async (item: Brand) => {
    if (window.confirm(`Deseja excluir "${item.brand_name}"?`)) {
      try {
        const { error, message } = await BrandService.delete({
          brand_id: item.brand_id.toString(),
        });

        if (message) {
          toast.success(message);
          const event = new CustomEvent("refresh-brands");
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

  const refreshBrands = debounce(() => {
    toast.success("Lista atualizada!");

    const event = new CustomEvent("refresh-brands");
    window.dispatchEvent(event);
  }, 3000);

  const groupsOfThreeItems = brands.reduce((grupos, item, index) => {
    const grupoIndex = Math.floor(index / 3);

    if (!grupos[grupoIndex]) {
      grupos[grupoIndex] = [];
    }

    grupos[grupoIndex].push(item);
    return grupos;
  }, [] as Brand[][]);

  if (loading) return <div />;

  return (
    <>
      <Head title="Marcas" />
      <RedirectPermission required={["brands"]} />
      <div className="container pb-5">
        <div className="row">
          <div className="col-md-12">
            <div className="d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center">
                <Input
                  type="text"
                  name="search"
                  placeholder={`Pesquisar ${
                    brands.length === 1 ? "marca" : "marcas"
                  }`}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <div className="d-flex">
                <button className="btn btn-link" onClick={refreshBrands}>
                  <ArrowsClockwise size={20} />
                </button>
                <Permission required={["create_brand"]}>
                  <Link className="btn btn-primary-w" to="/admin/brands/create">
                    <Plus size={20} className="mr-1" /> Nova marca
                  </Link>
                </Permission>
              </div>
            </div>
          </div>
          <div className="col-md-12 mt-4">
            {brands?.length > 0 ? (
              <>
                {groupsOfThreeItems.map((group, index) => (
                  <div
                    className={`row ${index !== 0 ? "mt-4" : "mt-0"}`}
                    key={index}
                  >
                    {group.map((item, itemIndex) => (
                      <div className="col-md-4" key={itemIndex}>
                        <div className="card card-brands">
                          <BrandLogo
                            brand_slug={item.brand_slug}
                            className="card-img-top brand-logo"
                          />
                          <div className="card-body">
                            <div>
                              <h5>{item.brand_name}</h5>
                              <small className="text-muted">
                                {item.brand_slug}
                              </small>
                            </div>
                          </div>

                          <Permission
                            required={["update_brand", "delete_brand"]}
                          >
                            <div className="card-footer">
                              <Permission required={["update_brand"]}>
                                <Link
                                  className="btn btn-edit btn-block"
                                  to={`/admin/brands/edit/${item.brand_id}`}
                                >
                                  Editar
                                </Link>
                              </Permission>

                              <Permission required={["delete_brand"]}>
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
                        to="/admin/brands/create"
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
