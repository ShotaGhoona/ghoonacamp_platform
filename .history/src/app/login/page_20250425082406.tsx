'use client';

import { signIn } from 'next-auth/react';
import Image from 'next/image';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-6 shadow-lg">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
            Ghoona Campへようこそ
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            アカウントにログインしてください
          </p>
        </div>
        <div className="mt-8">
          <button
            onClick={() => signIn('google', { callbackUrl: '/' })}
            className="group relative flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <Image
                src="/svg/google.svg"
                alt="Google logo"
                width={20}
                height={20}
              />
            </span>
            Googleでログイン
          </button>
        </div>
      </div>
    </div>
  );
} 