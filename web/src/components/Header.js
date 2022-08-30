import { Link } from "react-router-dom";
import { Logo } from "./Images/Logos";

export function Header() {
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-utility navbar-light bg-light d-none d-lg-flex">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <a className="nav-link" href="#">
              <i className="fas fa-map-marker-alt"></i> Rua dos Pinheiros, 248.
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link mx-3" href="#">
              <i className="fas fa-phone"></i> (19) xxxx-xxxx
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              <i className="fas fa-envelope"></i> contato@wecar.com.br
            </a>
          </li>
        </ul>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <a href="https://www.facebook.com/" target="_blank">
              <i className="fab fa-facebook-f mr-3"></i>
            </a>
          </li>
          <li className="nav-item">
            <a href="https://www.instagram.com/" target="_blank">
              <i className="fab fa-instagram"></i>
            </a>
          </li>
        </ul>
      </nav>
      <nav className="navbar navbar-expand-lg navbar-main navbar-light bg-light">
        <Link className="navbar-brand logo m-0 p-0" to="/">
          <Logo />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#menuMobile"
          aria-controls="menuMobile"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="menuMobile">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Inicio
              </Link>
            </li>
            <li className="nav-item">
            <Link className="nav-link" to="/company">
                Empresa
            </Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Estoque
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Venda seu carro
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Contato
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
