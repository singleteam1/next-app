import { ACCESS_TOKEN_COOKIE, DEFAULT_TTL_SECONDS } from "@/lib/auth/constants";

type TokenListener = (token: string | null) => void;
const tokenListeners = new Set<TokenListener>();

export function subscribeToken(listener: TokenListener): () => void {
  tokenListeners.add(listener);
  return () => {
    tokenListeners.delete(listener);
  };
}

let inMemoryToken: string | null = null;

function getCookie(name: string): string | null {
  if (typeof document === "undefined") {
    return null;
  }

  const escapedName = name.replace(/([.$?*|{}()[\]\\/+^])/g, "\\$1");
  const regex = new RegExp(`(?:^|; )${escapedName}=([^;]*)`);
  const match = document.cookie.match(regex);

  return match ? decodeURIComponent(match[1]) : null;
}

function setCookie(name: string, value: string, maxAgeSeconds: number): void {
  if (typeof document === "undefined") {
    return;
  }

  const isSecure = window.location.protocol === "https:" ? "; Secure" : "";
  // biome-ignore lint/suspicious/noDocumentCookie: client-side cookie management for proxy and request authentication
  document.cookie = `${name}=${encodeURIComponent(value)}; Path=/; SameSite=Lax; max-age=${maxAgeSeconds}${isSecure}`;
}

function removeCookie(name: string): void {
  if (typeof document === "undefined") {
    return;
  }

  // biome-ignore lint/suspicious/noDocumentCookie: client-side cookie clearing
  document.cookie = `${name}=; Path=/; SameSite=Lax; max-age=0; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
}

export function getAccessToken(): string | null {
  if (inMemoryToken) {
    return inMemoryToken;
  }

  const cookieToken = getCookie(ACCESS_TOKEN_COOKIE);
  if (cookieToken) {
    inMemoryToken = cookieToken;
    return cookieToken;
  }

  return null;
}

export function setAccessToken(
  token: string,
  maxAgeSeconds = DEFAULT_TTL_SECONDS,
): void {
  inMemoryToken = token;
  setCookie(ACCESS_TOKEN_COOKIE, token, maxAgeSeconds);
  for (const listener of tokenListeners) {
    listener(token);
  }
}

export function clearAccessToken(): void {
  inMemoryToken = null;
  removeCookie(ACCESS_TOKEN_COOKIE);
  for (const listener of tokenListeners) {
    listener(null);
  }
}

export function isAuthenticated(): boolean {
  return Boolean(getAccessToken());
}
