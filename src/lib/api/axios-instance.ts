import axios, {
  type AxiosError,
  type AxiosInstance,
  type InternalAxiosRequestConfig,
} from "axios";
import {
  clearAccessToken,
  getAccessToken,
  setAccessToken,
} from "@/lib/auth/token-storage";
import { env } from "@/lib/config/env";
import { ROUTES } from "@/lib/routes";

interface CustomInternalRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

let isRefreshing = false;
let refreshSubscribers: Array<(token: string) => void> = [];
let refreshFailureSubscribers: Array<(error: unknown) => void> = [];

function subscribeTokenRefresh(
  onSuccess: (token: string) => void,
  onError: (error: unknown) => void,
): void {
  refreshSubscribers.push(onSuccess);
  refreshFailureSubscribers.push(onError);
}

function notifyRefreshSuccess(newToken: string): void {
  for (const subscriber of refreshSubscribers) {
    subscriber(newToken);
  }
  refreshSubscribers = [];
  refreshFailureSubscribers = [];
}

function notifyRefreshFailure(error: unknown): void {
  for (const subscriber of refreshFailureSubscribers) {
    subscriber(error);
  }
  refreshSubscribers = [];
  refreshFailureSubscribers = [];
}

function handleAutoLogout(): void {
  clearAccessToken();

  if (typeof window !== "undefined") {
    const currentPath = window.location.pathname + window.location.search;
    const isAuthPage = currentPath.startsWith("/auth");
    const loginUrl = isAuthPage
      ? "/auth/login"
      : ROUTES.AUTH.LOGIN(currentPath);

    if (
      window.location.pathname !== "/auth/login" &&
      window.location.pathname !== "/auth"
    ) {
      window.location.href = loginUrl;
    }
  }
}

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: env.API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: unknown) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as
      | CustomInternalRequestConfig
      | undefined;

    if (!originalRequest) {
      return Promise.reject(error);
    }

    const is401 = error.response?.status === 401;
    const requestUrl = originalRequest.url || "";
    const isAuthRefresh = requestUrl.includes("/auth/refresh");
    const isAuthLoginOrRegister =
      requestUrl.includes("/auth/login") ||
      requestUrl.includes("/auth/register");

    if (!is401 || isAuthLoginOrRegister) {
      return Promise.reject(error);
    }

    if (isAuthRefresh) {
      handleAutoLogout();
      return Promise.reject(error);
    }

    if (originalRequest._retry) {
      handleAutoLogout();
      return Promise.reject(error);
    }

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        subscribeTokenRefresh(
          (newToken: string) => {
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            resolve(axiosInstance(originalRequest));
          },
          (refreshErr: unknown) => {
            reject(refreshErr);
          },
        );
      });
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      const response = await axiosInstance.post<{
        accessToken: string;
        user: unknown;
      }>("/auth/refresh");

      const { accessToken } = response.data;
      setAccessToken(accessToken);

      notifyRefreshSuccess(accessToken);
      isRefreshing = false;

      originalRequest.headers.Authorization = `Bearer ${accessToken}`;
      return axiosInstance(originalRequest);
    } catch (refreshError) {
      isRefreshing = false;
      notifyRefreshFailure(refreshError);
      handleAutoLogout();
      return Promise.reject(refreshError);
    }
  },
);
