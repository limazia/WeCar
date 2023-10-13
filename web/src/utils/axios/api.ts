import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "universal-cookie";


const API_URL = import.meta.env.VITE_API_URL;

export function setupAPIClient() {

  const cookies = new Cookies();

  const token = cookies.get("@wecar.token");

  const api = axios.create({
    baseURL: API_URL,
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  api.interceptors.response.use(
    (response) => {

      return response;
    },
    (error) => {
      if (error.response) {
        const responseData = error.response.data;
        if (responseData.status === "error") {
          toast.error(responseData.message);
        } else if (error.response.status === 401) {
          console.error("logout");
        } else {
          console.error("Ocorreu um erro ao processar sua solicitação.");
        }
      }
      return Promise.reject(error);
    }
  );

  return api;
}
