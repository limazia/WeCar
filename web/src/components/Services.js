import { Link } from "react-router-dom";

export function Services() {
  return (
    <div className="container-fluid mt-5 pb-5">
      <div className="row bg-white">
        <div className="container">
          <div className="row services d-flex justify-content-center">
            <div className="col-md-12">
              <div className="main-title">
                <h3 className="title">Nossos Serviços</h3>
                <p className="text-muted">
                  Confira os serviços que oferecemos para você!
                </p>
              </div>
            </div>
            <div className="row mt-5 services">
              <div class="col-md-4 col-sm-12 service">
                <div class="service-box">
                  <div class="service-icon">
                    <i class="fas fa-loveseat"></i>
                  </div>
                  <Link to="/contact" className="service-title">
                    <h3>Financie seu carro</h3>
                  </Link>
                  <div class="service-description">
                    <p>
                      Financie a compra do seu veículo. O carro dos seus sonhos
                      pode ser seu. A gente te ajuda a conseguir.
                    </p>
                  </div>
                </div>
              </div>

              <div class="col-md-4 col-sm-12 service">
                <div class="service-box">
                  <div class="service-icon">
                    <i class="fas fa-car"></i>
                  </div>
                  <Link to="/sell" className="service-title">
                    <h3>Quer vender seu carro?</h3>
                  </Link>
                  <div class="service-description">
                    <p>
                      A maneira mais rápida de vender o seu carro. Velocidade e
                      segurança na hora de negociar.
                    </p>
                  </div>
                </div>
              </div>

              <div class="col-md-4 col-sm-12 service">
                <div class="service-box">
                  <div class="service-icon">
                    <i class="fas fa-envelope"></i>
                  </div>
                  <Link to="/contact" className="service-title">
                    <h3>Quer falar conosco?</h3>
                  </Link>
                  <div class="service-description">
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
