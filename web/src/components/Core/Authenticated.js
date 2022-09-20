import { Navigate, useLocation } from "react-router-dom";

import useAuth from "~/utils/hooks/useAuth";

export const Authenticated = ({ children, roles }) => {
  const { user } = useAuth();
  const location = useLocation();

  return user?.permissions.some(
    (permission) => roles?.indexOf(permission) >= 0
  ) ? (
    children
  ) : user ? (
    <Navigate to="/admin" state={{ from: location }} replace />
  ) : (
    <Navigate to="/admin/login" state={{ from: location }} replace />
  );
};