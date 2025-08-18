import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Protect super-admin routes
  if (pathname.startsWith("/super-admin")) {
    // Check if user is authenticated and has super-admin role
    // In a real implementation, you would verify the JWT token or session
    const userCookie = request.cookies.get("user")

    if (!userCookie) {
      // Redirect to super-admin login if not authenticated
      return NextResponse.redirect(new URL("/login-admin", request.url))
    }

    try {
      const user = JSON.parse(userCookie.value)
      if (user.role !== "super-admin") {
        // Redirect to appropriate dashboard if not super-admin
        return NextResponse.redirect(new URL(`/${user.role}/dashboard`, request.url))
      }
    } catch (error) {
      // Invalid user data, redirect to login
      return NextResponse.redirect(new URL("/login-admin", request.url))
    }
  }

  // Protect admin login page from regular users
  if (pathname === "/login-admin") {
    const userCookie = request.cookies.get("user")

    if (userCookie) {
      try {
        const user = JSON.parse(userCookie.value)
        if (user.role === "super-admin") {
          // Already logged in as super-admin, redirect to dashboard
          return NextResponse.redirect(new URL("/super-admin/dashboard", request.url))
        }
      } catch (error) {
        // Invalid user data, continue to login page
      }
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/super-admin/:path*", "/login-admin"],
}
