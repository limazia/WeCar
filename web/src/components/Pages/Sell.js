import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import api, { getCities, getUfs } from "~/utils/services/api";
import { maskPhone } from "~/utils/services/mask";

import { Head } from "~/components/Partials/Head";
import { Spinner } from "~/components/Partials/Spinner";

export function Sell() {
  const INITIAL_STATE = {
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
  };

  const INITIAL_STATE_CAR = {
    brand_name: "",
    model_name: "",
    car_version: "",
    car_color: "",
    car_km: "",
    car_year: "",
    car_fuel: "",
    car_exchange: "",
    car_observations: "",
    firstOwner: "",
    spot: "",
    vehicleInsurance: "",
    recoveredTheft: "",
  };

  const [personal, setPersonal] = useState(INITIAL_STATE);
  const [car, setCar] = useState(INITIAL_STATE_CAR);
  const [ufs, setUfs] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadUfs() {
      const response = await getUfs();

      const ufInitials = response.data.map((uf) => {
        return {
          sigla: uf.sigla,
          nome: uf.nome,
        };
      });

      setUfs(ufInitials);
    }

    loadUfs();
  }, []);

  useEffect(() => {
    async function loadCities() {
      if (personal.state === "0") return;

      const response = await getCities(personal.state);

      const cityNames = response.data.map((city) => {
        return { nome: city.nome };
      });

      setCities(cityNames);
    }

    loadCities();
  }, [personal.state]);

  const handleChangePersonal = (event) => {
    const { name, value } = event.target;

    if (name === "phone") {
      setPersonal((prevState) => ({
        ...prevState,
        phone: maskPhone(value),
      }));
    } else {
      setPersonal((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleChangeCar = (event) => {
    console.log(car);
    const { name, value } = event.target;

    setCar((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, phone, address, city, state } = personal;

    if (name && email && phone && address && city && state) {
      setLoading(true);

      try {
        const { data } = await api.post("/api/sellcar", {
          personal,
          car
        });
        const { error, message } = data;

        if (message) {
          toast.success(message);
          //setPersonal(INITIAL_STATE);
          //setCar(INITIAL_STATE_CAR);
          setLoading(false);
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
      <Head title="Venda seu carro" />
      <div className="container-fluid bg-light">
        <div className="row d-flex justify-content-center">
          <div className="col-md-12">
            <div className="row d-flex justify-content-center">
              <div className="col-md-8 mt-5 pb-5">
                <h1>Deseja vender seu carro?</h1>
                <span className="text-muted">
                  Preencha o formulário abaixo para que possamos avaliar.
                </span>
                <form onSubmit={handleSubmit} className="mt-4">
                  <div className="card">
                    <div className="card-body">
                      <h3 className="card-title">Dados Pessoais</h3>
                      <div className="row mt-4">
                        <div className="col-md-4">
                          <label htmlFor="name">Nome Completo</label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            className="form-control"
                            value={personal?.name}
                            onChange={(e) => handleChangePersonal(e)}
                          />
                        </div>
                        <div className="col-md-4">
                          <label htmlFor="email">Email</label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            className="form-control"
                            value={personal?.email}
                            onChange={(e) => handleChangePersonal(e)}
                          />
                        </div>
                        <div className="col-md-4">
                          <label htmlFor="phone">Celular</label>
                          <input
                            type="text"
                            id="phone"
                            name="phone"
                            className="form-control"
                            value={personal?.phone}
                            onChange={(e) => handleChangePersonal(e)}
                          />
                        </div>
                      </div>
                      <div className="row mt-4">
                        <div className="col-md-4">
                          <label htmlFor="address">Endereço</label>
                          <input
                            type="text"
                            id="address"
                            name="address"
                            className="form-control"
                            value={personal?.address}
                            onChange={(e) => handleChangePersonal(e)}
                          />
                        </div>
                        <div className="col-md-4">
                          <label htmlFor="city">Cidade</label>
                          <select
                            name="city"
                            id="city"
                            className="form-control"
                            onChange={handleChangePersonal}
                            defaultValue=""
                          >
                            <option disabled value="" />
                            {cities.map((city) => (
                              <option key={city.nome} value={city.nome}>
                                {city.nome}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="col-md-4">
                          <label htmlFor="state">Estado</label>
                          <select
                            name="state"
                            id="state"
                            className="form-control step"
                            onChange={handleChangePersonal}
                            defaultValue=""
                          >
                            <option disabled value="" />
                            {ufs?.map((uf) => (
                              <option key={uf.nome} value={uf.sigla}>
                                {uf.sigla}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card mt-5">
                    <div className="card-body">
                      <h3 className="card-title">Dados do veículo</h3>
                      <div className="row mt-4">
                        <div className="col-md-4">
                          <label htmlFor="brand_name">Marca</label>
                          <input
                            type="text"
                            id="brand_name"
                            name="brand_name"
                            className="form-control"
                            value={car?.brand_name}
                            onChange={(e) => handleChangeCar(e)}
                          />
                        </div>
                        <div className="col-md-4">
                          <label htmlFor="model_name">Modelo</label>
                          <input
                            type="text"
                            id="model_name"
                            name="model_name"
                            className="form-control"
                            value={car?.model_name}
                            onChange={(e) => handleChangeCar(e)}
                          />
                        </div>
                        <div className="col-md-4">
                          <label htmlFor="car_version">Versão</label>
                          <input
                            type="text"
                            id="car_version"
                            name="car_version"
                            className="form-control"
                            value={car?.car_version}
                            onChange={(e) => handleChangeCar(e)}
                          />
                        </div>
                      </div>
                      <div className="row mt-4">
                        <div className="col-md-4">
                          <label htmlFor="car_color">Cor</label>
                          <input
                            type="text"
                            id="car_color"
                            name="car_color"
                            className="form-control"
                            value={car?.car_color}
                            onChange={(e) => handleChangeCar(e)}
                          />
                        </div>
                        <div className="col-md-4">
                          <label htmlFor="car_km">KM</label>
                          <input
                            type="text"
                            id="car_km"
                            name="car_km"
                            className="form-control"
                            value={car?.car_km}
                            onChange={(e) => handleChangeCar(e)}
                          />
                        </div>
                        <div className="col-md-4">
                          <label htmlFor="car_year">Ano / Modelo</label>
                          <input
                            type="text"
                            id="car_year"
                            name="car_year"
                            className="form-control"
                            value={car?.car_year}
                            onChange={(e) => handleChangeCar(e)}
                          />
                        </div>
                      </div>
                      <div className="row mt-4">
                        <div className="col-md-6">
                          <label htmlFor="car_fuel">Combustível</label>
                          <select
                            id="car_fuel"
                            name="car_fuel"
                            className="form-control step"
                            onChange={handleChangeCar}
                            defaultValue=""
                          >
                            <option disabled value="" />
                            <option value="Gasolina">Gasolina</option>
                            <option value="Flex">Flex</option>
                            <option value="Diesel">Diesel</option>
                            <option value="Híbrido">Híbrido</option>
                            <option value="Elétrico">Elétrico</option>
                          </select>
                        </div>
                        <div className="col-md-6">
                          <label htmlFor="car_exchange">Câmbio</label>
                          <select
                            id="car_exchange"
                            name="car_exchange"
                            className="form-control step"
                            onChange={handleChangeCar}
                            defaultValue=""
                          >
                            <option disabled value="" />
                            <option value="Automatica">Automatica</option>
                            <option value="Manual">Manual</option>
                          </select>
                        </div>
                      </div>
                      <div className="row mt-4">
                        <div className="col-md-12">
                          <label htmlFor="car_observations">Observações</label>
                          <textarea
                            id="car_observations"
                            name="car_observations"
                            className="form-control"
                            rows="4"
                            value={car?.car_observations}
                            onChange={(e) => handleChangeCar(e)}
                          ></textarea>
                        </div>
                      </div>
                      <div className="row mt-3">
                        <div className="col-sm-12 col-md-12">
                          <label>
                            Você é o primeiro proprietário do veículo
                          </label>
                          <div className="d-flex align-items-center p-3 bg-secondary" style={{ borderRadius: "8px" }}>
                            <div className="form-check form-check-inline">
                              <input
                                type="radio"
                                id="firstOwner1"
                                name="firstOwner"
                                className="form-check-input"
                                value="Sim"
                                onChange={(e) => handleChangeCar(e)}
                              />
                              <label
                                className="form-check-label text-white"
                                htmlFor="firstOwner1"
                              >
                                Sim
                              </label>
                            </div>
                            <div className="form-check form-check-inline">
                              <input
                                className="form-check-input"
                                type="radio"
                                id="firstOwner2"
                                name="firstOwner"
                                value="Não"
                                onChange={(e) => handleChangeCar(e)}
                              />
                              <label
                                className="form-check-label text-white"
                                htmlFor="firstOwner2"
                              >
                                Não
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row mt-3">
                        <div className="col-sm-12 col-md-12">
                          <label>
                            O estofamento, tapete ou teto possuem mancha
                          </label>
                          <div className="d-flex align-items-center p-3 bg-secondary" style={{ borderRadius: "8px" }}>
                            <div className="form-check form-check-inline">
                              <input
                                className="form-check-input"
                                type="radio"
                                id="spot1"
                                name="spot"
                                value="Sim"
                                onChange={(e) => handleChangeCar(e)}
                              />
                              <label
                                className="form-check-label text-white"
                                htmlFor="spot1"
                              >
                                Sim
                              </label>
                            </div>
                            <div className="form-check form-check-inline">
                              <input
                                type="radio"
                                id="spot2"
                                name="spot"
                                className="form-check-input"
                                value="Não"
                                onChange={(e) => handleChangeCar(e)}
                              />
                              <label
                                className="form-check-label text-white"
                                htmlFor="spot2"
                              >
                                Não
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row mt-3">
                        <div className="col-sm-12 col-md-12">
                          <label>O seu veículo possui seguro?</label>
                          <div className="d-flex align-items-center p-3 bg-secondary" style={{ borderRadius: "8px" }}>
                            <div className="form-check form-check-inline">
                              <input
                                type="radio"
                                id="vehicleInsurance1"
                                name="vehicleInsurance"
                                className="form-check-input"
                                value="Sim"
                                onChange={(e) => handleChangeCar(e)}
                              />
                              <label
                                className="form-check-label text-white"
                                htmlFor="vehicleInsurance1"
                              >
                                Sim
                              </label>
                            </div>
                            <div className="form-check form-check-inline">
                              <input
                                type="radio"
                                id="vehicleInsurance2"
                                name="vehicleInsurance"
                                className="form-check-input"
                                value="Não"
                                onChange={(e) => handleChangeCar(e)}
                              />
                              <label
                                className="form-check-label text-white"
                                htmlFor="vehicleInsurance2"
                              >
                                Não
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row mt-3">
                        <div className="col-sm-12 col-md-12">
                          <label>
                            O veículo foi alguma vez recuperado de roubo
                          </label>
                          <div className="d-flex align-items-center p-3 bg-secondary" style={{ borderRadius: "8px" }}>
                            <div className="form-check form-check-inline">
                              <input
                                type="radio"
                                id="recoveredTheft1"
                                name="recoveredTheft"
                                className="form-check-input"
                                value="Sim"
                                onChange={(e) => handleChangeCar(e)}
                              />
                              <label
                                className="form-check-label text-white"
                                htmlFor="recoveredTheft1"
                              >
                                Sim
                              </label>
                            </div>
                            <div className="form-check form-check-inline">
                              <input
                                type="radio"
                                id="recoveredTheft2"
                                name="recoveredTheft"
                                className="form-check-input"
                                value="Não"
                                onChange={(e) => handleChangeCar(e)}
                              />
                              <label
                                className="form-check-label text-white"
                                htmlFor="recoveredTheft2"
                              >
                                Não
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row mt-3">
                        <div className="col-md-12">
                          <button className="btn btn-warning btn-lg text-white">
                            {loading ? <Spinner type="grow" /> : "Enviar"}
                          </button>
                        </div>
                      </div>
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
