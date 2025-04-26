'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function HomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">読み込み中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          ようこそ、{session?.user?.name}さん
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              今日の目標
            </h2>
            <p className="text-gray-600">
              今日の目標を設定して、朝活を始めましょう。
            </p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              朝活の記録
            </h2>
            <p className="text-gray-600">
              あなたの朝活の記録を確認できます。
            </p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              コミュニティ
            </h2>
            <p className="text-gray-600">
              仲間と一緒に朝活に取り組みましょう。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
