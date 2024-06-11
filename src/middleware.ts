import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { COOKIE_NAME, HEADER_NAME } from "./constants";
import { verifyTokenJose } from "./helpers/jwt";
import { JWTExpired } from "jose/errors";

const isPathname = (request: NextRequest, pathname: string) => {
  return request.nextUrl.pathname.startsWith(pathname);
};

export async function middleware(request: NextRequest) {
  if (
    isPathname(request, "/products") ||
    isPathname(request, "/api/products") ||
    isPathname(request, "/api/wishlist")
  ) {
    const authorization = request.cookies.get(COOKIE_NAME.AUTH);
    if (!authorization)
      return NextResponse.redirect(new URL("/login", request.url));

    const [_, token] = authorization.value.split(" ");
    if (!token) return NextResponse.redirect(new URL("/login", request.url));

    try {
      const { payload } = await verifyTokenJose<{ id: string }>(token);

      const headers = new Headers();
      headers.set(HEADER_NAME.USER_ID, payload.id);

      return NextResponse.next({
        headers,
      });
    } catch (err) {
      if (err instanceof JWTExpired) {
        const response = NextResponse.redirect(new URL("/login", request.url));
        response.cookies.delete(COOKIE_NAME.AUTH);
        return response;
      }
    }
  }
  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: ["/products/:path*", "/api/products/:path*", "/api/wishlist/:path*"],
};
