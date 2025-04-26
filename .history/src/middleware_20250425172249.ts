import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  // 認証が不要なパブリックルート
  publicRoutes: ["/", "/sign-in", "/sign-up"],
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}; 