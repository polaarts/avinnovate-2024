// hooks/useAuth.js
import { create } from "zustand";

const useAuthStore = create((set) => ({
  accessToken: null,
  isAuthenticated: false,
  setAuth: (token) => set({ accessToken: token, isAuthenticated: true }),
  logout: () => set({ accessToken: null, isAuthenticated: false }),
}));

export default useAuthStore;
