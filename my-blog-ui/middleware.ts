import { auth } from "@/auth";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export const config = {
  matcher: ["/admin/:path*", "/api/auth/:path*"],
};

export default auth(async (request: NextRequest) => {
  const session = await auth();
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin")) {
    if (!session?.user) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    if (session.user.email !== process.env.NEXT_ALLOW_EMAIL) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  if (request.nextUrl.pathname.startsWith("/api/auth")) {
    if (!session?.access_token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const response = NextResponse.next();

    return response;
  }

  return NextResponse.next();
});
