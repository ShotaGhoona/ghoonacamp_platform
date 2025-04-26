'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function AuthError() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            認証エラー
          </h2>
          <div className="mt-4 text-red-600">
            {error === 'Configuration' && '認証の設定に問題があります。'}
            {error === 'AccessDenied' && 'アクセスが拒否されました。'}
            {error === 'Verification' && '認証の検証に失敗しました。'}
            {!error && '認証中にエラーが発生しました。'}
          </div>
          <p className="mt-4 text-gray-600">
            もう一度ログインをお試しください。
          </p>
          <div className="mt-8">
            <Link
              href="/auth/signin"
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              ログインページに戻る
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 