'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function LandingPage() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push('/home');
    }
  }, [session, router]);

  return (
    <div className="min-h-screen bg-white">
      <main>
        <div className="relative">
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="pt-12 sm:pt-16 lg:pt-24">
              <div className="text-center">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block">朝活で</span>
                  <span className="block text-indigo-600">新しい習慣を作ろう</span>
                </h1>
                <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                  GhoonaCampは、朝活を通じて新しい習慣を作り、
                  目標達成をサポートするプラットフォームです。
                  仲間と一緒に朝活を始めましょう。
                </p>
                <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
                  <div className="rounded-md shadow">
                    <Link
                      href="/auth/signin"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                    >
                      今すぐ始める
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative bg-gray-50 py-16 sm:py-24 lg:py-32">
          <div className="mx-auto max-w-md px-4 text-center sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              GhoonaCampの特徴
            </h2>
            <div className="mt-12">
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                <div className="pt-6">
                  <div className="flow-root rounded-lg bg-white px-6 pb-8">
                    <div className="-mt-6">
                      <h3 className="mt-8 text-lg font-medium text-gray-900">
                        朝活コミュニティ
                      </h3>
                      <p className="mt-5 text-base text-gray-500">
                        同じ目標を持つ仲間と一緒に朝活に取り組めます。
                        モチベーションを高め合いましょう。
                      </p>
                    </div>
                  </div>
                </div>
                <div className="pt-6">
                  <div className="flow-root rounded-lg bg-white px-6 pb-8">
                    <div className="-mt-6">
                      <h3 className="mt-8 text-lg font-medium text-gray-900">
                        習慣トラッキング
                      </h3>
                      <p className="mt-5 text-base text-gray-500">
                        朝活の記録を簡単に管理できます。
                        継続的な成長を可視化します。
                      </p>
                    </div>
                  </div>
                </div>
                <div className="pt-6">
                  <div className="flow-root rounded-lg bg-white px-6 pb-8">
                    <div className="-mt-6">
                      <h3 className="mt-8 text-lg font-medium text-gray-900">
                        目標設定
                      </h3>
                      <p className="mt-5 text-base text-gray-500">
                        週単位の目標設定と振り返りで、
                        着実な成長をサポートします。
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
