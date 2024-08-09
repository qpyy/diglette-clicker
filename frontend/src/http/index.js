import axios from "axios";
import { useStore } from "../store/useStore";
import { refreshAccessToken } from "../services";

const $api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

$api.interceptors.request.use(
  (config) => {
    const { accessToken } = useStore.getState();

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

$api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const { refreshToken, setAccessToken, logout } = useStore.getState();

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newAccessToken = await refreshAccessToken(refreshToken);

        setAccessToken(newAccessToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return $api(originalRequest);
      } catch (refreshError) {
        logout();
        window.location.href = "/signin";

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default $api;
