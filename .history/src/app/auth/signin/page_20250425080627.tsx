'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function SignIn() {
  const router = useRouter();

  const handleSignIn = async () => {
    const result = await signIn('google', {
      callbackUrl: '/',
      redirect: true,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">Ghoona Camp</h1>
        <button
          onClick={handleSignIn}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
        >
          Googleでサインイン
        </button>
      </div>
    </div>
  );
} 