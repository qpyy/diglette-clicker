import { create } from "zustand";
import Cookies from "js-cookie";

export const useStore = create((set) => ({
  user: {},
  accessToken: localStorage.getItem("accessToken") || "",
  refreshToken: Cookies.get("refreshToken") || "",
  setUser: (user) => set({ user }),
  setAccessToken: (accessToken) => {
    localStorage.setItem("accessToken", accessToken);
    set({ accessToken });
  },
  setRefreshToken: (refreshToken) => {
    Cookies.set("refreshToken", refreshToken);
    set({ refreshToken });
  },
  logout: () => {
    localStorage.removeItem("accessToken");
    Cookies.remove("refreshToken");
    set({ user: {}, accessToken: "", refreshToken: "" });
  },
}));
