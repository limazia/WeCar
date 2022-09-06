import { Fragment } from "react";

import { Head } from "~/components/Partials/Head";

export function Sell() {
  return (
    <Fragment>
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
                <form className="mt-4">
                  <div className="card">
                    <div className="card-body">
                      <h3 className="card-title">Dados Pessoais</h3>
                      <div className="row mt-4">
                        <div className="col-md-6">
                          <label>Nome Completo</label>
                          <input type="text" className="form-control" />
                        </div>
                        <div className="col-md-6">
                          <label>E-mail</label>
                          <input type="text" className="form-control" />
                        </div>
                      </div>
                      <div className="row mt-4">
                        <div className="col-md-6">
                          <label>Telefone Fixo</label>
                          <input type="text" className="form-control" />
                        </div>
                        <div className="col-md-6">
                          <label>Celular</label>
                          <input type="text" className="form-control" />
                        </div>
                      </div>
                      <div className="row mt-4">
                        <div className="col-md-4">
                          <label>Endereço</label>
                          <input type="text" className="form-control" />
                        </div>
                        <div className="col-md-4">
                          <label>Cidade</label>
                          <input type="text" className="form-control" />
                        </div>
                        <div className="col-md-4">
                          <label>Estado</label>
                          <input type="text" className="form-control" />
                        </div>
                      </div>
                      <div className="row mt-4">
                        <div className="col-md-4">
                          <label>Horário para contato</label>
                          <input type="text" className="form-control" />
                        </div>
                        <div className="col-md-4">
                          <label>Aceito ser contatado pelo Whatsapp</label>
                          <input type="text" className="form-control" />
                        </div>
                        <div className="col-md-4">
                          <label>
                            Desejo receber ofertas e novidades por e-mail
                          </label>
                          <input type="text" className="form-control" />
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
                                for="inlineRadio1"
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
                                for="inlineRadio2"
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
                                for="inlineRadio1"
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
                                for="inlineRadio2"
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
                                for="inlineRadio1"
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
                                for="inlineRadio2"
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
                                for="inlineRadio1"
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
                                for="inlineRadio2"
                              >
                                Não
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row mt-3">
                        <button className="btn btn-danger btn-block">
                          Enviar
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
