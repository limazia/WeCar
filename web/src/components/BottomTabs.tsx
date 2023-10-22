import { NavLink } from "react-router-dom";
import { Disc, Car, Cards, Archive, Users, Gear } from "@phosphor-icons/react";
import { ReactNode } from "react";

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
  return (
    <nav className="navigation-bar d-sm-block d-lg-none">
      <ul className="list-items">
        <li className="item">
          <Link className="link" to="/admin/brands">
            <Disc size={32} />
          </Link>
        </li>
        <li className="item">
          <Link className="link" to="/admin/models">
            <Cards size={32} />
          </Link>
        </li>
        <li className="item">
          <Link className="link" to="/admin/cars">
            <Car size={32} />
          </Link>
        </li>
        <li className="item">
          <Link className="link" to="/admin/groups">
            <Archive size={32} />
          </Link>
        </li>
        <li className="item">
          <Link className="link" to="/admin/users">
            <Users size={32} />
          </Link>
        </li>
        <li className="item">
          <Link className="link" to="/admin/settings/info">
            <Gear size={32} />
          </Link>
        </li>
      </ul>
    </nav>
  );
}
