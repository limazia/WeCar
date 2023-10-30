import { Car } from "@shared/interfaces";
import { api } from "../axios/apiClient";

interface CarProps {
  car_id?: string;
  brand_slug?: string;
  model_slug?: string;
  payload?: Car;
}

export const CarService = {
  list: async function () {
    try {
      const { data } = await api.get("/api/cars");

      return data;
    } catch (ex) {
      console.error("[GET /cars] > it was not possible to make the request");
    }
  },

  create: async function ({ payload }: CarProps) {
    try {
      const { data } = await api.post("/api/cars", payload);

      return data;
    } catch (ex) {
      console.error("[POST /cars] > it was not possible to make the request");
    }
  },

  findByBrandAndModelSlug: async function ({ brand_slug, model_slug }: CarProps) {
    try {
      const { data } = await api.get(`/api/cars/b/${brand_slug}/${model_slug}`);

      return data;
    } catch (ex) {
      console.error("[GET /cars/b/:brand_slug/:model_slug] > it was not possible to make the request");
    }
  },

  findByBrandSlug: async function (brand_slug: string) {
    try {
      const { data } = await api.get(`/api/cars/b/${brand_slug}`);

      return data;
    } catch (ex) {
      console.error("[GET /cars/b/:brand_slug] > it was not possible to make the request");
    }
  },

  findById: async function ({ car_id }: CarProps) {
    try {
      const { data } = await api.get(`/api/cars/${car_id}`);

      return data;
    } catch (ex) {
      console.error("[GET /cars/:car_id] > it was not possible to make the request");
    }
  },

  update: async function ({ car_id, payload }: CarProps) {
    try {
      const { data } = await api.put(`/api/cars/${car_id}`, payload);

      return data;
    } catch (ex) {
      console.error("[PUT /cars/:car_id] > it was not possible to make the request");
    }
  },

  delete: async function (car_id: string) {
    try {
      const { data } = await api.delete(`/api/cars/${car_id}`);

      return data;
    } catch (ex) {
      console.error("[DELETE /cars/:car_id] > it was not possible to make the request");
    }
  }
};
