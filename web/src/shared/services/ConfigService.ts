import { api } from "@shared/axios/apiClient";
import { handleRequestError } from "@shared/helpers/handleRequestError";
import { Config } from "@shared/interfaces";

export const ConfigService = {
  list: async function () {
    try {
      const { data } = await api.get("/api/config");

      return data;
    } catch (ex) {
      handleRequestError("GET /config");
    }
  },

  update: async function (payload: Config) {
    try {
      const { data } = await api.put("/api/config", payload);

      return data;
    } catch (ex) {
      handleRequestError("PUT /config");
    }
  },
};
