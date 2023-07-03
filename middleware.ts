import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export default authMiddleware(
  {
  publicRoutes: ["/", "/login", "/signup", "/m/:name"],
  afterAuth(auth, req, evt) {
    // handle users who aren't authenticated
    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url });
      // return NextResponse.redirect("/")
    }
    // redirect them to organization selection page
  },
}
);

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
}

// export const config = {
//   matcher: ["/((?!.*\\..*|_next).*)","/","/(api|trpc)(.*)"],
// };
