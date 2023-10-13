import { Link } from "react-router-dom";

export function Services() {
  return (
    <div
      className="container-fluid mt-5 pb-5"
      style={{ borderBottom: "1px solid rgba(0, 0, 0, 0.12)" }}
    >
      <div className="row bg-white">
        <div className="container">
          <div className="row services d-flex justify-content-center">
            <div className="col-md-12">
              <h3 className="title">Nossos Serviços</h3>
              <p className="text-muted">
                Confira os serviços que oferecemos para você!
              </p>
            </div>
            <div className="row mt-5 services">
              <div className="col-md-4 col-sm-12">
                <div className="service-box">
                  <div className="service-icon">
                    <i className="fas fa-money-check-edit-alt"></i>
                  </div>
                  <Link to="/contact" className="service-title">
                    <h3>Seu carro no pagamento</h3>
                  </Link>
                  <div className="service-description">
                    <p>
                      De seu carro como entrada e retire seu carro novo sem
                      complicações
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-md-4 col-sm-12 service">
                <div className="service-box">
                  <div className="service-icon">
                    <i className="fas fa-car"></i>
                  </div>
                  <Link to="/sell" className="service-title">
                    <h3>Quer vender seu carro?</h3>
                  </Link>
                  <div className="service-description">
                    <p>
                      A maneira mais rápida de vender o seu carro. Velocidade e
                      segurança na hora de negociar.
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-md-4 col-sm-12 service">
                <div className="service-box">
                  <div className="service-icon">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <Link to="/contact" className="service-title">
                    <h3>Quer falar conosco?</h3>
                  </Link>
                  <div className="service-description">
                    <p>
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
