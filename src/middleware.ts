import {
  NextAuthMiddlewareOptions,
  NextRequestWithAuth,
  withAuth,
} from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";

const middleware = (request: NextRequestWithAuth) => {
  const isPrivateRoutes = request.nextUrl.pathname.startsWith("/admin");
  const isAdminUser = request.nextauth.token?.user?.role === "admin"!;

  if (isPrivateRoutes && !isAdminUser) {
    return NextResponse.rewrite(new URL("/login", request.url));
  }

  return NextResponse.next();
};

const callbackOptions: NextAuthMiddlewareOptions = {};

export default withAuth(middleware, callbackOptions);

export const config = { matcher: ["/admin/:path*"] };
