import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { userResponseSchema } from "@/libs/validations/user";

// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("access_token")?.value;

  if (!token) {
    if (pathname !== "/login") {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next();
  }

  try {
    const res = await fetch(`${process.env.API_BASE_URL}/auth/me`, {
      headers: {
        Cookie: `access_token=${token}`,
      },
    });

    if (!res.ok) {
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.delete("access_token");
      return response;
    }

    const response = await res.json();
    const userData = userResponseSchema.parse(response.data);
    const role = userData.role;

    if (pathname === "/" || pathname === "/login") {
      if (role === "ADMIN") {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
      if (role === "CASHIER") {
        return NextResponse.redirect(new URL("/point-of-sale", request.url));
      }
      if (role === "SCANNER") {
        return NextResponse.redirect(new URL("/scan", request.url));
      }

      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }

    if (pathname.startsWith("/dashboard") && role !== "ADMIN") {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
    if (
      pathname.startsWith("/point-of-sale") &&
      role !== "CASHIER" &&
      role !== "ADMIN"
    ) {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
    if (
      pathname.startsWith("/scan") &&
      role !== "SCANNER" &&
      role !== "ADMIN"
    ) {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Middleware error:", error);
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.delete("access_token");
    return response;
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
