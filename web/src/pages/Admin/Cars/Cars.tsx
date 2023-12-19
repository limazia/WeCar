import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import debounce from "lodash/debounce";

import { Car } from "@shared/interfaces";
import { CarService } from "@shared/services/CarService";
import { groupRow } from "@shared/helpers/groupRow";

import { Head } from "@components/Head";
import { Empty } from "@components/Empty";
import { CarCard } from "@components/Cards/Admin";
import { RedirectPermission } from "@components/Permission";
import { ActionButtons } from "@components/ActionButtons";
import { Loading } from "@components/Loading";

export function Cars() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      const { results } = await CarService.list();

      if (results) {
        setCars(results);
        setLoading(false);
      }
    } catch (error) {
      setLoading(true);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDeleteClick = async ({
    car_id,
    model_name,
  }: Car): Promise<void> => {
    if (window.confirm(`Deseja excluir "${model_name}"?`)) {
      try {
        const { error, message } = await CarService.delete(car_id);

        if (error) {
          toast.error(error);
        }

        toast.success(message);
        loadData();
      } catch (error) {
        toast.error("Erro ao excluir carro!");
      }
    }
  };

  const refreshList = debounce(() => {
    toast.success("Lista atualizada!");
    loadData();
  }, 3000);

  const carItems = groupRow(cars);

  if (loading) return <Loading type="spinner" />;

  return (
    <>
      <Head title="Carros" />
      <RedirectPermission required={["cars.list"]} />

      <div className="container pb-5">
        <div className="row">
          <div className="col-md-12 mt-4">
            <div className="card">
              <div className="card-body">
                <div className="d-flex align-items-center justify-content-between">
                  <h4>Carros</h4>

                  <ActionButtons
                    onRefreshClick={refreshList}
                    permission={["cars.create"]}
                    to="/admin/cars/create"
                  />
                </div>

                <div className="mt-3">
                  {cars?.length > 0 ? (
                    <>
                      {carItems.map((group, index) => (
                        <div
                          className={`row ${index !== 0 ? "mt-4" : "mt-0"}`}
                          key={index}
                        >
                          {group.map((car) => (
                            <div
                              key={car.car_id}
                              className="col-sm-12 col-md-6 col-lg-4 mb-sm-5 mb-lg-0"
                            >
                              <CarCard
                                data={car}
                                loading={loading}
                                handleDeleteClick={handleDeleteClick}
                              />
                            </div>
                          ))}
                        </div>
                      ))}
                    </>
                  ) : (
                    <div className="col-md-12">
                      <Empty
                        title="Nenhum carro foi encontrado"
                        description='Cadastre agora mesmo clicando no botão "+"'
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
