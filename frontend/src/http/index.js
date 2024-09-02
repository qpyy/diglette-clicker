import axios from "axios";
import { useStore } from "../store/useStore";
import { refreshTokenService } from "../services";

const $api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
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
    originalRequest._retry = false;
    const { setAccessToken, logout } = useStore.getState();

    if (error.response.data.status === 403.7 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newAccessToken = await refreshTokenService();

        setAccessToken(newAccessToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return $api(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    if (error.response.data.status === 403.13) {
      logout();
      window.location.href = "/signin";
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

export default $api;
