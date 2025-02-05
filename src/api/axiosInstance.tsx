import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://67a1b9be5bcfff4fabe339d0.mockapi.io/api",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.log("Unauthorized! Redirecting...");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
