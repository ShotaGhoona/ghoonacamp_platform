'use client';

import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  const { data: session, status } = useSession();

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-xl font-bold text-indigo-600">
                GhoonaCamp
              </Link>
            </div>
          </div>

          <div className="flex items-center">
            {status === 'authenticated' && session ? (
              <div className="flex items-center space-x-4">
                <Link
                  href="/home"
                  className="text-gray-700 hover:text-indigo-600"
                >
                  ホーム
                </Link>
                <div className="relative group">
                  <button className="flex items-center space-x-2">
                    {session.user?.image ? (
                      <Image
                        src={session.user.image}
                        alt={session.user.name || ''}
                        width={32}
                        height={32}
                        className="rounded-full"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-600">
                          {session.user?.name?.[0] || '?'}
                        </span>
                      </div>
                    )}
                    <span className="text-gray-700">{session.user?.name}</span>
                  </button>
                  <div className="absolute right-0 w-48 mt-2 py-1 bg-white rounded-md shadow-lg hidden group-hover:block">
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      プロフィール
                    </Link>
                    <button
                      onClick={() => signOut({ callbackUrl: '/' })}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      ログアウト
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                href="/auth/signin"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                ログイン
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
} 