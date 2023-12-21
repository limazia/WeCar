import { Link } from "react-router-dom";

import { formatCurrency, formatKM, wasWeeksAgo } from "@shared/helpers/format";
import { ExchangeOptions, FuelOptions } from "@shared/interfaces";
import { exchangeOptions, fuelOptions } from "@shared/helpers/options";

import { Carousel, SingleImage } from "@components/Images";

interface CarCardProps {
  data: {
    car_id: string;
    car_image: string[];
    car_km: number;
    car_price: number;
    car_year: string;
    created_at: string;
    model_name: string;
    car_fuel: string;
    car_exchange: string;
  };
}

export function CarCard({ data }: CarCardProps) {
  const {
    car_id,
    car_image,
    car_km,
    car_price,
    car_year,
    created_at,
    model_name,
    car_fuel,
    car_exchange,
  } = data;

  const fuelKey: keyof FuelOptions = car_fuel as keyof FuelOptions;
  const exchangeKey: keyof ExchangeOptions =
    car_exchange as keyof ExchangeOptions;

  return (
    <div className="card card-car p-1 h-100">
      <div className="car-image">
        {car_image.length >= 2 ? (
          <>{Array.isArray(car_image) && <Carousel images={car_image} />}</>
        ) : (
          <SingleImage image={car_image[0]} />
        )}
        {wasWeeksAgo(created_at) && <div className="new">Novo</div>}
      </div>
      <div className="card-body h-100">
        <div className="row">
          <div className="col-md-12">
            <h5 className="font-weight-bold text-uppercase pb-2">
              {model_name}
            </h5>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <span className="text-muted d-block">KM</span>
            <b>{formatKM(car_km)}</b>
          </div>
          <div className="col-md-6">
            <span className="text-muted d-block">Ano</span> <b>{car_year}</b>
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
            <span
              className="font-weight-bold mb-0 pb-0 d-inline-block text-truncate"
              style={{ maxWidth: "130px" }}
            >
              {formatCurrency(car_price)}
            </span>
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
