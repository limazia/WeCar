import axios from "axios";
import { getToken } from "~/utils/services/auth";

const token = getToken();

const API_URL = process.env.REACT_APP_API_URL;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const getProfile = async () => {
  try {
    const { data } = await api.get("/api/me/account");

    return data;
  } catch (ex) {
    console.error("[GET /me/account] > it was not possible to wecar from the api");
  }
};

export const getBrands = async () => {
  try {
    const { data } = await api.get("/api/brand");

    return data;
  } catch (ex) {
    console.error("[GET /brand] > it was not possible to wecar from the api");
  }
};

export const getBrandById = async (brand) => {
  try {
    const { data } = await api.get(`/api/brand/${brand}`);

    return data;
  } catch (ex) {
    console.error("[GET /brand/:brand] > it was not possible to wecar from the api");
  }
};

export const getModels = async () => {
  try {
    const { data } = await api.get("/api/model");

    return data;
  } catch (ex) {
    console.error("[GET /model] > it was not possible to wecar from the api");
  }
};

export const getCarByBrand = async (brand, model) => {
  try {
    const data = await api.get(`/api/car/${brand}/${model}`);

    return data;
  } catch (ex) {
    console.error("[GET /car/:brand/:model] > it was not possible to wecar from the api");
  }
};

export const getCars = async () => {
  try {
    const { data } = await api.get("/api/car");

    return data;
  } catch (ex) {
    console.error("[GET /car] > it was not possible to wecar from the api");
  }
};

export const getUsers = async () => {
  try {
    const { data } = await api.get("/api/user");

    return data;
  } catch (ex) {
    console.error("[GET /user] > it was not possible to wecar from the api");
  }
};

export default api;