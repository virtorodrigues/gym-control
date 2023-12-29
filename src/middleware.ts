import {
  NextAuthMiddlewareOptions,
  NextRequestWithAuth,
  withAuth,
} from "next-auth/middleware";
import { NextResponse } from "next/server";
import { URL_LOGIN_COMPANY } from "./constants/urls";

const middleware = (request: NextRequestWithAuth) => {
  const isPrivateRoutes = request.nextUrl.pathname.startsWith("/admin");
  const user = request.nextauth.token?.user as any;
  const isAdminUser = user?.role === "admin"!;

  if (isPrivateRoutes && !isAdminUser) {
    //return NextResponse.rewrite(new URL(URL_LOGIN_COMPANY, request.url));
    return NextResponse.redirect(new URL(URL_LOGIN_COMPANY, request.url));
  }

  return NextResponse.next();
};

const callbackOptions: NextAuthMiddlewareOptions = {};

export default withAuth(middleware, callbackOptions);

export const config = { matcher: ["/admin/:path*"] };
