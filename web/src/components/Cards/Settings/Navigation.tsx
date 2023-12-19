import { NavLink } from "react-router-dom";
import {
  User,
  IdentificationBadge,
  Envelope,
  Lock,
} from "@phosphor-icons/react";

import { Permission } from "@components/Permission";

export function Navigation() {
  return (
    <div className="card card-settings mb-sm-5 mb-lg-0">
      <div className="card-body">
        <div className="menu">
          <NavLink
            to="/admin/settings/info"
            className={({ isActive }) => (isActive ? "link active" : "link")}
          >
            <User size={20} /> Informações da Conta
          </NavLink>
        </div>

        <Permission required={["update.name"]}>
          <div className="menu pt-3">
            <NavLink
              to="/admin/settings/name"
              className={({ isActive }) => (isActive ? "link active" : "link")}
            >
              <IdentificationBadge size={20} /> Alterar nome
            </NavLink>
          </div>
        </Permission>

        <Permission required={["update.email"]}>
          <div className="menu py-3">
            <NavLink
              to="/admin/settings/email"
              className={({ isActive }) => (isActive ? "link active" : "link")}
            >
              <Envelope size={20} /> Alterar e-mail
            </NavLink>
          </div>
        </Permission>

        <Permission required={["update.password"]}>
          <div className="menu">
            <NavLink
              to="/admin/settings/password"
              className={({ isActive }) => (isActive ? "link active" : "link")}
            >
              <Lock size={20} /> Alterar senha
            </NavLink>
          </div>
        </Permission>
      </div>
    </div>
  );
}
