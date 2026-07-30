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

  refreshUser: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshUser = useCallback(async () => {
    const currentUser = await api.auth.me();
    setUser(currentUser);
  }, []);

  const logout = useCallback(async () => {
    try {
      await api.auth.logout();
    } catch (error) {
      console.error("Logout request failed:", error);
    } finally {
      localStorage.removeItem("workbridge_token");

      clearSessionCookie();

      setUser(null);

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

      try {
        const currentUser = await api.auth.me();
        setUser(currentUser);
      } catch (error) {
        console.error(error);

        localStorage.removeItem("workbridge_token");
        clearSessionCookie();

        setUser(null);
      } finally {
        setIsLoading(false);
      }
    }

    initialize();
  }, []);

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
