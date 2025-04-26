import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // 認証済みユーザーがログインページにアクセスした場合はホームにリダイレクト
    if (req.nextUrl.pathname.startsWith("/auth/signin") && req.nextauth.token) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        // 保護されたルートの定義
        const isProtectedRoute = req.nextUrl.pathname.startsWith("/home") ||
                               req.nextUrl.pathname.startsWith("/profile");

        // 保護されたルートは認証が必要
        if (isProtectedRoute) {
          return !!token;
        }

        // その他のルートは認証不要
        return true;
      },
    },
  }
); 