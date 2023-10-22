import { ReactNode } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  Disc,
  Car,
  Cards,
  Archive,
  Users,
  DotsThree,
} from "@phosphor-icons/react";

import { useAuth } from "@utils/hooks/useAuth";

import { Permission } from "./Permission";

import { ReactComponent as Logo } from "@assets/logo.svg";

interface LinkProps {
  children: ReactNode;
  className: string;
  to: string;
}

function LinkActive({ children, className, to = "/" }: LinkProps) {
  return (
    <NavLink
      className={({ isActive }) =>
        isActive ? `${className} active` : className
      }
      to={to}
    >
      {children}
    </NavLink>
  );
}

export function Sidebar() {
  const { user, logout } = useAuth();

  const handleLogout = () => logout();

  return (
    <div className="sidebar">
      <div className="sidebar-container">
        <div>
          <div className="d-flex justify-content-center">
            <Link to="/admin">
              <Logo className="logo img-fluid" />
            </Link>
          </div>

          <Permission
            required={[
              "brands.list",
              "models.list",
              "cars.list",
              "groups.list",
              "users.list",
            ]}
          >
            <ul className="list-items">
              <Permission required={["brands.list"]}>
                <li className="item">
                  <LinkActive className="link" to="/admin/brands">
                    <Disc size={20} /> <span>Marcas</span>
                  </LinkActive>
                </li>
              </Permission>

              <Permission required={["models.list"]}>
                <li className="item">
                  <LinkActive className="link" to="/admin/models">
                    <Cards size={20} /> <span>Modelos</span>
                  </LinkActive>
                </li>
              </Permission>

              <Permission required={["cars.list"]}>
                <li className="item">
                  <LinkActive className="link" to="/admin/cars">
                    <Car size={20} /> <span>Carros</span>
                  </LinkActive>
                </li>
              </Permission>

              <Permission required={["groups.list"]}>
                <li className="item">
                  <LinkActive className="link" to="/admin/groups">
                    <Archive size={20} /> <span>Grupos</span>
                  </LinkActive>
                </li>
              </Permission>

              <Permission required={["users.list"]}>
                <li className="item">
                  <LinkActive className="link" to="/admin/users">
                    <Users size={20} /> <span>Usuários</span>
                  </LinkActive>
                </li>
              </Permission>
            </ul>
          </Permission>
        </div>

        <div className="user">
          <strong>{user?.name}</strong>

          <div className="dropdown">
            <DotsThree
              size={25}
              id="dropdownMenuButton"
              data-toggle="dropdown"
            />

            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <Permission required={["view.account"]}>
                <Link className="dropdown-item" to="/admin/settings/info">
                  Minha conta
                </Link>
              </Permission>

              <a
                className="dropdown-item logout"
                href="#"
                onClick={handleLogout}
              >
                Sair
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
