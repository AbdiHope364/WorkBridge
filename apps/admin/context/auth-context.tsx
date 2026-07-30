"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import { api, clearSessionCookie } from "@/lib/api";
import type { User } from "@repo/types/auth";

interface AuthContextValue {
  user: User | null;

  isLoading: boolean;
  isAuthenticated: boolean;

  refreshUser: () => Promise<User | null>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const clearAuth = () => {
    localStorage.removeItem("workbridge_token");
    clearSessionCookie();
    setUser(null);
  };

  const refreshUser = useCallback(async (): Promise<User | null> => {
    try {
      const currentUser = await api.auth.me();

      if (currentUser.role !== "admin") {
        clearAuth();
        return null;
      }

      setUser(currentUser);
      return currentUser;
    } catch (error) {
      console.error(error);
      clearAuth();
      return null;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await api.auth.logout();
    } catch (error) {
      console.error("Logout request failed:", error);
    } finally {
      clearAuth();
      window.location.href = "/login";
    }
  }, []);

  useEffect(() => {
    async function initialize() {
      const token = localStorage.getItem("workbridge_token");

      if (!token) {
        setIsLoading(false);
        return;
      }

      await refreshUser();
      setIsLoading(false);
    }

    initialize();
  }, [refreshUser]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        refreshUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
