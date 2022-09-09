import { useEffect, useState } from "react";
import { Routes, Navigate, useLocation } from "react-router-dom";
import TopBarProgress from "react-topbar-progress-indicator";

import useAuth from "~/hooks/useAuth";
import { getToken } from "./auth";

export const CustomRoutes = ({ children }) => {
  const [progress, setProgress] = useState(false);
  const [prevLoc, setPrevLoc] = useState("");
  const location = useLocation();

  useEffect(() => {
    setPrevLoc(location.pathname);
    setProgress(true);
    if (location.pathname === prevLoc) {
      setPrevLoc("");
    }
  }, [location]);

  useEffect(() => {
    setProgress(false);
  }, [prevLoc]);

  TopBarProgress.config({
    barColors: {
      0: "#2d2d77",
      0.5: "#27277d",
      "1.0": "#212183",
    },
  });

  return (
    <>
      {progress && <TopBarProgress />}
      <Routes key={location.pathname} location={location}>
        {children}
      </Routes>
    </>
  );
};

export const Private = ({ children, unique, roles }) => {
  const { user } = useAuth();
  const token = getToken();
  const location = useLocation();
  /*
  const userHasRequiredRole =
    user && permissions.some((permission) => roles.indexOf(permission) >= 0)
      ? true
      : false;

  if (!token) {
    return <Navigate to="/admin/login" state={{ from: location }} />;
  }

  if (token && !userHasRequiredRole) {
    return <Navigate to="/admin" state={{ from: location }} />;
  }

  if (!token) {
    return <Navigate to="/admin/login" state={{ from: location }} />;
  } 
  */

  return unique ? (
    children
  ) : user?.permissions.some(
      (permission) => roles?.indexOf(permission) >= 0
    ) ? (
    children
  ) : token ? (
    <Navigate to="/admin/" state={{ from: location }} replace />
  ) : (
    <Navigate to="/admin/login" state={{ from: location }} replace />
  );
};
