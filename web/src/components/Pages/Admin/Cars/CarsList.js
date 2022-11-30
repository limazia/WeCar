import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getCars } from "~/utils/services/api";

import { TableCars } from "~/components/Tables/Cars";
import { Loading } from "~/components/Partials/Loading";
import { Head } from "~/components/Partials/Head";
import { Permission } from "~/components/Core/Permission";

import { Empty } from "~/components/Images";

export function CarsList() {
  const navigate = useNavigate([]);
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCars();

    window.addEventListener("refresh-cars", loadCars);

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [loading]);

  if (loading) {
    return <Loading />;
  }

  async function loadCars() {
    const { results } = await getCars();

    if (results) {
      setCars(results);
    }
  }

  const goCreate = () => navigate("../car/create");

  const columns = [
    {
      Header: "Modelo",
      accessor: "model_name",
    },
    {
      Header: "Marca",
      accessor: "brand_name",
    },
    {
      Header: "KM",
      accessor: "car_km",
    },
    {
      Header: "Preço",
      accessor: "car_price",
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
                {cars.length > 0 ? (
                  <TableCars columns={columns} data={cars} />
                ) : (
                  <div className="col-sm-12 empty-car text-center">
                    <div className="empty-image pb-3">
                      <Empty className="img-fluid" />
                    </div>
                    <span className="empty-title">
                      Nenhum carro foi encontrado
                    </span>
                    <Permission required={["admin", "create_car"]}>
                      <small className="empty-description mt-3 pb-4">
                        Começe cadastrando agora mesmo
                      </small>
                      <button
                        className="btn btn-create-table"
                        onClick={goCreate}
                      >
                        <i className="far fa-plus mr-1"></i> Cadastrar carro
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
