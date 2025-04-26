'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/">
                <Image
                  src="/logo.png"
                  alt="GhoonaCamp"
                  width={32}
                  height={32}
                  className="h-8 w-auto"
                />
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <Link
              href="/login"
              className="ml-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              ログイン
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
