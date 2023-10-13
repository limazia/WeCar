import { Link, NavLink } from "react-router-dom";
import {
  MapPin,
  Phone,
  Envelope,
  FacebookLogo,
  InstagramLogo,
} from "@phosphor-icons/react";

import { useAuth } from "@utils/hooks/useAuth";

import { ReactComponent as Logo } from "@assets/logo.svg";
import { ReactComponent as MenuHamburguer } from "@assets/menu.svg";

export function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light navbar-main">
      <Link className="navbar-brand logo m-0 p-0" to="/">
        <Logo />
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#menuMobile"
      >
        <MenuHamburguer />
      </button>
      <div className="collapse navbar-collapse" id="menuMobile">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <NavLink
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
              to="/"
            >
              Comprar
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
              to="/sell"
            >
              Venda seu carro
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
              to="/company"
            >
              Empresa
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
              to="/contact"
            >
              Contato
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export function Utility() {
  return (
    <nav className="navbar-utility d-none d-md-flex">
      <div className="links">
        <a href="#">
          <MapPin size={20} /> Rua das Flores, 123.
        </a>
        <a href="#">
          <Phone size={20} /> (123) 4560-7890
        </a>
        <a href="#">
          <Envelope size={20} /> contato@wecar.com.br
        </a>
      </div>
      <div className="social">
        <a href={import.meta.env.VITE_FACEBOOK_URL} target="_blank" rel="noreferrer">
          <FacebookLogo size={20} />
        </a>

        <a href={import.meta.env.VITE_INSTAGRAM_URL} target="_blank" rel="noreferrer">
          <InstagramLogo size={20} />
        </a>
      </div>
    </nav>
  );
}

export function NavbarAdmin() {
  const { user, logout } = useAuth();

  const permissions = user?.group?.permissions;
  const hasPermission =
    permissions &&
    (permissions.includes("admin") ||
      permissions.some((permission) => ["view_account"].includes(permission)));

  const handleLogout = () => logout();

  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg navbar-admin navbar-light">
        <Link className="navbar-brand" to="/admin">
          <Logo className="img-fluid" />
        </Link>

        <div className="ml-auto menu">
          {hasPermission ? (
            <Link to="/admin/settings/info">
              <span className="username">{user?.name}</span>
            </Link>
          ) : (
            <span className="username">{user?.name}</span>
          )}
          <div className="d-flex align-items-center">
            <small role="button" className="logout" onClick={handleLogout}>
              Sair
            </small>
          </div>
        </div>
      </nav>
    </div>
  );
}
