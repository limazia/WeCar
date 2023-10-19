import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { ArrowsClockwise, Plus, Trash } from "@phosphor-icons/react";
import debounce from "lodash/debounce";

import { Car, ExchangeOptions, FuelOptions } from "@utils/interfaces";
import { exchangeOptions, fuelOptions } from "@utils/helpers/options";
import { CarService } from "@utils/services/CarService";
import { formatCurrency, formatKM } from "@utils/helpers/format";

import { Head } from "@components/Head";
import { Empty } from "@components/Empty";
import { Input } from "@components/Forms/Input";
import { Button } from "@components/Forms/Button";
import { Permission, RedirectPermission } from "@components/Permission";
import { Carousel, SingleImage } from "@components/Images";

import { ReactComponent as EmptyImage } from "@assets/empty.svg";

export function Cars() {
  const [cars, setCars] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCars();
  }, [search]);

  useEffect(() => {
    window.addEventListener("refresh-cars", () => loadCars());

    return () => {
      window.removeEventListener("refresh-cars", () => loadCars());
    };
  }, []);

  async function loadCars() {
    try {
      const { results } = await CarService.list();

      if (results) {
        const filtered = results.filter(
          (car: Car) =>
            car.brand_name?.toLowerCase().includes(search.toLowerCase()) ||
            car.brand_slug?.toLowerCase().includes(search.toLowerCase()) ||
            car.model_name?.toLowerCase().includes(search.toLowerCase()) ||
            car.model_slug?.toLowerCase().includes(search.toLowerCase())
        );
        setCars(filtered);
        setLoading(false);
      }
    } catch (ex) {
      setLoading(true);
    }
  }

  const handleDeleteClick = async (item: Car) => {
    if (window.confirm(`Deseja excluir "${item.model_name}"?`)) {
      try {
        const { error, message } = await CarService.delete({
          car_id: item.car_id?.toString(),
        });

        if (message) {
          toast.success(message);
          const event = new CustomEvent("refresh-cars");
          window.dispatchEvent(event);
        }

        if (error) {
          toast.error(error);
        }
      } catch (ex) {
        toast.error("Houve um problema com o servidor!");
      }
    }
  };

  const refreshModels = debounce(() => {
    toast.success("Lista atualizada!");

    const event = new CustomEvent("refresh-cars");
    window.dispatchEvent(event);
  }, 3000);

  const groupsOfThreeItems = cars.reduce((grupos, item, index) => {
    const grupoIndex = Math.floor(index / 3);

    if (!grupos[grupoIndex]) {
      grupos[grupoIndex] = [];
    }

    grupos[grupoIndex].push(item);
    return grupos;
  }, [] as Car[][]);

  if (loading) return <div />;

  return (
    <>
      <Head title="Carros" />
      <RedirectPermission required={["cars.list"]} />
      <div className="container pb-5">
        <div className="row">
          <div className="col-md-12">
            <div className="d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center">
                <Input
                  type="text"
                  name="search"
                  placeholder={`Pesquisar ${
                    cars.length === 1 ? "carro" : "carros"
                  }`}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <div className="d-flex">
                <button className="btn btn-link" onClick={refreshModels}>
                  <ArrowsClockwise size={20} />
                </button>
                <Permission required={["cars.create"]}>
                  <Link className="btn btn-primary-w" to="/admin/cars/create">
                    <Plus size={20} className="mr-1" /> Novo carro
                  </Link>
                </Permission>
              </div>
            </div>
          </div>
          <div className="col-md-12 mt-4">
            {cars?.length > 0 ? (
              <>
                {groupsOfThreeItems.map((group, index) => (
                  <div
                    className={`row ${index !== 0 ? "mt-4" : "mt-0"}`}
                    key={index}
                  >
                    {group.map((item, itemIndex) => (
                      <div className="col-md-4" key={itemIndex}>
                        <div className="card card-cars">
                          {item.car_image.length >= 2 ? (
                            <>
                              {Array.isArray(item.car_image) && (
                                <Carousel images={item.car_image} />
                              )}
                            </>
                          ) : (
                            <SingleImage image={item.car_image[0]} />
                          )}

                          <div className="card-body">
                            <div>
                              <h5>
                                {item.model_name} {item.car_year}
                              </h5>
                              <small className="text-muted d-block">
                                {formatCurrency(item?.car_price)}
                              </small>
                              <small className="text-muted d-block">
                                {formatKM(item?.car_km)} KM
                              </small>
                              <small className="text-muted d-block">
                                {
                                  fuelOptions[
                                    item?.car_fuel as keyof FuelOptions
                                  ]
                                }
                              </small>
                              <small className="text-muted d-block">
                                {
                                  exchangeOptions[
                                    item?.car_exchange as keyof ExchangeOptions
                                  ]
                                }
                              </small>
                            </div>
                          </div>

                          <Permission required={["cars.update", "cars.delete"]}>
                            <div className="card-footer">
                              <Permission required={["cars.update"]}>
                                <Link
                                  className="btn btn-edit btn-block"
                                  to={`/admin/cars/edit/${item.car_id}`}
                                >
                                  Editar
                                </Link>
                              </Permission>

                              <Permission required={["cars.delete"]}>
                                <Button
                                  className="btn btn-delete btn-block"
                                  loading={loading}
                                  disabled={loading}
                                  onClick={() => handleDeleteClick(item)}
                                >
                                  <Trash size={20} />
                                </Button>
                              </Permission>
                            </div>
                          </Permission>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </>
            ) : (
              <div className="card">
                <div className="card-body">
                  <div className="col-md-12">
                    <Empty
                      imageElement={EmptyImage}
                      title="Nenhuma marca foi encontrada"
                      description=" Começe cadastrando agora mesmo"
                    />

                    <div className="d-flex justify-content-center mt-4">
                      <Link
                        className="btn btn-primary-w"
                        to="/admin/cars/create"
                      >
                        <Plus size={20} className="mr-1" /> Nova marca
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
