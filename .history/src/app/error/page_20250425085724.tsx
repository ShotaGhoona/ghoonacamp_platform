'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function ErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-6 shadow-lg">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
            エラーが発生しました
          </h2>
          <p className="mt-2 text-sm text-red-600">
            {error === 'AccessDenied'
              ? 'アクセスが拒否されました'
              : error === 'Configuration'
              ? '設定エラーが発生しました'
              : 'エラーが発生しました'}
          </p>
        </div>
        <div className="mt-8">
          <Link
            href="/login"
            className="group relative flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            ログインページに戻る
          </Link>
        </div>
      </div>
    </div>
  );
} 