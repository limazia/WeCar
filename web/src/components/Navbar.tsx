import { Link, NavLink } from "react-router-dom";
import {
  MapPin,
  Phone,
  Envelope,
  FacebookLogo,
  InstagramLogo,
  SignOut,
} from "@phosphor-icons/react";

import { useAuth } from "@shared/hooks/useAuth";

import { ReactComponent as Logo } from "@assets/logo.svg";
import { ReactComponent as MenuHamburguer } from "@assets/menu.svg";
import { useConfig } from "@shared/hooks/useConfig";

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
  const { config } = useConfig();

  const address = config?.address;
  const telephone = config?.telephone;
  const email = config?.email;

  const facebook = `https://www.facebook.com/${config?.facebook}`;
  const instagram = `https://www.instagram.com/${config?.instagram}`;

  return (
    <nav className="navbar-utility d-none d-md-flex">
      <div className="links">
        <a href="#">
          <MapPin size={20} /> {address}
        </a>
        <a href="#">
          <Phone size={20} /> {telephone}
        </a>
        <a href="#">
          <Envelope size={20} /> {email}
        </a>
      </div>
      <div className="social">
        <a
          href={facebook}
          target="_blank"
          rel="noreferrer"
        >
          <FacebookLogo size={20} />
        </a>

        <a
          href={instagram}
          target="_blank"
          rel="noreferrer"
        >
          <InstagramLogo size={20} />
        </a>
      </div>
    </nav>
  );
}

export function NavbarAdmin() {
  const { user, logout } = useAuth();

  const permissions = user?.permissions;
  const hasPermission =
    permissions &&
    (permissions.includes("admin") ||
      permissions.some((permission) => ["view.account"].includes(permission)));

  const handleLogout = () => logout();

  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg navbar-admin navbar-light">
        <Link className="navbar-brand d-sm-block d-lg-none" to="/admin">
          <Logo className="img-fluid" />
        </Link>

        <div className="mr-auto d-sm-none d-lg-block">
          <Link to="/">Voltar para aplicação</Link>
        </div>

        <div className="ml-auto">
          <div className="info">
            <div className="user">
              <div className="user-info">
                {hasPermission ? (
                  <Link to="/admin/settings/info">
                    <span className="name">{user?.name}</span>
                  </Link>
                ) : (
                  <span className="name">{user?.name}</span>
                )}
                <small className="text-muted">{user?.email}</small>
              </div>
            </div>

            <span role="button" className="logout" onClick={handleLogout}>
              <SignOut size={20} />
            </span>
          </div>
        </div>
      </nav>
    </div>
  );
}
