"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { api, setAuthToken, clearAuthToken, getAuthToken } from "@/lib/api";
import type { User } from "@repo/types/auth";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  refreshUser: () => Promise<void>;
  login: (email: string, password: string) => Promise<{ token: string }>;
  logout: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshUser = async () => {
    try {
      const token = getAuthToken();
      if (!token) {
        setUser(null);
        return;
      }

      const response = await api.auth.me();
      setUser(response);
    } catch (error) {
      console.error("Failed to refresh user:", error);
      if (error instanceof Error && 
          (error.message.includes("Authorization") || 
           error.message.includes("token") ||
           error.message.includes("401"))) {
        clearAuthToken();
        setUser(null);
      }
    }
  };

  const login = async (email: string, password: string) => {
    const response = await api.auth.login({ email, password });
    const { token } = response;

    setAuthToken(token);
    await refreshUser();

    return { token };
  };

  const logout = async () => {
    try {
      await api.auth.logout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      clearAuthToken();
      setUser(null);
    }
  };

  const forgotPassword = async (email: string) => {
    await api.auth.forgotPassword({ email });
  };

  const resetPassword = async (token: string, password: string) => {
    await api.auth.resetPassword({ token, password });
  };

  useEffect(() => {
    refreshUser().finally(() => setIsLoading(false));
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        refreshUser,
        login,
        logout,
        forgotPassword,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
