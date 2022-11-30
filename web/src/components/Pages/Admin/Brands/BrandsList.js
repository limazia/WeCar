import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getBrands } from "~/utils/services/api";

import { TableBrands } from "~/components/Tables/Brands";
import { Loading } from "~/components/Partials/Loading";
import { Head } from "~/components/Partials/Head";
import { Permission } from "~/components/Core/Permission";

import { Empty } from "~/components/Images";

export function BrandsList() {
  const navigate = useNavigate([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBrands();

    window.addEventListener("refresh-brands", loadBrands);

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [loading]);

  if (loading) {
    return <Loading />;
  }

  async function loadBrands() {
    const { results } = await getBrands();

    if (results) {
      setBrands(results);
    }
  }

  const goCreate = () => navigate("../brand/create");

  const columns = [
    {
      Header: "Marca",
      accessor: "brand_name",
    },
    {
      Header: "Slug",
      accessor: "brand_slug",
    },
    {
      Header: "Data de cadastro",
      accessor: "createdAt",
    },
  ];

  return (
    <>
      <Head title="Marcas" />
      <div className="container mt-3 pb-5">
        <div className="row">
          <div className="col-md-12">
            <div className="card card-customers">
              <div className="card-body">
                {brands.length > 0 ? (
                  <TableBrands columns={columns} data={brands} />
                ) : (
                  <div className="col-sm-12 empty-car text-center">
                    <div className="empty-image pb-3">
                      <Empty className="img-fluid" />
                    </div>
                    <span className="empty-title">
                      Nenhuma marca foi encontrada
                    </span>
                    <Permission required={["admin", "create_brand"]}>
                      <small className="empty-description mt-3 pb-4">
                        Começe cadastrando agora mesmo
                      </small>
                      <button
                        className="btn btn-create-table"
                        onClick={goCreate}
                      >
                        <i className="far fa-plus mr-1"></i> Cadastrar marca
                      </button>
                    </Permission>
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
