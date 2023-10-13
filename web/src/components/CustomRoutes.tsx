import { ReactNode, useEffect, useState } from "react";
import { Routes, useLocation } from "react-router-dom";
import TopBarProgress from "react-topbar-progress-indicator";

export const CustomRoutes = ({ children }: { children: ReactNode }) => {
  const [progress, setProgress] = useState<boolean>(false);
  const [prevLocation, setPrevLocation] = useState<string>("");
  const location = useLocation();

  useEffect(() => {
    setProgress(true);
    setPrevLocation(location.pathname);
  }, [location]);

  useEffect(() => {
    if (prevLocation === location.pathname) {
      setProgress(false);
      setPrevLocation("");
    }
  }, [prevLocation, location.pathname]);

  TopBarProgress.config({
    barColors: {
      0: "#2F23CF",
      0.5: "#D94BB1",
      1.0: "#04000F",
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
