import axios from "axios";
import { baseUrl } from "./apiUrl";

export const axiosInstance=axios.create({
    baseURL:baseUrl
})

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);