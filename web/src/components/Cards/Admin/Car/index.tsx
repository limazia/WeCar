import { Link } from "react-router-dom";
import { Pencil, Trash } from "@phosphor-icons/react";

import { Car, ExchangeOptions, FuelOptions } from "@shared/interfaces";
import { exchangeOptions, fuelOptions } from "@shared/helpers/options";
import { formatCurrency, formatKM } from "@shared/helpers/format";

import { Carousel, SingleImage } from "@components/Images";
import { Spinner } from "@components/Spinner";
import { Button } from "@components/Forms/Button";
import { Permission } from "@components/Permission";

interface CarCardProps {
  data: Car;
  loading: boolean;
  handleDeleteClick: (data: Car) => void;
}

export function CarCard({ data, loading, handleDeleteClick }: CarCardProps) {
  return (
    <div className="card card-cars h-100">
      {data.car_image.length >= 2 ? (
        <>
          {Array.isArray(data.car_image) && (
            <Carousel images={data.car_image} />
          )}
        </>
      ) : (
        <SingleImage image={data.car_image[0]} />
      )}

      <div className="card-body">
        <div>
          <h5>
            {data.model_name} {data.car_year}
          </h5>
          <small className="text-muted d-block">
            {formatCurrency(data?.car_price)}
          </small>
          <small className="text-muted d-block">
            {formatKM(data?.car_km)} KM
          </small>
          <small className="text-muted d-block">
            {fuelOptions[data?.car_fuel as keyof FuelOptions]}
          </small>
          <small className="text-muted d-block">
            {exchangeOptions[data?.car_exchange as keyof ExchangeOptions]}
          </small>
        </div>
      </div>

      <Permission required={["cars.update", "cars.delete"]}>
        <div className="card-footer">
          <div className="row">
            <Permission required={["cars.update"]}>
              <div className="col">
                <Link
                  className="btn btn-edit btn-block"
                  to={`/admin/cars/update/${data.car_id}`}
                >
                  <Pencil size={20} />
                </Link>
              </div>
            </Permission>

            <Permission required={["cars.delete"]}>
              <div className="col">
                <Button
                  className="btn btn-delete btn-block"
                  disabled={loading}
                  onClick={() => handleDeleteClick(data)}
                >
                  {loading ? <Spinner /> : <Trash size={20} />}
                </Button>
              </div>
            </Permission>
          </div>
        </div>
      </Permission>
    </div>
  );
}
