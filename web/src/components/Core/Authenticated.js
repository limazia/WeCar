import { Navigate, Outlet, useLocation } from "react-router-dom";

import useAuth from "~/utils/hooks/useAuth";
import { getToken } from "~/utils/services/auth";

export const Authenticated = ({ children }) => {
  const location = useLocation();

  if (getToken()) return <>{children}</>;

  return <Navigate to="/admin/login" state={{ from: location }} replace />;
};

export const Private = ({ children, roles }) => {
  const { user } = useAuth();

  //return user?.permissions.find(element => roles.includes(element)) ? (
  return user?.permissions.some(
    (permission) => roles?.indexOf(permission) >= 0
  ) ? (
    <>{children}</>
  ) : (
    <Outlet />
  );
};
