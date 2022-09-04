import api from "./api";

export default {
  getBrands: async () => {
    try {
      const { data } = await api.get("/api/brand");

      return data;
    } catch (ex) {
      console.error("[GET /brand] > it was not possible to collect data from the api");
    }
  },

  getBrandById: async (brand) => {
    try {
      const { data } = await api.get(`/api/brand/${brand}`);

      return data;
    } catch (ex) {
      console.error("[GET /brand] > it was not possible to collect data from the api");
    }
  },

  GetModels: async () => {
    try {
      const { data } = await api.get("/api/model");

      return data;
    } catch (ex) {
      console.error("[GET /model] > it was not possible to collect data from the api");
    }
  },

  getCar: async (brand, model) => {
    try {
      const { data } = await api.get(`/api/car/${brand}/${model}`);

      return data;
    } catch (ex) {
      console.error("[GET /car] > it was not possible to collect data from the api");
    }
  },
};