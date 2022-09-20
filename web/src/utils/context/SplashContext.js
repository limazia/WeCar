import { createContext, useEffect, useState } from "react";

import { Loading } from "~/components/Partials/Loading";

export const SplashContext = createContext({});

function SplashProvider({ children }) {
  const [splash, setSplash] = useState(true);

  useEffect(() => {
    setTimeout(() => setSplash(false), 2000);
  }, [splash]);

  if (splash) {
    return <Loading />;
  }

  const value = {
    splash,
    setSplash,
  };

  return (
    <SplashContext.Provider value={value}>{children}</SplashContext.Provider>
  );
}

export default SplashProvider;
