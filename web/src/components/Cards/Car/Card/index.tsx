import { Link } from "react-router-dom";

import { formatCurrency, formatKM, wasWeeksAgo } from "@utils/helpers/format";
import { Car, ExchangeOptions, FuelOptions } from "@utils/interfaces";
import { exchangeOptions, fuelOptions } from "@utils/helpers/options";

import { Carousel, SingleImage } from "@components/Images";

export function CarCard({
  model_name,
  car_id,
  car_km,
  car_price,
  car_image,
  car_fuel,
  car_exchange,
  car_year,
  created_at,
}: Car) {
  const fuelKey: keyof FuelOptions = car_fuel as keyof FuelOptions;
  const exchangeKey: keyof ExchangeOptions =
    car_exchange as keyof ExchangeOptions;

  return (
    <div className="card card-car p-1">
      <div className="card-header">
        <div className="car-info">
          <div className="d-flex flex-column">
            <small className="d-block text-muted">
              <span className="font-weight-bold">{created_at}</span>
            </small>
            <span className="font-weight-bold text-uppercase">
              {model_name}
            </span>
          </div>

          {wasWeeksAgo(created_at) && <div className="new">Novo</div>}
        </div>
      </div>
      <div className="car-image">
        {car_image.length >= 2 ? (
          <>{Array.isArray(car_image) && <Carousel images={car_image} />}</>
        ) : (
          <SingleImage image={car_image[0]} />
        )}
      </div>
      <div className="card-body">
        <div className="row">
          <div className="col-md-6">
            <span className="text-muted d-block">KM</span>
            <b>{formatKM(car_km) || "???"}</b>
          </div>
          <div className="col-md-6">
            <span className="text-muted d-block">Ano</span>{" "}
            <b>{car_year || "???"}</b>
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-md-6">
            <span className="text-muted d-block">Combustível</span>
            <b>{fuelOptions[fuelKey]}</b>
          </div>
          <div className="col-md-6">
            <span className="text-muted d-block">Câmbio</span>
            <b>{exchangeOptions[exchangeKey]}</b>
          </div>
        </div>
        <div className="row mt-4 d-flex align-items-center">
          <div className="col-md-6">
            <h4 className="font-weight-bold mb-0 pb-0">
              {formatCurrency(car_price)}
            </h4>
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
