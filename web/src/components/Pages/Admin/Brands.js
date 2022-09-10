import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import WebRepository from "~/services/WebRepository";

import { TableBrands } from "~/components/Tables/Brands";
import { Loading } from "~/components/Partials/Loading";

import { Empty } from "~/components/Images";

export function Brands() {
  const navigate = useNavigate([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBrands();

    window.addEventListener("refresh-brands", () => {
      getBrands();
    });

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [loading]);

  if (loading) {
    return <Loading />;
  }

  async function getBrands() {
    const { results } = await WebRepository.getBrands();

    if (results) {
      setBrands(results);
    }
  }

  const goCreate = () => navigate("/brand/create");

  const columns = [
    {
      Header: "Marca",
    },
    {
      Header: "Slug",
    },
    {
      Header: "Data de cadastro",
    },
  ];

  return (
    <div className="container">
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
                    Nenhum cliente foi encontrado
                  </span>
                  <small className="empty-description mt-3 pb-4">
                    Começe cadastrando agora mesmo
                  </small>
                  <button className="btn btn-create" onClick={goCreate}>
                    <i className="far fa-plus mr-1"></i> Cadastrar marca
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function BrandCreate() {
  return <h1>BrandCreate</h1>;
}

export function BrandView() {
  return <h1>BrandView</h1>;
}
