import { Fragment } from "react";

import { Head } from "~/components/Head";

import CompanyBackground from "~/assets/bg-company.jpg";

export function Company() {
  return (
    <Fragment>
      <Head title="Empresa" />
      <div className="container-fluid car">
        <div className="row justify-content-center">
          <div className="col-md-7 mt-5 pb-5">
            <h1>Conheça nossa história</h1>
            <div className="company-image mt-3">
              <img
                src={CompanyBackground}
                className="img-thumbnail mt-2"
                loading="lazy"
                alt=""
              />
            </div>
            <div className="company-description mt-4">
              <p>
                Somos uma empresa tradicional no ramo de veículos, trabalhamos
                sempre focados na satisfação dos nossos clientes.
              </p>
              <p>
                Mantendo sempre um estoque atualizado e com veículos de
                qualidade, buscamos oferecer uma grande variedade de carros para
                escolha de nossos clientes.
              </p>
              <p>
                <b>
                  Venha a nossa loja e confira nosso amplo estoque de veículos
                  seminovos!
                </b>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
