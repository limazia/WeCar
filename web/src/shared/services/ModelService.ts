import { api } from "@shared/axios/apiClient";
import { handleRequestError } from "@shared/helpers/handleRequestError";

export const ModelService = {
  list: async function () {
    try {
      const { data } = await api.get("/api/models");

      return data;
    } catch (ex) {
      handleRequestError("GET /models");
    }
  },

  create: async function (model_name: string, model_slug: string, id_brand: string) {
    try {
      const { data } = await api.post("/api/models", {
        model_name,
        model_slug,
        id_brand,
      });

      return data;
    } catch (ex) {
      handleRequestError("POST /models");
    }
  },

  findModelsByBrandSlug: async function (brand_slug: string) {
    try {
      const { data } = await api.get(`/api/models/b/${brand_slug}`);

      return data;
    } catch (ex) {
      handleRequestError("GET /models/b/:brand_slug");
    }
  },

  findById: async function (model_id: string) {
    try {
      const { data } = await api.get(`/api/models/${model_id}`);

      return data;
    } catch (ex) {
      handleRequestError("GET /models/:model_id");
    }
  },

  update: async function (model_id: string, model_name: string, model_slug: string, id_brand: string) {
    try {
      const { data } = await api.put(`/api/models/${model_id}`, {
        model_name,
        model_slug,
        id_brand
      });

      return data;
    } catch (ex) {
      handleRequestError("PUT /models/:model_id");
    }
  },

  delete: async function (model_id: string) {
    try {
      const { data } = await api.delete(`/api/models/${model_id}`);

      return data;
    } catch (ex) {
      handleRequestError("DELETE /models/:model_id");
    }
  },
};



