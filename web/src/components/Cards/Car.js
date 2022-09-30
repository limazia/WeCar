import { Link } from "react-router-dom";

import CarDefault from "~/assets/car-default.jpg";

export function CardCar({ data }) {
  const {
    model_name,
    car_id,
    car_km,
    car_price,
    car_image,
    car_fuel,
    car_exchange,
    car_year,
    createdAt,
  } = data;

  const price = car_price.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  const km = car_km.toLocaleString("pt-BR", {
    maximumFractionDigits: 2,
  });

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

  return (
    <div className="card card-car p-1">
      <div className="card-header d-flex justify-content-between align-items-center">
        <div className="car-info">
          <small className="d-block text-muted">
            <span className="font-weight-bold">
              {createdAt.split(",", 4)[0]},
            </span>
            {createdAt.split(",", 4)[1]}
          </small>
          <span className="font-weight-bold text-uppercase">{model_name}</span>
        </div>
      </div>
      <div className="car-image">
        {car_image?.length >= 2 ? (
          <div
            id="carCarouselIndicators"
            className="carousel slide"
            data-ride="carousel"
          >
            <ol className="carousel-indicators">
              {car_image.map((image, index) => (
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
              {car_image.map((image, index) => (
                <div
                  key={index}
                  className={`carousel-item ${index === 0 && "active"}`}
                >
                  <img className="d-block w-100" src={image} alt="" />
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
            src={car_image ? car_image : CarDefault}
            alt=""
          />
        )}
      </div>
      <div className="card-body">
        <div className="row">
          <div className="col-md-6">
            <span className="text-muted d-block">KM</span>
            <b>{km || "???"}</b>
          </div>
          <div className="col-md-6">
            <span className="text-muted d-block">Ano</span>{" "}
            <b>{car_year || "???"}</b>
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-md-6">
            <span className="text-muted d-block">Combustível</span>
            <b>{getFuel(car_fuel)}</b>
          </div>
          <div className="col-md-6">
            <span className="text-muted d-block">Câmbio</span>
            <b>{getExchange(car_exchange)}</b>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-md-6">
            <h4 className="font-weight-bold mb-0 pb-0">{price}</h4>
          </div>
          <div className="col-md-6">
            <Link
              to={`../car/${car_id}`}
              className="btn btn-more-details w-100"
            >
              Mais detalhes
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
