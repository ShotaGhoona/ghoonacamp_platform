import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware({
  // 認証が不要なパブリックルート
  publicRoutes: ["/", "/sign-in", "/sign-up"],
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}; 