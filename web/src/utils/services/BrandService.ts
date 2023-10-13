import { api } from "../axios/apiClient";

interface BrandProps {
  brand_id?: string;
  brand_name?: string;
  brand_slug?: string;
}

export const BrandService = {
  list: async function () {
    try {
      const { data } = await api.get("/api/brands");

      return data;
    } catch (ex) {
      console.error("[GET /brands] > it was not possible to make the request");
    }
  },

  create: async function ({ brand_name, brand_slug }: BrandProps) {
    try {
      const { data } = await api.post("/api/brands", {
        brand_name,
        brand_slug,
      });

      return data;
    } catch (ex) {
      console.error("[POST /brands] > it was not possible to make the request");
    }
  },

  findById: async function ({ brand_id }: BrandProps) {
    try {
      const { data } = await api.get(`/api/brands/${brand_id}`);

      return data;
    } catch (ex) {
      console.error("[GET /brands/:brand_id] > it was not possible to make the request");
    }
  },

  update: async function ({ brand_id, brand_name, brand_slug }: BrandProps) {
    try {
      const { data } = await api.put(`/api/brands/${brand_id}`, {
        brand_name,
        brand_slug,
      });

      return data;
    } catch (ex) {
      console.error("[PUT /brands/:brand_id] > it was not possible to make the request");
    }
  },

  delete: async function ({ brand_id }: BrandProps) {
    try {
      const { data } = await api.delete(`/api/brands/${brand_id}`);

      return data;
    } catch (ex) {
      console.error("[DELETE /brands/:brand_id] > it was not possible to make the request");
    }
  },
};
