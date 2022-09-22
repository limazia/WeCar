import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import api, { getCities, getUfs } from "~/utils/services/api";
import { maskPhone } from "~/utils/services/mask";

import { Head } from "~/components/Partials/Head";
import { Spinner } from "~/components/Forms/Spinner";

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
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
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

  const handleChange = (event) => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, phone } = personal;

    if (name && email && phone) {
      setLoading(true);

      try {
        const { data } = await api.post("/api/sellcar", {
          personal,
        });
        const { error, message } = data;

        if (message) {
          toast.success(message);
          setPersonal(INITIAL_STATE);
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
                            onChange={(e) => handleChange(e)}
                          />
                        </div>
                        <div className="col-md-4">
                          <label htmlFor="email">Email</label>
                          <input
                            type="text"
                            id="email"
                            name="email"
                            className="form-control"
                            value={personal?.email}
                            onChange={(e) => handleChange(e)}
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
                            onChange={(e) => handleChange(e)}
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
                            onChange={(e) => handleChange(e)}
                          />
                        </div>
                        <div className="col-md-4">
                          <label htmlFor="city">Cidade</label>
                          <select
                            name="city"
                            id="city"
                            className="form-control"
                            onChange={handleChange}
                          >
                            <option value="0">Selecione uma cidade</option>
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
                            onChange={handleChange}
                          >
                            <option value="0">Selecione uma estado</option>
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
                          <label>Marca</label>
                          <input type="text" className="form-control" />
                        </div>
                        <div className="col-md-4">
                          <label>Modelo</label>
                          <input type="text" className="form-control" />
                        </div>
                        <div className="col-md-4">
                          <label>Versão</label>
                          <input type="text" className="form-control" />
                        </div>
                      </div>
                      <div className="row mt-4">
                        <div className="col-md-4">
                          <label>Cor</label>
                          <input type="text" className="form-control" />
                        </div>
                        <div className="col-md-4">
                          <label>KM</label>
                          <input type="text" className="form-control" />
                        </div>
                        <div className="col-md-4">
                          <label>Ano / Modelo</label>
                          <input type="text" className="form-control" />
                        </div>
                      </div>
                      <div className="row mt-4">
                        <div className="col-md-12">
                          <label>Observações</label>
                          <textarea
                            className="form-control"
                            rows="4"
                          ></textarea>
                        </div>
                      </div>
                      <div className="row mt-3">
                        <div className="col-sm-12 col-md-12">
                          <label>
                            Você é o primeiro proprietário do veículo
                          </label>
                          <div className="d-flex align-items-center p-2 bg-secondary">
                            <div className="form-check form-check-inline">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="inlineRadioOptions"
                                id="inlineRadio1"
                                value="option1"
                              />
                              <label
                                className="form-check-label text-white"
                                htmlFor="inlineRadio1"
                              >
                                Sim
                              </label>
                            </div>
                            <div className="form-check form-check-inline">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="inlineRadioOptions"
                                id="inlineRadio2"
                                value="option2"
                              />
                              <label
                                className="form-check-label text-white"
                                htmlFor="inlineRadio2"
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
                          <div className="d-flex align-items-center p-2 bg-secondary">
                            <div className="form-check form-check-inline">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="inlineRadioOptions"
                                id="inlineRadio1"
                                value="option1"
                              />
                              <label
                                className="form-check-label text-white"
                                htmlFor="inlineRadio1"
                              >
                                Sim
                              </label>
                            </div>
                            <div className="form-check form-check-inline">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="inlineRadioOptions"
                                id="inlineRadio2"
                                value="option2"
                              />
                              <label
                                className="form-check-label text-white"
                                htmlFor="inlineRadio2"
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
                          <div className="d-flex align-items-center p-2 bg-secondary">
                            <div className="form-check form-check-inline">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="inlineRadioOptions"
                                id="inlineRadio1"
                                value="option1"
                              />
                              <label
                                className="form-check-label text-white"
                                htmlFor="inlineRadio1"
                              >
                                Sim
                              </label>
                            </div>
                            <div className="form-check form-check-inline">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="inlineRadioOptions"
                                id="inlineRadio2"
                                value="option2"
                              />
                              <label
                                className="form-check-label text-white"
                                htmlFor="inlineRadio2"
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
                          <div className="d-flex align-items-center p-2 bg-secondary">
                            <div className="form-check form-check-inline">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="inlineRadioOptions"
                                id="inlineRadio1"
                                value="option1"
                              />
                              <label
                                className="form-check-label text-white"
                                htmlFor="inlineRadio1"
                              >
                                Sim
                              </label>
                            </div>
                            <div className="form-check form-check-inline">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="inlineRadioOptions"
                                id="inlineRadio2"
                                value="option2"
                              />
                              <label
                                className="form-check-label text-white"
                                htmlFor="inlineRadio2"
                              >
                                Não
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row mt-3">
                        <div className="col-md-12">
                          <button
                            className="btn btn-warning btn-lg text-white"
                            disabled={
                              !personal?.name ||
                              !personal?.email ||
                              !personal?.phone
                                ? true
                                : false
                            }
                          >
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
