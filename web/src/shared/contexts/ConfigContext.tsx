import { ReactNode, createContext, useEffect, useState } from "react";

import { ConfigService } from "@shared/services/ConfigService";
import { Config } from "@shared/interfaces";

type ConfigContextData = {
  config: Config | undefined;
  isLoading: boolean;
};

type ConfigProviderProps = {
  children: ReactNode;
};

export const ConfigContext = createContext({} as ConfigContextData);

export function ConfigProvider({ children }: ConfigProviderProps) {
  const [config, setConfig] = useState<Config>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadConfig();

    window.addEventListener("refresh-config", () => loadConfig());

    return () => {
      window.removeEventListener("refresh-config", () => loadConfig());
    };
  }, []);

  async function loadConfig() {
    try {
      const response = await ConfigService.list();

      if (response) {
        setConfig(response);
      }
    } catch (ex) {
      setIsLoading(false);
    }
  }

  return (
    <ConfigContext.Provider
      value={{
        config,
        isLoading,
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
}
