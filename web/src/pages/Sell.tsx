import { FormEvent, useState } from "react";
import { toast } from "react-toastify";

import { Head } from "@components/Head";
import { SectionTitle } from "@components/SectionTitle";
import { Input } from "@components/Forms/Input";
import { Button } from "@components/Forms/Button";
import { Textarea } from "@components/Forms/Textarea";
import { Spinner } from "@components/Spinner";

export function Sell() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    toast.warning("Recurso em desenvolvimento!");

    setTimeout(async () => setLoading(false), 2000);
  };

  return (
    <>
      <Head title="Venda seu carro" />
      <div className="container-fluid bg-light">
        <div className="row d-flex justify-content-center">
          <div className="col-md-12">
            <div className="row d-flex justify-content-center">
              <div className="col-md-8 mt-5 pb-5">
                <SectionTitle
                  title="Deseja vender seu carro?"
                  subtitle="Preencha o formulário abaixo para que possamos avaliar."
                />
                <form onSubmit={handleSubmit} className="mt-4">
                  <div className="card">
                    <div className="card-body">
                      <h3 className="card-title">Dados Pessoais</h3>
                      <div className="row mt-4">
                        <div className="col-md-4">
                          <label htmlFor="name">Nome Completo</label>
                          <Input type="text" id="name" name="name" />
                        </div>
                        <div className="col-md-4">
                          <label htmlFor="email">Email</label>
                          <Input type="email" id="email" name="email" />
                        </div>
                        <div className="col-md-4">
                          <label htmlFor="phone">Celular</label>
                          <Input type="text" id="phone" name="phone" />
                        </div>
                      </div>
                      <div className="row mt-4">
                        <div className="col-md-4">
                          <label htmlFor="address">Endereço</label>
                          <Input type="text" id="address" name="address" />
                        </div>
                        <div className="col-md-4">
                          <label htmlFor="city">Cidade</label>
                          <Input type="text" name="city" id="city" />
                        </div>
                        <div className="col-md-4">
                          <label htmlFor="state">Estado</label>
                          <Input type="text" name="state" id="state" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card mt-5">
                    <div className="card-body">
                      <h3 className="card-title">Dados do veículo</h3>
                      <div className="row mt-4">
                        <div className="col-md-6">
                          <label htmlFor="brand_name">Marca</label>
                          <Input
                            type="text"
                            id="brand_name"
                            name="brand_name"
                          />
                        </div>
                        <div className="col-md-6">
                          <label htmlFor="model_name">Modelo</label>
                          <Input
                            type="text"
                            id="model_name"
                            name="model_name"
                          />
                        </div>
                      </div>
                      <div className="row mt-4">
                        <div className="col-md-6">
                          <label htmlFor="car_km">KM</label>
                          <Input type="text" id="car_km" name="car_km" />
                        </div>
                        <div className="col-md-6">
                          <label htmlFor="car_year">Ano / Modelo</label>
                          <Input type="text" id="car_year" name="car_year" />
                        </div>
                      </div>
                      <div className="row mt-4">
                        <div className="col-md-6">
                          <label htmlFor="car_fuel">Combustível</label>
                          <select
                            id="car_fuel"
                            name="car_fuel"
                            className="form-control step"
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
                          <Textarea
                            id="car_observations"
                            name="car_observations"
                            className="form-control"
                            rows={4}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-12">
                      <Button
                        type="submit"
                        className="btn btn-primary-w btn-block"
                      >
                        {loading ? (
                          <>
                            <Spinner /> Enviando...
                          </>
                        ) : (
                          "Enviar"
                        )}
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
