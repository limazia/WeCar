import { useState, useLayoutEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { getCarById } from "~/utils/services/api";
import { cars } from "~/utils/database/cars";

import { Head } from "../Partials/Head";
import { Loading } from "../Partials/Loading";

import CarDefault from "~/assets/car-default.jpg";

export function Car() {
  const { car_id } = useParams();
  const navigate = useNavigate();

  const [car, setCar] = useState([]);
  const [loading, setLoading] = useState(true);

  useLayoutEffect(() => {
    loadCar();

    setTimeout(() => setLoading(), 2000);
  }, []);

  const loadCar = async () => {
    const { results, error } = await getCarById(car_id);

    if (error) {
      navigate("/");
    } else {
      setCar(results);
    }
  };

  const getCarLogo = (brand_slug) => {
    const car = cars.find((car) => car.slug === brand_slug);

    if (car !== undefined) {
      return (
        <img
          src={require(`~/assets/logos/${car?.image.localThumb}`)}
          alt={car.brand_slug}
        />
      );
    }
  };

  const getExchange = (exchange) => {
    switch (exchange) {
      case "automatic":
        return "Automatica";
      case "manual":
        return "Manual";
      default:
        return "???";
    }
  };

  const getFuel = (fuel) => {
    switch (fuel) {
      case "gasoline":
        return "Gasolina";
      case "flex":
        return "Flex";
      case "diesel":
        return "Diesel";
      case "hybrid":
        return "Híbrido";
      case "electric":
        return "Elétrico";
      default:
        return "???";
    }
  };

  const price = car?.car_price?.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  const km = car?.car_km?.toLocaleString("pt-BR", {
    maximumFractionDigits: 2,
  });

  if (loading) {
    return <Loading type="spinner" />;
  }

  return (
    <>
      <Head title="Contato" />
      <div className="container-fluid bg-light">
        <div className="row justify-content-center">
          <div className="col-md-10 mt-5 pb-5">
            <div className="row">
              <div className="card card-buy-car">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-5">
                      <div className="car-image">
                        {car?.car_image?.length >= 2 ? (
                          <div
                            id="carCarouselIndicators"
                            className="carousel slide"
                            data-ride="carousel"
                          >
                            <ol className="carousel-indicators">
                              {car?.car_image.map((image, index) => (
                                <li
                                  key={index}
                                  data-target="#carCarouselIndicators"
                                  data-slide-to={index}
                                  className={`${index === 0 && "active"}`}
                                  style={{
                                    width: "10px",
                                    height: "10px",
                                    borderRadius: "50%",
                                    marginRight: "7px",
                                    marginLeft: "7px",
                                  }}
                                ></li>
                              ))}
                            </ol>
                            <div className="carousel-inner">
                              {car?.car_image.map((image, index) => (
                                <div
                                  key={index}
                                  className={`carousel-item ${
                                    index === 0 && "active"
                                  }`}
                                >
                                  <img
                                    className="d-block w-100"
                                    src={image}
                                    alt=""
                                  />
                                </div>
                              ))}
                            </div>
                            <a
                              className="carousel-control-prev"
                              href="#carCarouselIndicators"
                              role="button"
                              data-slide="prev"
                            >
                              <span
                                className="carousel-control-prev-icon"
                                aria-hidden="true"
                              ></span>
                              <span className="sr-only">Previous</span>
                            </a>
                            <a
                              className="carousel-control-next"
                              href="#carCarouselIndicators"
                              role="button"
                              data-slide="next"
                            >
                              <span
                                className="carousel-control-next-icon"
                                aria-hidden="true"
                              ></span>
                              <span className="sr-only">Next</span>
                            </a>
                          </div>
                        ) : (
                          <img
                            className="card-img-top"
                            src={car?.car_image ? car?.car_image : CarDefault}
                            alt=""
                          />
                        )}
                      </div>
                    </div>
                    <div className="col-md-7">
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="brand_logo">
                          {getCarLogo(car.brand_slug)}
                        </div>
                        <small className="car_id">#{car.car_id}</small>
                      </div>
                      <div
                        className="col-md-12 mt-3"
                        style={{ padding: "0 0" }}
                      >
                        <h4 className="font-weight-bold">
                          {car.model_name} {car.car_year.split("/", 1)}
                        </h4>
                        <small className="text-muted">
                          {km} KM • Prata • {getFuel(car.car_fuel)} •{" "}
                          {getExchange(car.car_exchange)}
                        </small>
                      </div>
                      <div
                        className="col-md-12 mt-3"
                        style={{ padding: "0 0" }}
                      >
                        <div
                          className="d-flex p-3"
                          style={{
                            backgroundColor: "#f5f6f7",
                            borderRadius: "8px",
                          }}
                        >
                          <div className="col-md-3">
                            <b>{car.createdAt}</b>
                            <span className="text-muted d-block">Data</span>
                          </div>
                          <div className="col-md-3">
                            <b>{car.brand_name}</b>
                            <span className="text-muted d-block">Marca</span>
                          </div>
                          <div className="col-md-3">
                            <b>&mdash;</b>
                            <span className="text-muted d-block">Desconto</span>
                          </div>
                          <div className="col-md-3">
                            <b>{price}</b>
                            <span className="text-muted d-block">Preço</span>
                          </div>
                        </div>
                      </div>
                      <div
                        className="col-md-12 mt-3"
                        style={{ padding: "0 0" }}
                      >
                        <ul className="list-group list-group-flush">
                          <li className="list-group-item d-flex justify-content-between align-items-center">
                            Blindagem
                            <b>Não</b>
                          </li>
                          <li className="list-group-item d-flex justify-content-between align-items-center">
                            Recuperada de roubo
                            <b>Não</b>
                          </li>
                          <li className="list-group-item d-flex justify-content-between align-items-center">
                            Batida
                            <b>Não</b>
                          </li>
                        </ul>
                      </div>
                      <div
                        className="col-md-12 d-flex align-items-center mt-5"
                        style={{ padding: "0 0" }}
                      >
                        <div className="col-md-6">
                          <h4 className="font-weight-bold mb-0 pb-0">{price}</h4>
                        </div>
                        <div className="col-md-6">
                          <a className="btn btn-contact w-100">
                            <i className="fab fa-whatsapp mr-2"></i> Entrar em
                            contato
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
