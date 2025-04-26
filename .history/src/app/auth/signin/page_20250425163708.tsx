'use client';

import { signIn } from 'next-auth/react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

export default function SignIn() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';
  const error = searchParams.get('error');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            GhoonaCampへようこそ
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            朝活を通じて、新しい習慣を作りましょう
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
            {error === 'OAuthSignin' && 'ログインの処理中にエラーが発生しました。'}
            {error === 'OAuthCallback' && '認証コールバックでエラーが発生しました。'}
            {error === 'OAuthCreateAccount' && 'アカウントの作成に失敗しました。'}
            {error === 'EmailCreateAccount' && 'メールアドレスでのアカウント作成に失敗しました。'}
            {error === 'Callback' && '認証コールバックでエラーが発生しました。'}
            {error === 'Default' && '認証中にエラーが発生しました。'}
          </div>
        )}

        <div className="mt-8 space-y-4">
          <button
            onClick={() => signIn('google', { callbackUrl })}
            className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Image
              src="/google.svg"
              alt="Google"
              width={20}
              height={20}
              className="mr-2"
            />
            Googleでログイン
          </button>

          <button
            onClick={() => signIn('discord', { callbackUrl })}
            className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Image
              src="/discord.svg"
              alt="Discord"
              width={20}
              height={20}
              className="mr-2"
            />
            Discordでログイン
          </button>
        </div>
      </div>
    </div>
  );
} 