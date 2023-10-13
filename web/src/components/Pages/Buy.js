import { Fragment, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import classNames from "classnames";

import { getCarByBrand, getBrandByBrand, getCars } from "~/utils/services/api";

import { Head } from "../Partials/Head";
import { SelectWrapper } from "../Forms/Select";

import { CardCar } from "../Cards/Car";
import { CarShimmer } from "../Cards/Shimmer/Car";

import { ReactComponent as CarEmpty } from "~/assets/car-empty.svg";

export function Buy() {
  const { brand, model } = useParams();

  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  const href = "#";

  useEffect(() => {
    if (model) {
      loadCar(brand, model);
    } else if (brand) {
      loadCarByBrand(brand);
    } else {
      loadCars();
    }

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [loading]);

  const loadCar = async (brand, model) => {
    const { results } = await getCarByBrand(brand, model);

    setCars(results);
  };

  const loadCarByBrand = async (brand) => {
    const { results } = await getBrandByBrand(brand);

    setCars(results);
  };

  const loadCars = async () => {
    const { results } = await getCars();

    setCars(results);
  };

  const renderCar = (cars, loading) => {
    return cars.map((car, index) => (
      <Fragment key={index}>
        {loading ? (
          <div
            key={index}
            className={classNames("row", {
              "mt-5": index !== 0,
              "mt-3": index === 0,
            })}
          >
            <div className="col-md-12">
              <CarShimmer />
            </div>
          </div>
        ) : (
          <div
            key={index}
            className={classNames("row", {
              "mt-5": index !== 0,
              "mt-3": index === 0,
            })}
          >
            <div className="col-md-12">
              <CardCar data={car} brand={brand} model={model} />
            </div>
          </div>
        )}
      </Fragment>
    ));
  };

  return (
    <>
      <Head title={`Comprar ${brand ? brand : ""} ${model ? model : ""}`} />
      <div className="container-fluid bg-light">
        <div className="row justify-content-center">
          <div className="col-md-9 mt-5 pb-5">
            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-body">
                    <div className="row d-flex align-items-center">
                      <div className="col-md-10">
                        <div className="form-group mb-0">
                          <SelectWrapper forcePosition="bottom" />
                        </div>
                      </div>
                      <div className="col-md-2">
                        <Link
                          className="btn btn-primary btn-block"
                          to="/buy"
                        >
                          Ver todos
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-md-4 pb-4">
                <div className="card">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center">
                      <span>Filtrar</span>
                      <button className="btn btn-link p-0">Limpar</button>
                    </div>
                    <div className="d-block card-filter">
                      <article className="filter-group">
                        <header className="card-header px-0">
                          <a
                            href={href}
                            data-toggle="collapse"
                            data-target="#features"
                            data-abc="true"
                            className="collapsed"
                            aria-expanded="false"
                          >
                            <i className="icon-control fa fa-chevron-down"></i>
                            <h6 className="title">Características</h6>
                          </a>
                        </header>
                        <div className="filter-content collapse" id="features">
                          <div className="card-body p-0">
                            <select className="form-control" defaultValue="">
                              <option disabled value="">
                                Câmbio
                              </option>
                              <option value="automatic">Automatica</option>
                              <option value="manual">Manual</option>
                            </select>
                          </div>
                        </div>
                      </article>
                      <article className="filter-group">
                        <header className="card-header px-0">
                          <a
                            href={href}
                            data-toggle="collapse"
                            data-target="#fuel"
                            className="collapsed"
                          >
                            <i className="icon-control fa fa-chevron-down"></i>
                            <h6 className="title">Combustível</h6>
                          </a>
                        </header>
                        <div className="filter-content collapse" id="fuel">
                          <div className="card-body p-0">
                            <select className="form-control" defaultValue="">
                              <option disabled value="">
                                Combustível
                              </option>
                              <option value="gasoline">Gasolina</option>
                              <option value="flex">Flex</option>
                              <option value="diesel">Diesel</option>
                              <option value="electric">Elétrico</option>
                              <option value="hybrid">Híbrido</option>
                            </select>
                          </div>
                        </div>
                      </article>
                    </div>
                  </div>
                </div>
              </div>
              {cars?.length > 0 ? (
                <div className="col-md-8">
                  <div className="row">
                    <div className="col-md-12 d-flex justify-content-between align-items-center">
                      <div className="dropdown">
                        <button
                          className="btn btn-link text-muted dropdown-toggle p-0"
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
                          <a className="dropdown-item active" href={href}>
                            Novo
                          </a>
                          <a className="dropdown-item" href={href}>
                            Menor Preço
                          </a>
                          <a className="dropdown-item" href={href}>
                            Maior Preço
                          </a>
                          <a className="dropdown-item" href={href}>
                            Menor KM
                          </a>
                        </div>
                      </div>
                      <small className="text-muted font-weight-bold">
                        {cars?.length} {cars?.length === 1 ? "carro" : "carros"}
                      </small>
                    </div>
                  </div>
                  {renderCar(cars, loading)}
                </div>
              ) : (
                <div className="col-sm-7 mt-4 empty-car text-center">
                  <div className="empty-image pb-3">
                    <CarEmpty className="img-fluid" />
                  </div>
                  <span className="empty-title">Nenhum veículo encontrado</span>
                  <small className="empty-description mt-3 pb-4">
                    infelizmente não encotramos nenhum carro
                  </small>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
