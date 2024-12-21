// src/middleware.ts

import { NextResponse } from "next/server";

export function middleware(request: Request) {
  const userAgent = request.headers.get("user-agent") || "Unknown User Agent";
  const response = NextResponse.next();

  // Set the user-agent in the response headers
  response.headers.set("x-user-agent", userAgent);

  return response;
}

export const config = {
  matcher: "/user-agent", // Only run middleware for the /user-agent route
};
