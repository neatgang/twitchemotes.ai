// import { authMiddleware, withClerkMiddleware } from "@clerk/nextjs";
import { clerkMiddleware } from "@clerk/nextjs/server";
 
// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your middleware
// export default authMiddleware({
//   publicRoutes: ["/api/uploadthing", "/api/:path*", "/", "/emote/:path*"]
// });

export default clerkMiddleware({
  // publicRoutes: ["/tools/emoteboard(.*)"] // Ensure this route is public
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};