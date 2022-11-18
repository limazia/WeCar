import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import api, { getModels } from "~/utils/services/api";
import { maskMoney } from "~/utils/services/mask";

import { Head } from "~/components/Partials/Head";
import { Spinner } from "~/components/Partials/Spinner";

export function CarCreate() {
  const navigate = useNavigate();
  
  const INITIAL_STATE = {
    car_km: "",
    car_price: "",
    car_image: "",
    car_fuel: "",
    car_exchange: "",
    car_year: "",
    car_observation: "",
    id_model: "",
  };

  const [car, setCar] = useState(INITIAL_STATE);
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadModels() {
      const { results } = await getModels();

      setModels(results);
    }

    loadModels();
  }, []);

  const onInputChange = (event) => {
    const { name, value } = event.target;

    if (name === "car_price") {
      setCar((prevState) => ({
        ...prevState,
        car_price: maskMoney(value),
      }));
    } else {
      setCar((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      car_km,
      car_price,
      car_fuel,
      car_exchange,
      car_year,
      id_model,
    } = car;

    if (car_km && car_price && car_fuel && car_exchange && car_year && id_model) {
      setLoading(true);

      try {
        const { data } = await api.post("/api/car", {
          car_km: Number(car.car_km),
          car_price: parseInt(car.car_price.match(/\d/g).join("")),
          car_image: car.car_image,
          car_fuel: car.car_fuel,
          car_exchange: car.car_exchange,
          car_year: Number(car.car_year),
          car_observation: car.car_observation,
          id_model: car.id_model,
        });
        const { error, message } = data;

        if (message) {
          toast.success(message);
          setCar(INITIAL_STATE);
          setLoading(false);
          navigate("../cars");
        } else {
          toast.error(error);
          setLoading(false);
        }
      } catch (ex) {
        console.log(ex);
        toast.error("Houve um problema com o servidor!");
        setLoading(false);
      }
    } else {
      toast.error("Preencha todos os campos para continuar!");
    }
  };

  return (
    <>
      <Head title="Cadastrar carro" />
      <div className="container pb-5">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                <h3 className="card-title">Cadastrar carro</h3>
                <form onSubmit={handleSubmit} className="mt-5">
                  <div className="row">
                    <div className="col-md-4">
                      <div className="form-group">
                        <label htmlFor="id_model">
                          Modelo <small className="text-danger">*</small>
                        </label>
                        <select
                          name="id_model"
                          id="id_model"
                          className="form-control"
                          onChange={onInputChange}
                          defaultValue=""
                        >
                          <option disabled value="" />
                          {models?.map(({ model_id, model_name }) => (
                            <option key={model_id} value={model_id}>
                              {model_name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label htmlFor="car_fuel">
                          Combustível <small className="text-danger">*</small>
                        </label>
                        <select
                          id="car_fuel"
                          name="car_fuel"
                          className="form-control"
                          onChange={onInputChange}
                          defaultValue=""
                        >
                          <option disabled value="">
                            Combustível
                          </option>
                          <option value="gasoline">Gasolina</option>
                          <option value="flex">Flex</option>
                          <option value="diesel">Diesel</option>
                          <option value="electric">Elétrico</option>
                          <option value="hybrid">Híbrido</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="car_exchange">
                        Câmbio <small className="text-danger">*</small>
                      </label>
                      <select
                        id="car_exchange"
                        name="car_exchange"
                        className="form-control"
                        onChange={onInputChange}
                        defaultValue=""
                      >
                        <option disabled value="">
                          Câmbio
                        </option>
                        <option value="automatic">Automatica</option>
                        <option value="manual">Manual</option>
                      </select>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-4">
                      <label htmlFor="car_year">
                        Ano <small className="text-danger">*</small>
                      </label>
                      <input
                        type="number"
                        maxLength={4}
                        name="car_year"
                        id="car_year"
                        className="form-control"
                        onChange={onInputChange}
                        value={car.car_year}
                      />
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="car_km">
                        KM <small className="text-danger">*</small>
                      </label>
                      <input
                        type="text"
                        name="car_km"
                        id="car_km"
                        className="form-control"
                        onChange={onInputChange}
                        value={car.car_km}
                      />
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="car_price">
                        Valor <small className="text-danger">*</small>
                      </label>
                      <input
                        type="text"
                        name="car_price"
                        id="car_price"
                        className="form-control"
                        onChange={onInputChange}
                        value={car.car_price}
                      />
                    </div>
                  </div>
                  <div className="row mt-4">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="car_image">Imagens do carro</label>
                        <textarea
                          className="form-control"
                          id="car_image"
                          name="car_image"
                          rows="4"
                          value={car.car_image}
                          onChange={onInputChange}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="car_observation">Observações</label>
                      <textarea
                        className="form-control"
                        id="car_observation"
                        name="car_observation"
                        rows="4"
                        value={car.car_observation}
                        onChange={onInputChange}
                      />
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-12">
                      <button
                        className="btn btn-create btn-block"
                        disabled={
                          !car?.id_model ||
                          !car?.car_price ||
                          !car?.car_km ||
                          !car?.car_year ||
                          !car?.car_fuel ||
                          !car?.car_exchange
                            ? true
                            : false
                        }
                      >
                        {loading ? <Spinner /> : "Cadastrar"}
                      </button>
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
