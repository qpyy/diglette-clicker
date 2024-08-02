import create from "zustand";

export const useStore = create((set) => ({
  user: null,
  token: "",
  setUser: (user) => set({ user }),
  setToken: (token) => set({ token }),
  logout: () => set({ user: null, token: "" }),
}));
