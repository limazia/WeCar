import { api } from "../axios/apiClient";
import { Config } from "@shared/interfaces";

interface ConfigProps {
  payload?: Config;
}

export const ConfigService = {
  list: async function () {
    try {
      const { data } = await api.get("/api/config");

      return data;
    } catch (ex) {
      console.error("[GET /config] > it was not possible to make the request");
    }
  },

  update: async function ({ payload }: ConfigProps) {
    try {
      const { data } = await api.put("/api/config", payload);

      return data;
    } catch (ex) {
      console.error("[PUT /config/] > it was not possible to make the request");
    }
  },
};
