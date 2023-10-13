import { useEffect, useState } from "react";
import { Routes, useLocation } from "react-router-dom";
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  useEffect(() => {
    setProgress(false);
  }, [prevLoc]);

  TopBarProgress.config({
    barColors: {
      0: "#2d2d77",
      0.5: "#27277d",
      1.0: "#212183",
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
