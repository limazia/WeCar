import axios from "axios";
import { getToken } from "~/utils/services/auth";

const token = getToken();

const API_URL = process.env.REACT_APP_API_URL;
const API_IBGE_URL = "https://servicodados.ibge.gov.br/api/v1/";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

const ibge = axios.create({
  baseURL: API_IBGE_URL,
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

export const getBrandByBrand = async (brand) => {
  try {
    const { data } = await api.get(`/api/brand/brands/${brand}`);

    return data;
  } catch (ex) {
    console.error("[GET /brand/:brand] > it was not possible to wecar from the api");
  }
};

export const getBrandById = async (brand_id) => {
  try {
    const { data } = await api.get(`/api/brand/${brand_id}`);

    return data;
  } catch (ex) {
    console.error("[GET /brand/:brand_id] > it was not possible to wecar from the api");
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

export const getModelById = async (modeL_id) => {
  try {
    const { data } = await api.get(`/api/model/${modeL_id}`);

    return data;
  } catch (ex) {
    console.error("[GET /model/:modeL_id] > it was not possible to wecar from the api");
  }
};
 
export const getCarByBrand = async (brand, model) => {
  try {
    const { data } = await api.get(`/api/car/${brand}/${model}`);

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

export const getCarById = async (car_id) => {
  try {
    const { data } = await api.get(`/api/car/${car_id}`);

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

export const getUserById = async (id) => {
  try {
    const { data } = await api.get(`/api/user/${id}`);

    return data;
  } catch (ex) {
    console.error("[GET /brand/:user] > it was not possible to wecar from the api");
  }
};

export const getCities = async (state) => {
  try {
    const response = ibge.get(`localidades/estados/${state}/municipios`);

    return response;
  } catch (ex) {
    console.error(ex);
  }
};

export const getUfs = async () => {
  try {
    const response = ibge.get("localidades/estados?orderBy=nome");

    return response;
  } catch (ex) {
    console.error(ex);
  }
};

export default api;