import { api } from "@shared/axios/apiClient";
import { handleRequestError } from "@shared/helpers/handleRequestError";
import { Car } from "@shared/interfaces";

type CarProps = Omit<Car, "car_id">;

export const CarService = {
  list: async function () {
    try {
      const { data } = await api.get("/api/cars");

      return data;
    } catch (ex) {
      handleRequestError("GET /cars");
    }
  },

  create: async function (payload: CarProps) {
    try {
      const { data } = await api.post("/api/cars", payload);

      return data;
    } catch (ex) {
      handleRequestError("POST /cars");
    }
  },

  findByBrandAndModelSlug: async function (brand_slug: string, model_slug: string) {
    try {
      const { data } = await api.get(`/api/cars/b/${brand_slug}/${model_slug}`);

      return data;
    } catch (ex) {
      handleRequestError("GET /cars/b/:brand_slug/:model_slug");
    }
  },

  findByBrandSlug: async function (brand_slug: string) {
    try {
      const { data } = await api.get(`/api/cars/b/${brand_slug}`);

      return data;
    } catch (ex) {
      handleRequestError("GET /cars/b/:brand_slug");
    }
  },

  findById: async function (car_id: string) {
    try {
      const { data } = await api.get(`/api/cars/${car_id}`);

      return data;
    } catch (ex) {
      handleRequestError("GET /cars/:car_id");
    }
  },

  update: async function (car_id: string, payload: CarProps) {
    try {
      const { data } = await api.put(`/api/cars/${car_id}`, payload);

      return data;
    } catch (ex) {
      handleRequestError("PUT /cars/:car_id");
    }
  },

  delete: async function (car_id: string) {
    try {
      const { data } = await api.delete(`/api/cars/${car_id}`);

      return data;
    } catch (ex) {
      handleRequestError("DELETE /cars/:car_id");
    }
  }
};
