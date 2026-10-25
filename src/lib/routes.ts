export const ROUTES = {
  HOME: "/",
  AUTH: {
    ROOT: "/auth",
    LOGIN: (redirectTo?: string) =>
      redirectTo
        ? `/auth/login?redirectTo=${encodeURIComponent(redirectTo)}`
        : "/auth/login",
    REGISTER: (redirectTo?: string) =>
      redirectTo
        ? `/auth/register?redirectTo=${encodeURIComponent(redirectTo)}`
        : "/auth/register",
  },
  DASHBOARD: "/dashboard",
  ACCOUNT: {
    ROOT: "/account",
    ABOUT: "/account/about",
  },
} as const;
