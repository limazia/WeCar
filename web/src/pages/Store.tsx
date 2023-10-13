import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Plus } from "@phosphor-icons/react";
import clx from "classnames";

import { CarService } from "@utils/services/CarService";

import { Head } from "@components/Head";
import { Search } from "@components/Search";
import { Empty } from "@components/Empty";
import { CarCard, CarShimmer } from "@components/Cards/Car";

import { ReactComponent as CarEmpty } from "@assets/car-empty.svg";

type IParams = {
  brand_slug: string;
  model_slug: string;
};

interface IResponse {
  results: {
    model_name: string;
    car_id: string;
    car_km: string;
    car_price: string;
    car_image: string[];
    car_fuel: string;
    car_exchange: string;
    car_year: string;
    created_at: string;
  }[];
}

export function Store() {
  const { brand_slug, model_slug } = useParams() as IParams;
  const title = `Comprar ${brand_slug ?? ""} ${model_slug ?? ""}`;

  const [cars, setCars] = useState<IResponse>({
    results: [],
  });
  const [shimmer, setShimmer] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();

    setTimeout(() => setShimmer(false), 2000);
  }, [loading, brand_slug, model_slug]);

  async function fetchData() {
    try {
      let response: IResponse;

      if (model_slug) {
        response = await CarService.findByBrandAndModelSlug({
          brand_slug,
          model_slug,
        });
      } else if (brand_slug) {
        response = await CarService.findByBrandSlug({ brand_slug });
      } else {
        response = await CarService.list();
      }

      setCars(response);
      setLoading(false);
    } catch (ex) {
      setLoading(false);
    }
  }

  if (loading) return <div />;

  return (
    <>
      <Head title={title} />
      <div className="container-fluid bg-light">
        <div className="row justify-content-center">
          <div className="col-md-9 mt-5 pb-5">
            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-body">
                    <Search />
                  </div>
                </div>
              </div>
            </div>
            {cars?.results?.length > 0 ? (
              <>
                <div className="row mt-4">
                  <div className="col-md-4">
                    <div className="card card-filter">
                      <div className="card-header">
                        <span>Filtrar</span>
                        <small className="clear">Limpar</small>
                      </div>
                      <div className="card-body">
                        <div className="filter-option">
                          <span>Características</span>
                          <Plus size={13} />
                        </div>
                        <div className="filter-option">
                          <span>Combustível</span>
                          <Plus size={13} />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-8">
                    <div className="row">
                      <div className="col-md-12 d-flex justify-content-between align-items-center">
                        <div className="dropdown">
                          <button
                            className="btn btn-link text-decoration-none text-muted dropdown-toggle p-0"
                            type="button"
                            id="menuOrder"
                            data-toggle="dropdown"
                          >
                            Ordenar: Novo
                          </button>
                          <div
                            className="dropdown-menu"
                            aria-labelledby="menuOrder"
                          >
                            <a className="dropdown-item active">Novo</a>
                            <a className="dropdown-item" role="button">
                              Menor Preço
                            </a>
                            <a className="dropdown-item" role="button">
                              Maior Preço
                            </a>
                            <a className="dropdown-item" role="button">
                              Menor KM
                            </a>
                          </div>
                        </div>
                        <small className="text-muted font-weight-bold">
                          {cars?.results?.length}{" "}
                          {cars?.results?.length === 1 ? "carro" : "carros"}
                        </small>
                      </div>
                    </div>

                    {cars?.results?.map((car, index) => (
                      <div
                        key={index}
                        className={clx("row", {
                          "mt-5": index !== 0,
                          "mt-3": index === 0,
                        })}
                      >
                        <div className="col-md-12">
                          {shimmer ? (
                            <CarShimmer key={`shimmer-${index}`} />
                          ) : (
                            <CarCard
                              key={`car-${car.car_id}`}
                              model_name={car.model_name}
                              car_id={car.car_id}
                              car_km={Number(car.car_km)}
                              car_price={Number(car.car_price)}
                              car_image={car.car_image}
                              car_fuel={car.car_fuel}
                              car_exchange={car.car_exchange}
                              car_year={car.car_year}
                              created_at={car.created_at}
                            />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="col-md-12 mt-4">
                <Empty
                  imageElement={CarEmpty}
                  title="Nenhum veículo encontrado"
                  description="infelizmente não encotramos nenhum carro"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
