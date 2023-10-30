import { useContext } from "react";

import { ConfigContext } from "@shared/contexts/ConfigContext";

export const useConfig = () => {
  const context = useContext(ConfigContext);

  if (context === undefined) {
    throw new Error("useConfig must be used within an ConfigProvider");
  }

  return context;
};

