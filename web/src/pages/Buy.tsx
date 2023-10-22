import { useState, useLayoutEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { formatCurrency, formatKM } from "@utils/helpers/format";
import { Car, ExchangeOptions, FuelOptions } from "@utils/interfaces";
import { exchangeOptions, fuelOptions } from "@utils/helpers/options";
import { CarService } from "@utils/services/CarService";

import { Head } from "@components/Head";
import { Loading } from "@components/Loading";
import { Footer } from "@components/Footer";
import { Navbar, Utility } from "@components/Navbar";
import { WhatsApp } from "@components/WhatsApp";
import { BrandLogo } from "@components/BrandLogo";
import { WhatsAppIcon } from "@components/Icons/WhatsApp";
import { Carousel, SingleImage } from "@components/Images";

type IParams = {
  car_id: string;
};

export function Buy() {
  const { car_id } = useParams() as IParams;
  const navigate = useNavigate();

  const [car, setCar] = useState<Car>({
    car_fuel: "",
    car_exchange: "",
    car_year: "",
    car_observation: "",
    car_km: 0,
    car_price: 0,
    car_image: "",
    id_model: "",
  });
  const [loading, setLoading] = useState(true);

  useLayoutEffect(() => {
    fetchData();

    setTimeout(() => setLoading(false), 2000);
  }, [loading]);

  async function fetchData() {
    const response = await CarService.findById({ car_id });

    if (response === undefined) {
      navigate("/admin/cars");
    } else {
      setCar({
        ...car,
        car_id: response.car_id,
        car_km: response.car_km,
        car_price: response.car_price,
        car_image: response.car_image,
        car_fuel: response.car_fuel,
        car_exchange: response.car_exchange,
        car_year: response.car_year,
        brand_slug: response.brand_slug,
        brand_name: response.brand_name,
        created_at: response.created_at,
      });
    }
  }

  const fuelKey: keyof FuelOptions = car.car_fuel as keyof FuelOptions;
  const exchangeKey: keyof ExchangeOptions =
    car.car_exchange as keyof ExchangeOptions;

  const number = import.meta.env.VITE_PHONE_NUMBER;
  const message = `Olá! Estou interessado no carro ${car_id}!`;
  const whatsapp_url = `https://api.whatsapp.com/send?phone=${number}&text=${message}`;

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Head title="Comprar carro" />
      <header>
        <Utility />
        <Navbar />
      </header>
      <main>
        <WhatsApp />
        <div className="container-fluid bg-light">
          <div className="row justify-content-center">
            <div className="col-md-10 mt-5 pb-5">
              <div className="row">
                <div className="card card-buy-car">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-5">
                        <div className="car-image">
                          {car.car_image.length >= 2 ? (
                            <>
                              {Array.isArray(car.car_image) && (
                                <Carousel images={car.car_image} />
                              )}
                            </>
                          ) : (
                            <SingleImage image={car.car_image[0]} />
                          )}
                        </div>
                      </div>
                      <div className="col-md-7">
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="brand_logo">
                            {car.brand_slug && (
                              <BrandLogo brand_slug={car.brand_slug} />
                            )}
                          </div>
                          <small className="car_id">#{car.car_id}</small>
                        </div>
                        <div
                          className="col-md-12 mt-3"
                          style={{ padding: "0 0" }}
                        >
                          <h4 className="font-weight-bold">
                            {car.model_name} {car.car_year}
                          </h4>
                          <small className="text-muted">
                            <span>{formatKM(car.car_km)} KM</span>
                            <span>{" · "}</span>
                            <span>Prata</span>
                            <span>{" · "}</span>
                            <span>{fuelOptions[fuelKey]}</span>
                            <span>{" · "}</span>
                            <span>{exchangeOptions[exchangeKey]}</span>
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
                              <span className="text-muted d-block">Data</span>
                              <b>{car.created_at}</b>
                            </div>
                            <div className="col-md-3">
                              <span className="text-muted d-block">Marca</span>
                              <b>{car.brand_name}</b>
                            </div>
                            <div className="col-md-3">
                              <span className="text-muted d-block">
                                Desconto
                              </span>
                              <b>Nenhum</b>
                            </div>
                            <div className="col-md-3">
                              <span className="text-muted d-block">Preço</span>

                              <b>{formatCurrency(car.car_price)}</b>
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
                            <h4 className="font-weight-bold mb-0 pb-0">
                              <span>{formatCurrency(car.car_price)}</span>
                            </h4>
                          </div>
                          <div className="col-md-6">
                            <a
                              className="btn btn-contact-whatsapp w-100"
                              href={whatsapp_url}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <WhatsAppIcon /> Entrar em contato
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
      </main>
      <Footer />
    </>
  );
}
