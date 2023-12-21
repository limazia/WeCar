import { api } from "@shared/axios/apiClient";
import { handleRequestError } from "@shared/helpers/handleRequestError";

export const BrandService = {
  list: async function () {
    try {
      const { data } = await api.get("/api/brands");

      return data;
    } catch (ex) {
      handleRequestError("GET /brands");
    }
  },

  create: async function (brand_name: string, brand_slug: string) {
    try {
      const { data } = await api.post("/api/brands", {
        brand_name,
        brand_slug,
      });

      return data;
    } catch (ex) {
      handleRequestError("POST /brands");
    }
  },

  findById: async function (brand_id: string) {
    try {
      const { data } = await api.get(`/api/brands/${brand_id}`);

      return data;
    } catch (ex) {
      handleRequestError("GET /brands/:brand_id");
    }
  },

  update: async function (brand_id: string, brand_name: string, brand_slug: string) {
    try {
      const { data } = await api.put(`/api/brands/${brand_id}`, {
        brand_name,
        brand_slug,
      });

      return data;
    } catch (ex) {
      handleRequestError("PUT /brands/:brand_id");
    }
  },

  delete: async function (brand_id: string) {
    try {
      const { data } = await api.delete(`/api/brands/${brand_id}`);

      return data;
    } catch (ex) {
      handleRequestError("DELETE /brands/:brand_id");
    }
  },
};
