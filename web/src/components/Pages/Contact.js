import { Fragment } from "react";

import { Head } from "~/components/Partials/Head";

export function Contact() {
  return (
    <Fragment>
      <Head title="Contato" />
      <div className="container-fluid bg-light">
        <div className="row justify-content-center">
          <div className="col-md-9">
            <div className="row">
              <div className="col-md-8 mt-5 pb-5">
                <h1>Fale conosco</h1>
                <form>
                  <div className="row mt-4">
                    <div className="col-md-12">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Nome"
                      />
                    </div>
                  </div>
                  <div className="row mt-4">
                    <div className="col-md-12">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="E-mail"
                      />
                    </div>
                  </div>
                  <div className="row mt-4">
                    <div className="col-md-12">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Telefone"
                      />
                    </div>
                  </div>
                  <div className="row mt-4">
                    <div className="col-md-12">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Assunto"
                      />
                    </div>
                  </div>
                  <div className="row mt-4">
                    <div className="col-md-12">
                      <textarea
                        className="form-control"
                        rows="4"
                        placeholder="Mensagem"
                      />
                    </div>
                  </div>
                  <div className="row mt-4">
                    <div className="col-md-12">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id="defaultCheck1"
                        />
                        <label className="form-check-label" for="defaultCheck1">
                          Receber ofertas e promoções por e-mail, Whatsapp e
                          telefone
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-4">
                    <div className="col-md-12">
                      <button className="btn btn-warning btn-lg">Enviar</button>
                    </div>
                  </div>
                </form>
              </div>
              <div className="col-md-4 mt-5 pb-5">
                <div className="contact">
                  <div className="contact-info">
                    <i className="fa fa-map-marker"></i>
                    <span>Rua dos Pinheiros, 248 - São Paulo, SP</span>
                  </div>
                  <div className="contact-info">
                    <i className="fa fa-phone"></i>
                    <span>(19) xxxx-xxxx</span>
                  </div>
                  <div className="contact-info">
                    <i className="fa fa-envelope"></i>
                    <span>contato@wecar.com.br</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
