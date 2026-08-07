'use client';

import { createContext, useCallback, useContext, ReactNode, useEffect, useState } from 'react';
import { api, clearSessionCookie, setSessionCookie } from '@/lib/api';

type AuthUser = {
  id: string;
  name?: string;
  email: string;
  role: string;
  verified?: boolean;
};

interface AuthContextType {
  user: AuthUser | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  isAuthenticated: boolean;
  refreshUser: () => Promise<AuthUser | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshUser = useCallback(async () => {
    const token = localStorage.getItem('workbridge_token');
    if (!token) {
      setUser(null);
      return null;
    }

    try {
      const currentUser = await api.auth.me() as AuthUser;
      setUser(currentUser);
      return currentUser;
    } catch {
      localStorage.removeItem('workbridge_token');
      clearSessionCookie();
      setUser(null);
      return null;
    }
  }, []);

  useEffect(() => {
    void refreshUser().finally(() => setIsLoading(false));
  }, [refreshUser]);

  const login = async (email: string, password: string) => {
    const session = await api.auth.login({ email, password });
    localStorage.setItem('workbridge_token', session.token);
    setSessionCookie();
    await refreshUser();
  };

  const logout = () => {
    localStorage.removeItem('workbridge_token');
    clearSessionCookie();
    setUser(null);
  };
  
  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading, isAuthenticated: Boolean(user), refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
