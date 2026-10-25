"use client";

import { useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useSyncExternalStore } from "react";
import {
  getGetAuthMeQueryKey,
  useGetAuthMe,
  usePostAuthLogin,
  usePostAuthLogout,
  usePostAuthRegister,
} from "@/generated/api/endpoints";
import type {
  LoginBody,
  RegisterBody,
  UserResponse,
} from "@/generated/api/model";
import {
  clearAccessToken,
  getAccessToken,
  setAccessToken,
  subscribeToken,
} from "@/lib/auth/token-storage";
import { ROUTES } from "@/lib/routes";

function subscribeToAuthStorage(callback: () => void): () => void {
  if (typeof window === "undefined") {
    return () => {};
  }

  const unsubscribeToken = subscribeToken(() => callback());
  const handleStorageChange = () => callback();
  window.addEventListener("storage", handleStorageChange);

  return () => {
    unsubscribeToken();
    window.removeEventListener("storage", handleStorageChange);
  };
}

function getAuthSnapshot(): boolean {
  return Boolean(getAccessToken());
}

function getAuthServerSnapshot(): boolean {
  return false;
}

export function useAuth() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const hasToken = useSyncExternalStore(
    subscribeToAuthStorage,
    getAuthSnapshot,
    getAuthServerSnapshot,
  );

  const meQuery = useGetAuthMe({
    query: {
      enabled: hasToken,
      retry: false,
      staleTime: 5 * 60 * 1000,
    },
  });

  const loginMutation = usePostAuthLogin();
  const registerMutation = usePostAuthRegister();
  const logoutMutation = usePostAuthLogout();

  const login = useCallback(
    async (credentials: LoginBody, redirectTo?: string) => {
      const response = await loginMutation.mutateAsync({ data: credentials });
      setAccessToken(response.accessToken);
      queryClient.setQueryData(getGetAuthMeQueryKey(), response.user);

      const targetDestination =
        redirectTo?.startsWith("/") && !redirectTo.startsWith("//")
          ? redirectTo
          : ROUTES.DASHBOARD;

      router.push(targetDestination);
      return response;
    },
    [loginMutation, queryClient, router],
  );

  const register = useCallback(
    async (data: RegisterBody, redirectTo?: string) => {
      const response = await registerMutation.mutateAsync({ data });
      setAccessToken(response.accessToken);
      queryClient.setQueryData(getGetAuthMeQueryKey(), response.user);

      const targetDestination =
        redirectTo?.startsWith("/") && !redirectTo.startsWith("//")
          ? redirectTo
          : ROUTES.DASHBOARD;

      router.push(targetDestination);
      return response;
    },
    [registerMutation, queryClient, router],
  );

  const logout = useCallback(async () => {
    try {
      await logoutMutation.mutateAsync();
    } catch {
      // Even if server logout fails (e.g. offline), we clear local session
    } finally {
      clearAccessToken();
      queryClient.removeQueries({ queryKey: getGetAuthMeQueryKey() });
      router.push(ROUTES.AUTH.LOGIN());
    }
  }, [logoutMutation, queryClient, router]);

  const parseErrorMessage = useCallback((error: unknown): string => {
    const axiosError = error as AxiosError<{ message?: string }>;
    if (axiosError?.response?.data?.message) {
      return axiosError.response.data.message;
    }
    if (axiosError?.message) {
      return axiosError.message;
    }
    return "An unexpected error occurred. Please try again.";
  }, []);

  return {
    user: (meQuery.data as UserResponse | undefined) ?? null,
    isAuthenticated: hasToken,
    isLoadingUser: meQuery.isLoading,
    isLoggingIn: loginMutation.isPending,
    isRegistering: registerMutation.isPending,
    isLoggingOut: logoutMutation.isPending,
    login,
    register,
    logout,
    parseErrorMessage,
    refetchUser: meQuery.refetch,
  };
}
