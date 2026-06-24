import { create } from "zustand";
import { authStorage } from "../services/authStorage";
import { AuthState } from "../types/auth";

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  isAuthenticated: false,
  isInitializing: true,

  login: async (token: string) => {
    await authStorage.saveToken(token);

    set({
      token,
      isAuthenticated: true,
    });
  },

  logout: async () => {
    await authStorage.removeToken();

    set({
      token: null,
      isAuthenticated: false,
    });
  },

  restoreSession: async () => {
    try {
      const token = await authStorage.getToken();

      set({
        token,
        isAuthenticated: Boolean(token),
        isInitializing: false,
      });
    } catch {
      set({
        token: null,
        isAuthenticated: false,
        isInitializing: false,
      });
    }
  },
}));
