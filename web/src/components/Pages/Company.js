import { Fragment } from "react";

import { Head } from "~/components/Head";

export function Company() {
  return (
    <Fragment>
      <Head title="Empresa" />
      <div className="container mt-5 pb-5">
        <div className="row d-flex justify-content-center">
          <div className="col-md-7">
            <h1>Conheça nossa história</h1>
            <div className="company-image">
              <img
                src="https://cdn.sitewebmotors.com.br/uploads/userGallery/5eb576ae0bc95.png"
                className="img-thumbnail mt-2"
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
