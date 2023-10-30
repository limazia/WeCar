import { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import {
  House,
  Tag,
  Car,
  Cards,
  ShieldStar,
  Users,
  Gear,
  SignOut,
} from "@phosphor-icons/react";

import { useAuth } from "@shared/hooks/useAuth";

import { Permission } from "./Permission";

interface LinkProps {
  children: ReactNode;
  className: string;
  to: string;
}

function Link({ children, className, to = "/" }: LinkProps) {
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

export function BottomTabs() {
  const { user, logout } = useAuth();

  const permissions = user?.permissions;
  const hasPermission =
    permissions &&
    (permissions.includes("admin") ||
      permissions.some((permission) => ["view.account"].includes(permission)));

  const handleLogout = () => logout();

  return (
    <Permission
      required={[
        "dashboard",
        "brands.list",
        "models.list",
        "cars.list",
        "groups.list",
        "users.list",
      ]}
    >
      <nav className="navigation-bar d-sm-block d-lg-none">
        <ul className="list-items">
          <Permission required={["dashboard"]}>
            <li className="item">
              <Link className="link" to="/admin/">
                <House size={32} />
              </Link>
            </li>
          </Permission>

          <Permission required={["brands.list"]}>
            <li className="item">
              <Link className="link" to="/admin/brands">
                <Tag size={32} />
              </Link>
            </li>
          </Permission>

          <Permission required={["models.list"]}>
            <li className="item">
              <Link className="link" to="/admin/models">
                <Cards size={32} />
              </Link>
            </li>
          </Permission>

          <Permission required={["cars.list"]}>
            <li className="item">
              <Link className="link" to="/admin/cars">
                <Car size={32} />
              </Link>
            </li>
          </Permission>

          <Permission required={["groups.list"]}>
            <li className="item">
              <Link className="link" to="/admin/groups">
                <ShieldStar size={32} />
              </Link>
            </li>
          </Permission>

          <Permission required={["users.list"]}>
            <li className="item">
              <Link className="link" to="/admin/users">
                <Users size={32} />
              </Link>
            </li>
          </Permission>

          {hasPermission ? (
            <li className="item">
              <Link className="link" to="/admin/settings/info">
                <Gear size={32} />
              </Link>
            </li>
          ) : (
            <li className="item">
              <span className="link" onClick={handleLogout}>
                <SignOut size={32} />
              </span>
            </li>
          )}
        </ul>
      </nav>
    </Permission>
  );
}
