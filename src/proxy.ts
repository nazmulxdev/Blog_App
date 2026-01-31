import { NextRequest, NextResponse } from "next/server";
import { userService } from "./services/user.service";
import { Roles } from "./constants/roles";

export async function proxy(request: NextRequest) {
  console.log(request.url);
  const { data } = await userService.getSession();

  const pathName = request.nextUrl.pathname;
  console.log(pathName);

  let isAuthenticated = false;
  let isAdmin = false;

  if (data) {
    isAuthenticated = true;

    isAdmin = data.user.role === Roles.admin;
  }

  //   user is not authenticated at all
  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  //   user is authenticated and role is admin
  // user can not visit user dashboard
  if (isAdmin && pathName.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/admin-dashboard", request.url));
  }

  //   user is authenticated and role is user
  // user can not visit admin dashboard
  if (!isAdmin && pathName.startsWith("/admin-dashboard")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/dashboard/:path*", "/admin", "/admin/:path*"],
};
