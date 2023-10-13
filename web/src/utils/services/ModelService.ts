import { api } from "../axios/apiClient";

interface ModelProps {
  model_id?: string;
  model_name?: string;
  model_slug?: string;
  brand_slug?: string;
  id_brand?: string;
}

export const ModelService = {
  list: async function () {
    try {
      const { data } = await api.get("/api/models");

      return data;
    } catch (ex) {
      console.error("[GET /models] > it was not possible to make the request");
    }
  },

  create: async function ({ model_name, model_slug, id_brand }: ModelProps) {
    try {
      const { data } = await api.post("/api/models", {
        model_name,
        model_slug,
        id_brand,
      });

      return data;
    } catch (ex) {
      console.error("[POST /models] > it was not possible to make the request");
    }
  },

  findModelsByBrandSlug: async function ({ brand_slug }: ModelProps) {
    try {
      const { data } = await api.get(`/api/models/b/${brand_slug}`);

      return data;
    } catch (ex) {
      console.error("[GET /models/b/:brand_slug] > it was not possible to make the request");
    }
  },

  findById: async function ({ model_id }: ModelProps) {
    try {
      const { data } = await api.get(`/api/models/${model_id}`);

      return data;
    } catch (ex) {
      console.error("[GET /models/:model_id] > it was not possible to make the request");
    }
  },

  update: async function ({ model_id, model_name, model_slug, id_brand }: ModelProps) {
    try {
      const { data } = await api.put(`/api/models/${model_id}`, {
        model_name,
        model_slug,
        id_brand
      });

      return data;
    } catch (ex) {
      console.error("[PUT /models/:model_id] > it was not possible to make the request");
    }
  },

  delete: async function ({ model_id }: ModelProps) {
    try {
      const { data } = await api.delete(`/api/models/${model_id}`);

      return data;
    } catch (ex) {
      console.error("[DELETE /models/:model_id] > it was not possible to make the request");
    }
  },
};



