import { Link } from "react-router-dom";

import useAuth from "~/utils/hooks/useAuth";

import { ReactComponent as Logo } from "~/assets/logo.svg";
import { ReactComponent as MenuHamburguer } from "~/assets/menu.svg";

export function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-main navbar-light bg-white">
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
              Comprar
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/sell">
              Venda seu carro
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/company">
              Empresa
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/contact">
              Contato
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export function Utility() {
  return (
    <nav className="navbar navbar-expand-lg navbar-utility navbar-light bg-white d-none d-lg-flex">
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
          <a href="https://www.facebook.com/" target="_blank" rel="noreferrer">
            <i className="fab fa-facebook-f mr-4"></i>
          </a>
        </li>
        <li className="nav-item">
          <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
            <i className="fab fa-instagram"></i>
          </a>
        </li>
      </ul>
    </nav>
  );
}

export function HeaderAdmin() {
  const { user, logout } = useAuth();

  const href = "#";

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg navbar-admin navbar-light">
        <Link className="navbar-brand" to="/admin">
          <Logo className="img-fluid ml-3" />
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
          <MenuHamburguer className="img-fluid" />
        </button>
        <div className="collapse navbar-collapse" id="menuMobile">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item dropdown dropdown-menu-right">
              <Link
                className="nav-link dropdown-toggle"
                to={href}
                id="navbarDropdownMenuLink"
                data-toggle="dropdown"
              >
                <span className="username">{user?.name}</span>
              </Link>
              <div className="dropdown-menu">
                <Link className="dropdown-item" to="/admin/settings">
                  <i className="far fa-user"></i> Conta
                </Link>
                <hr className="dropdown-divider" />
                <button className="dropdown-item logout" onClick={handleLogout}>
                  <i className="fas fa-power-off"></i> Sair
                </button>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
