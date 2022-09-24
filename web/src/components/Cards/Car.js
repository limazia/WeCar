import CarDefault from "~/assets/car-default.jpg";

export function CardCar({ data }) {
  const {
    model_name,
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
        throw new Error("exchange warning");
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
        throw new Error("fuel warning");
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
        {car_image?.length > 0 ? (
          <div
            id="carCarouselIndicators"
            className="carousel slide"
            data-ride="carousel"
          >
            <ol class="carousel-indicators">
              {car_image.map((image, index) => (
                <li
                  key={index}
                  data-target="#carCarouselIndicators"
                  data-slide-to={index}
                  className={`${index === 0 && "active"}`}
                ></li>
              ))}
            </ol>
            <div class="carousel-inner">
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
              <span class="sr-only">Previous</span>
            </a>
            <a
              className="carousel-control-next"
              href="#carCarouselIndicators"
              role="button"
              data-slide="next"
            >
              <span
                class="carousel-control-next-icon"
                className-hidden="true"
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
            <b>{km}</b>
          </div>
          <div className="col-md-6">
            <span className="text-muted d-block">Ano</span> <b>{car_year}</b>
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
      </div>
      <div className="card-footer d-flex justify-content-between align-items-center">
        <h4 className="font-weight-bold mb-0 pb-0">{price}</h4>
        <a href="#" className="btn btn-more-details">
          Mais detalhes
        </a>
      </div>
    </div>
  );
}
