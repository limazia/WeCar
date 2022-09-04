import { useEffect, useState } from "react";
import { Routes, Navigate, useLocation } from "react-router-dom";
import { parseCookies } from "nookies";
import TopBarProgress from "react-topbar-progress-indicator";

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
      0: "#0000ff",
      0.5: "#0000ff",
      "1.0": "#0000ff",
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

export const Private = ({ children }) => {
  const { "wecar.token": token } = parseCookies();

  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
};
