import { type NextRequest, NextResponse } from "next/server";

import { ACCESS_TOKEN_COOKIE } from "@/lib/auth/constants";

export default function proxy(request: NextRequest) {
  const { pathname, search, searchParams } = request.nextUrl;

  const hasSession = request.cookies.has(ACCESS_TOKEN_COOKIE);

  if (pathname.startsWith("/auth")) {
    if (hasSession) {
      const redirectTo = searchParams.get("redirectTo");
      const destination =
        redirectTo?.startsWith("/") && !redirectTo.startsWith("//")
          ? redirectTo
          : "/dashboard";

      return NextResponse.redirect(new URL(destination, request.url));
    }

    return NextResponse.next();
  }

  if (!hasSession) {
    const login = new URL("/auth/login", request.url);

    login.searchParams.set("redirectTo", `${pathname}${search}`);

    return NextResponse.redirect(login);
  }

  return NextResponse.next();
}

export { proxy };

export const config = {
  matcher: ["/auth/:path*", "/dashboard/:path*", "/account/:path*"],
};
