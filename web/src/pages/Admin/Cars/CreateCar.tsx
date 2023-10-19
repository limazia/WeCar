import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ArrowLeft } from "@phosphor-icons/react";

import { ModelService } from "@utils/services/ModelService";
import { CarService } from "@utils/services/CarService";
import { Car } from "@utils/interfaces";
import { maskMoney } from "@utils/helpers/mask";

import { Head } from "@components/Head";
import { Button } from "@components/Forms/Button";
import { Textarea } from "@components/Forms/Textarea";
import { Input } from "@components/Forms/Input";
import { Select } from "@components/Forms/Select";
import { RedirectPermission } from "@components/Permission";

export function CreateCar() {
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
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadModels();
  }, []);

  async function loadModels() {
    const { results } = await ModelService.list();

    if (results) {
      setModels(results);
      setLoading(false);
    }
  }

  const onInputChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ): void => {
    const { name, value } = event.target;

    let newValue = value;

    if (name === "car_price") {
      newValue = maskMoney(value);
    }

    setCar((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));
  };

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);

    const {
      car_km,
      car_price,
      car_image,
      car_fuel,
      car_exchange,
      car_year,
      car_observation,
      id_model,
    } = car;

    try {
      const formattedCarPrice = car_price
        ? car_price.toString().replace(/\D/g, "")
        : car_price;

      const { error, message } = await CarService.create({
        payload: {
          car_km: Number(car_km),
          car_price: Number(formattedCarPrice),
          car_image,
          car_fuel,
          car_exchange,
          car_year,
          car_observation,
          id_model,
        },
      });

      if (message) {
        toast.success(message);
        setCar({
          car_fuel: "",
          car_exchange: "",
          car_year: "",
          car_observation: "",
          car_km: 0,
          car_price: 0,
          car_image: "",
          id_model: "",
        });
        setLoading(false);

        navigate("/admin/cars");
      }

      if (error) {
        toast.error(error);
        setLoading(false);
      }
    } catch (ex) {
      setLoading(false);
    }
  }

  const validate =
    loading ||
    !car.car_km ||
    !car.car_price ||
    !car.car_fuel ||
    !car.car_exchange ||
    !car.car_year ||
    !car.id_model;

  return (
    <>
      <Head title="Novo carro" />
      <RedirectPermission required={["cars.create"]} />
      <div className="container pb-5">
        <div className="row d-flex justify-content-center">
          <div className="col-md-12">
            <div className="card card-cars">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <Link to="/admin/cars/">
                    <ArrowLeft size={20} className="mr-2" color="#000" />
                  </Link>
                  <h5 className="card-title mb-0">Nova carro</h5>
                </div>

                <form onSubmit={handleSubmit} className="mt-4">
                  <div className="row">
                    <div className="col-md-4">
                      <div className="form-group">
                        <label htmlFor="id_model">*Modelo</label>
                        <Select.Root
                          name="id_model"
                          id="id_model"
                          defaultValue=""
                          disabled={loading}
                          value={car?.id_model}
                          onChange={onInputChange}
                        >
                          <Select.Option disabled value="">
                            Selecione um modelo
                          </Select.Option>
                          {models?.map(({ model_id, model_name }) => (
                            <Select.Option key={model_id} value={model_id}>
                              {model_name}
                            </Select.Option>
                          ))}
                        </Select.Root>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label htmlFor="car_fuel">*Combustível</label>
                        <Select.Root
                          id="car_fuel"
                          name="car_fuel"
                          defaultValue=""
                          disabled={loading}
                          value={car?.car_fuel}
                          onChange={onInputChange}
                        >
                          <Select.Option disabled value="">
                            Selecione um combustível
                          </Select.Option>
                          <Select.Option value="gasoline">
                            Gasolina
                          </Select.Option>
                          <Select.Option value="flex">Flex</Select.Option>
                          <Select.Option value="diesel">Diesel</Select.Option>
                          <Select.Option value="electric">
                            Elétrico
                          </Select.Option>
                          <Select.Option value="hybrid">Híbrido</Select.Option>
                        </Select.Root>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="car_exchange">*Câmbio</label>
                      <Select.Root
                        id="car_exchange"
                        name="car_exchange"
                        defaultValue=""
                        disabled={loading}
                        value={car?.car_exchange}
                        onChange={onInputChange}
                      >
                        <Select.Option disabled value="">
                          Selecione um câmbio
                        </Select.Option>
                        <Select.Option value="automatic">
                          Automatica
                        </Select.Option>
                        <Select.Option value="manual">Manual</Select.Option>
                      </Select.Root>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-4">
                      <label htmlFor="car_year">*Ano</label>
                      <Input
                        type="text"
                        name="car_year"
                        id="car_year"
                        disabled={loading}
                        value={car?.car_year}
                        onChange={onInputChange}
                      />
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="car_km">*KM</label>
                      <Input
                        type="number"
                        name="car_km"
                        id="car_km"
                        disabled={loading}
                        value={car?.car_km}
                        onChange={onInputChange}
                      />
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="car_price">*Valor</label>
                      <Input
                        type="text"
                        name="car_price"
                        id="car_price"
                        disabled={loading}
                        value={car?.car_price}
                        onChange={onInputChange}
                      />
                    </div>
                  </div>
                  <div className="row mt-4">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="car_image">Imagens do carro</label>
                        <Textarea
                          id="car_image"
                          name="car_image"
                          rows={4}
                          disabled={loading}
                          value={car?.car_image}
                          onChange={onInputChange}
                        />
                        <small id="car_image" className="form-text text-muted">
                          *Adicione a URL da imagem em formato .jpg ou .png, ou
                          insira várias URLs separadas por vírgulas para
                          adicionar várias imagens.
                        </small>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="car_observation">Observações</label>
                      <Textarea
                        id="car_observation"
                        name="car_observation"
                        rows={4}
                        disabled={loading}
                        value={car?.car_observation}
                        onChange={onInputChange}
                      />
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-12">
                      <Button
                        className="btn btn-primary-w btn-block"
                        disabled={validate}
                        loading={loading}
                      >
                        Finalizar
                      </Button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
