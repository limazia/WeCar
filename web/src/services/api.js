import axios from "axios";
import { getToken } from "~/utils/auth";

const token = getToken();

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export default api;