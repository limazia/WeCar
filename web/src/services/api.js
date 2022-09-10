import axios from "axios";
import { getToken } from "~/utils/auth";

const token = getToken();

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

api.interceptors.request.use((config) => {
  config.headers['request-startTime'] = new Date().getTime();
  return config
})

api.interceptors.response.use((response) => {
  const currentTime = new Date().getTime()      
  const startTime = response.config.headers['request-startTime']      
  response.headers['request-duration'] = currentTime - startTime      
  return response
})

export default api;