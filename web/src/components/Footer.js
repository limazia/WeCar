export function Footer() {
  return (
    <footer>
      <section className="container-fluid">
        <div className="row bg-dark">
          <div className="container" style={{ height: "233px" }}>
            <div className="row d-flex justify-content-between flex-column">
              <div className="col-md-12 text-center">
                <div className="social">
                  <a href="https://www.facebook.com/" target="_blank">
                    <i className="fab fa-facebook-f mr-3"></i>
                  </a>
                  <a href="https://www.instagram.com/" target="_blank">
                    <i className="fab fa-instagram"></i>
                  </a>
                </div>
                <span>
                  <a href="tel:123456789"> (19) xxxx-xxxx</a>
                </span>
                <span className="mx-4">
                  <a
                    href="http://api.whatsapp.com/send?phone=551999999999"
                    target="_blank"
                  >
                    (19) xxxx-xxxx
                  </a>
                </span>
                <span>
                  <a href="/contato">contato@wecar.com.br</a>
                </span>
                <p>
                  <a href="#" target="_blank">
                    Rua dos Pinheiros, 248 - São Paulo - SP
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="container">
          <div className="row d-flex justify-content-between align-items-center pt-3 pb-3">
            <p className="mb-0 d-md-block">
              {new Date().getFullYear()} - Todos os direitos reservados
            </p>
            <p className="mb-0">
              Criado com <i className="fas fa-heart text-danger"></i> por{" "}
              <b>Grupo 01</b>
            </p>
          </div>
        </div>
      </section>
    </footer>
  );
}
