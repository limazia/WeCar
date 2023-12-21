import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { CarService } from "@shared/services/CarService";
import { groupRow } from "@shared/helpers/groupRow";

import { Head } from "@components/Head";
import { Search } from "@components/Search";
import { Empty } from "@components/Empty";
import { Loading } from "@components/Loading";
import { CarCard, CarShimmer } from "@components/Cards/Car";

type IParams = {
  brand_slug: string;
  model_slug: string;
};

interface IResponse {
  results: {
    model_name: string;
    car_id: string;
    car_km: number;
    car_price: number;
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
        response = await CarService.findByBrandAndModelSlug(
          brand_slug,
          model_slug
        );
      } else if (brand_slug) {
        response = await CarService.findByBrandSlug(brand_slug);
      } else {
        response = await CarService.list();
      }

      setCars(response);
      setLoading(false);
    } catch (ex) {
      setLoading(false);
    }
  }

  const carItems = groupRow(cars.results);

  return (
    <>
      <Head title={title} />
      <div className="container-fluid bg-light">
        <div className="row justify-content-center">
          <div className="col-md-9 mt-5 pb-5">
            <div className="row">
              <div className="col-md-12">
                <Search />
              </div>
            </div>
            {loading && <Loading type="spinner" />}
            {cars?.results?.length > 0 ? (
              <>
                {carItems.map((group, index) => (
                  <div className="row mt-5" key={index}>
                    {group.map((car) => (
                      <div key={car.car_id} className="col-sm-12 col-md-4">
                        {shimmer ? (
                          <CarShimmer key={`shimmer-${index}`} />
                        ) : (
                          <CarCard key={`car-${car.car_id}`} data={car} />
                        )}
                      </div>
                    ))}
                  </div>
                ))}
              </>
            ) : (
              <div className="col-md-12 mt-4">
                <Empty
                  title="Nenhum veículo encontrado"
                  description="Infelizmente não encontramos nenhum carro"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
