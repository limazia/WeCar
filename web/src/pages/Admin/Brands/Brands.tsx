import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Plus } from "@phosphor-icons/react";
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

import { ReactComponent as EmptyImage } from "@assets/empty.svg";

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
          <div className="col-md-12">
            <div className="d-flex align-items-center justify-content-end">
              <ActionButtons
                onRefreshClick={refreshList}
                permission={["brands.create"]}
                to="/admin/brands/create"
                label="Nova marca"
              />
            </div>
          </div>
          <div className="col-md-12 mt-4">
            {brands?.length > 0 ? (
              <>
                {brandItems.map((group, index) => (
                  <div
                    className={`row ${index !== 0 ? "mt-4" : "mt-0"}`}
                    key={index}
                  >
                    {group.map((brand) => (
                      <div key={brand.brand_id} className="col-sm-12 col-md-6 col-lg-4 mb-sm-5 mb-lg-0">
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
