import { Fragment, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import classNames from "classnames";

import WebRepository from "~/services/WebRepository";

import { Head } from "../Head";
import { SelectWrapper } from "../Select";
import { CardCar } from "../Card";
import { CarShimmer } from "../Shimmer/CardCar";

import { ReactComponent as CarEmpty } from "~/assets/car-empty.svg";

export function Car() {
  const { brand, model } = useParams();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (model) {
      loadCar(brand, model);
    } else {
      loadCarByBrand(brand);
    }

    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, [loading]);

  const loadCar = async (brand, model) => {
    const { results } = await WebRepository.getCar(brand, model);

    setCars(results);
  };

  const loadCarByBrand = async (brand) => {
    const { results } = await WebRepository.getBrandById(brand);

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
    <Fragment>
      <Head title={`Comprar ${brand} ${model ? model : ""}`} />
      <div className="container-fluid car">
        <div className="row justify-content-center">
          <div className="col-md-9 mt-5 pb-5">
            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-body">
                    <SelectWrapper forcePosition="bottom" />
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
                    <div className="d-block">
                      <div className="d-flex justify-content-between align-items-center">
                        <span>Características</span>
                        <i className="far fa-angle-down"></i>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <span>Combustível</span>
                        <i className="far fa-angle-down"></i>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <span>Outros</span>
                        <i className="far fa-angle-down"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {cars?.length > 0 ? (
                <div className="col-md-7">
                  <div className="row">
                    <div className="col-md-12 d-flex justify-content-between align-items-center">
                      <div className="dropdown">
                        <button
                          className="btn btn-link text-muted dropdown-toggle p-0"
                          type="button"
                          id="dropdownMenuButton"
                          data-toggle="dropdown"
                        >
                          Ordenar: Relevância
                        </button>
                        <div
                          className="dropdown-menu"
                          aria-labelledby="dropdownMenuButton"
                        >
                          <a className="dropdown-item active" href="#">
                            Relevância
                          </a>
                          <a className="dropdown-item" href="#">
                            Menor Preço
                          </a>
                          <a className="dropdown-item" href="#">
                            Maior Preço
                          </a>
                          <a className="dropdown-item" href="#">
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
    </Fragment>
  );
}
