import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Marquee from "react-fast-marquee";

import { getBrands } from "~/utils/services/api";
import { cars } from "~/utils/database/cars";

import { Head } from "../Partials/Head";
import { Services } from "../Services";
import { SelectWrapper } from "../Forms/Select";

export function Buy() {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    loadBrands();
  }, []);

  const loadBrands = async () => {
    const { results } = await getBrands();

    setBrands(results);
  };

  return (
    <>
      <Head />
      <div className="container-fluid box-search bg-light">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-12 col-md-12 col-lg-8 col-xl-8 search">
            <div className="text-center">
              <h1 className="title">
                Seu site de venda de carros
                <br />
                favorito
              </h1>
              <span className="description">
                Encontre o melhor carro para você
              </span>
            </div>
            <div className="card p-2 mt-5">
              <div className="card-body">
                <div className="row d-flex align-items-center">
                  <div className="col-md-10">
                    <div className="form-group mb-0 wicon">
                      <i className="fas fa-search left"></i>
                      <SelectWrapper />
                    </div>
                  </div>
                  <div className="col-md-2">
                    <Link className="btn btn-primary" to="/buy/car">
                      Ver todos
                    </Link>
                  </div>
                </div>
                <div className="row mt-5">
                  <div className="col-md-12">
                    <span>
                      Marcas de carros <b>disponíveis</b> no WeCar:
                    </span>
                  </div>
                  <Marquee className="marquee" gradientWidth={80}>
                    {brands.map((row) => {
                      const { brand_id, brand_slug } = row;
                      const car = cars.find((car) => car.slug === brand_slug);

                      if (car !== undefined) {
                        return (
                          <img
                            key={brand_id}
                            src={require(`~/assets/logos/${car?.image.localThumb}`)}
                            alt={brand_slug}
                          />
                        );
                      }
                    })}
                  </Marquee>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Services />
    </>
  );
}
