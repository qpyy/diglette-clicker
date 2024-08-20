import { create } from "zustand";

export const useStore = create((set) => ({
  user: {},
  accessToken: localStorage.getItem("accessToken") || "",
  setUser: (user) => set({ user }),
  setAccessToken: (accessToken) => {
    localStorage.setItem("accessToken", accessToken);
    set({ accessToken });
  },
  logout: () => {
    localStorage.removeItem("accessToken");
    set({ user: {}, accessToken: "", refreshToken: "" });
  },
}));
