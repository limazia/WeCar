import { Link } from "react-router-dom";

import { ReactComponent as Logo } from "~/assets/logo.svg";

export function Footer() {
  const company = process.env.REACT_APP_NAME;
  const year = new Date().getFullYear();

  return (
    <footer className="footer-main">
      <div className="container-fluid py-5 footer-utility">
        <div className="row py-4">
          <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
            <Logo className="img-fluid" />
            <p className="text-muted ml-3">
              Plataforma que facilita a <br /> busca pelo novo automóvel
            </p>
          </div>
          <div className="col-lg-2 col-md-6 mb-4 mb-lg-0">
            <h6 className="font-weight-bold mb-4">Menu Principal</h6>
            <ul className="list-unstyled mb-0">
              <li className="mb-2">
                <Link to="/company">Empresa</Link>
              </li>
              <li className="mb-2">
                <a href="#">Termos de uso</a>
              </li>
            </ul>
          </div>
          <div className="col-lg-2 col-md-6 mb-4 mb-lg-0">
            <h6 className="font-weight-bold mb-4">Serviços</h6>
            <ul className="list-unstyled mb-0">
              <li className="mb-2">
                <Link to="/">Comprar</Link>
              </li>
              <li className="mb-2">
                <Link to="/sell">Venda seu carro</Link>
              </li>
            </ul>
          </div>
          <div className="col-lg-2 col-md-6 mb-4 mb-lg-0">
            <h6 className="font-weight-bold mb-4">Administração</h6>
            <ul className="list-unstyled mb-0">
              <li className="mb-2">
                <Link to="/admin/">Fazer login</Link>
              </li>
            </ul>
          </div>
          <div className="col-lg-2 col-md-6 mb-4 mb-lg-0">
            <h6 className="font-weight-bold mb-4">Siga-nos</h6>
            <ul className="list-inline mt-4">
              <li className="list-inline-item">
                <a
                  href="https://www.facebook.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="fab fa-facebook-f mr-3"></i>
                </a>
              </li>
              <li className="list-inline-item">
                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="fab fa-instagram"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-divider" />
      <div className="bg-white py-4">
        <div className="container-fluid">
          <p className="copyright mb-0 py-2">
            © {year} {company}. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
