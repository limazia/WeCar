import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import debounce from "lodash/debounce";

import { Brand } from "@shared/interfaces";
import { BrandService } from "@shared/services/BrandService";
import { groupRow } from "@shared/helpers/groupRow";

import { Head } from "@components/Head";
import { Empty } from "@components/Empty";
import { BrandCard } from "@components/Cards/Admin";
import { RedirectPermission } from "@components/Permission";
import { ActionButtons } from "@components/ActionButtons";
import { Loading } from "@components/Loading";

export function Brands() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      const { results } = await BrandService.list();

      if (results) {
        setBrands(results);
        setLoading(false);
      }
    } catch (error) {
      setLoading(true);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDeleteClick = async ({
    brand_id,
    brand_name,
  }: Brand): Promise<void> => {
    if (window.confirm(`Deseja excluir "${brand_name}"?`)) {
      try {
        const { error, message } = await BrandService.delete(brand_id);

        if (error) {
          toast.error(error);
        }

        toast.success(message);
        loadData();
      } catch (error) {
        toast.error("Erro ao excluir marca!");
      }
    }
  };

  const refreshList = debounce(() => {
    toast.success("Lista atualizada!");
    loadData();
  }, 3000);

  const brandItems = groupRow(brands);

  if (loading) return <Loading type="spinner" />;

  return (
    <>
      <Head title="Marcas" />
      <RedirectPermission required={["brands.list"]} />

      <div className="container pb-5">
        <div className="row">
          <div className="col-md-12 mt-4">
            <div className="card">
              <div className="card-body">
                <div className="d-flex align-items-center justify-content-between">
                  <h4>Marcas</h4>

                  <ActionButtons
                    onRefreshClick={refreshList}
                    permission={["brands.create"]}
                    to="/admin/brands/create"
                  />
                </div>

                <div className="mt-3">
                  {brands?.length > 0 ? (
                    <>
                      {brandItems.map((group, index) => (
                        <div
                          className={`row ${index !== 0 ? "mt-4" : "mt-0"}`}
                          key={index}
                        >
                          {group.map((brand) => (
                            <div
                              key={brand.brand_id}
                              className="col-sm-12 col-md-6 col-lg-4 mb-sm-5 mb-lg-0"
                            >
                              <BrandCard
                                item={brand}
                                loading={loading}
                                handleDeleteClick={handleDeleteClick}
                              />
                            </div>
                          ))}
                        </div>
                      ))}
                    </>
                  ) : (
                    <div className="col-md-12">
                      <Empty
                        title="Nenhuma marca foi encontrada"
                        description='Cadastre agora mesmo clicando no botão "+"'
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
