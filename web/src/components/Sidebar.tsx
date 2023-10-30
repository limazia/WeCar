import { ReactNode } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  House,
  Tag,
  Car,
  Cards,
  ShieldStar,
  Users,
  Gear,

} from "@phosphor-icons/react";

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
  return (
    <div className="sidebar">
      <div className="d-flex justify-content-center">
        <Link to="/admin/">
          <Logo className="logo img-fluid" />
        </Link>
      </div>

      <Permission
        required={[
          "dashboard",
          "brands.list",
          "models.list",
          "cars.list",
          "users.list",
          "groups.list",
          "settings.view",
        ]}
      >
        <ul className="list-items">
          <Permission
            required={[
              "dashboard",
              "brands.list",
              "models.list",
              "cars.list",
              "users.list",
            ]}
          >
            <div className="group">
              <div className="label">Geral</div>
              <Permission required={["dashboard"]}>
                <li className="item">
                  <LinkActive className="link" to="/admin/">
                    <House size={20} /> <span>Dashboard</span>
                  </LinkActive>
                </li>
              </Permission>

              <Permission required={["brands.list"]}>
                <li className="item">
                  <LinkActive className="link" to="/admin/brands">
                    <Tag size={20} /> <span>Marcas</span>
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

              <Permission required={["users.list"]}>
                <li className="item">
                  <LinkActive className="link" to="/admin/users">
                    <Users size={20} /> <span>Usuários</span>
                  </LinkActive>
                </li>
              </Permission>
            </div>
          </Permission>

          <Permission required={["groups.list", "settings.view"]}>
            <div className="group">
              <div className="label">Administração</div>
              <Permission required={["groups.list"]}>
                <li className="item">
                  <LinkActive className="link" to="/admin/groups">
                    <ShieldStar size={20} /> <span>Grupos de permissões</span>
                  </LinkActive>
                </li>
              </Permission>

              <Permission required={["settings.view"]}>
                <li className="item">
                  <LinkActive className="link" to="/admin/settings/web">
                    <Gear size={20} /> <span>Configurações</span>
                  </LinkActive>
                </li>
              </Permission>
            </div>
          </Permission>
        </ul>
      </Permission>
    </div>
  );
}
