import axios from "axios";

let isDevelopment = false;

export const api = axios.create({
  baseURL: isDevelopment ? import.meta.env.VITE_APP_API_DEVELOPMENT_URL : import.meta.env.VITE_APP_API_URL
});
 