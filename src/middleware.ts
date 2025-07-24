import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const PAGE_PROTECTED_PATHS = ["/admin", /^\/admin\/.+$/];

const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtectedPage = PAGE_PROTECTED_PATHS.some((path) =>
    typeof path === "string" ? pathname === path : path.test(pathname)
  );

  if (isProtectedPage) {
    const token = await getToken({ req: request, secret });
    console.log("TOKEN :", token);

    if (!token || token.role !== "Admin") {
      const url = request.nextUrl.clone();
      url.pathname = "/non-autorise";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
