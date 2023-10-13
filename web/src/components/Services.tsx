import { Bank, CarProfile, UserRectangle } from "@phosphor-icons/react";
import { Link } from "react-router-dom";

export function Services() {
  return (
    <div
      className="container-fluid mt-5 pb-5"
      style={{ borderBottom: "1px solid rgba(0, 0, 0, 0.12)" }}
    >
      <div className="row bg-white">
        <div className="container">
          <div className="row d-flex justify-content-center">
            <div className="col-md-12 text-center">
              <h1 className="text-uppercase">Nossos Serviços</h1>
              <p className="text-muted">
                Confira os serviços que oferecemos para você!
              </p>
            </div>
            <div className="row mt-3">
              <div className="col-md-4 col-sm-12">
                <div className="services">
                  <div className="icon">
                    <Bank size={100} />
                  </div>

                  <div>
                    <Link to="/contact" className="mt-5">
                      <h3 className="title">Seu carro no pagamento</h3>
                    </Link>

                    <p className="description">
                      Troque seu carro antigo como entrada e saia com seu carro
                      novo sem complicações.
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-md-4 col-sm-12">
                <div className="services">
                  <div className="icon">
                    <CarProfile size={100} />
                  </div>

                  <div>
                    <Link to="/sell" className="mt-5">
                      <h3 className="title">Quer vender seu carro?</h3>
                    </Link>

                    <p className="description">
                      Escolha seu veículo ideal e comece uma viagem sem limites
                      hoje.
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-md-4 col-sm-12">
                <div className="services">
                  <div className="icon">
                    <UserRectangle size={100} />
                  </div>

                  <div>
                    <Link to="/contact" className="mt-5">
                      <h3 className="title">Quer falar conosco?</h3>
                    </Link>

                    <p className="description">
                      Se deseja falar conosco, basta clicar aqui e preencher o
                      formulário de contato.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
