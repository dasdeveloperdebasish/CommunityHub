export interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  isInitializing: boolean;

  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
  restoreSession: () => Promise<void>;
}

export interface LoginFormData {
  email: string;
  password: string;
}
