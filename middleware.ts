import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname

  // Check if the path is trying to access the admin area directly
  // This prevents users from accessing admin pages by typing the URL directly
  if (path.startsWith("/admin") && path !== "/admin") {
    // Redirect to the admin login page
    return NextResponse.redirect(new URL("/admin", request.url))
  }

  // Continue with the request
  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/admin/:path*"],
}

