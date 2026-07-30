"use client";

import { useAuth } from "@/contexts/auth-context";

export function useCurrentUser() {
  const { user, isLoading, isAuthenticated } = useAuth();

  return {
    user,
    isLoading,
    isAuthenticated,
  };
}
