import api from "./api";

export default {
  getStrategies: async (type) => {
    try {
      const { data } = await api.get(`/api/strategies/${type}`);

      return data;
    } catch (ex) {
      console.error("[GET /strategies] > it was not possible to collect data from the api");
    }
  },

  getStatus: async () => {
    try {
      const { data } = await api.get("/api/bot/status");

      return data;
    } catch (ex) {
      console.error("[GET /status] > it was not possible to collect data from the api");
    }
  },

  getStats: async () => {
    try {
      const { data } = await api.get("/api/bot/stats");

      return data;
    } catch (ex) {
      console.error("[GET /stats] > it was not possible to collect data from the api");
    }
  },

  getConfig: async () => {
    try {
      const data = await api.get("/api/config/me");

      return data;
    } catch (ex) {
      console.error("[GET /config/me] > it was not possible to collect data from the api");
    }
  },
};