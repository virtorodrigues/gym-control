import { URL_LOGIN_COMPANY, URL_LOGIN_STUDENT } from "@/constants/urls";
import { request } from "http";
import {
  NextAuthMiddlewareOptions,
  NextRequestWithAuth,
  withAuth,
} from "next-auth/middleware";
import { NextResponse } from "next/server";

const middleware = async (request: NextRequestWithAuth) => {
  const isAdminPrivateRoutes = request.nextUrl.pathname.startsWith("/admin");
  const isStudentPrivateRoutes =
    request.nextUrl.pathname.startsWith("/student");

  const user = request.nextauth.token?.user as any;
  const isAdminUser = user?.role === "admin"!;
  const isStudentUser = user?.role === "user"!;

  if (isAdminPrivateRoutes && !isAdminUser) {
    return NextResponse.redirect(new URL(URL_LOGIN_COMPANY, request.url));
  }

  if (isStudentPrivateRoutes && !isStudentUser) {
    return NextResponse.redirect(new URL(URL_LOGIN_STUDENT, request.url));
  }

  return NextResponse.next();
};

const callbackOptions: NextAuthMiddlewareOptions = {
  callbacks: {
    authorized: (data) => {
      return true;
    },
  },
};

export default withAuth(middleware, callbackOptions);

export const config = {
  matcher: ["/admin/:path*", "/student/((?!login).*)"],
};
