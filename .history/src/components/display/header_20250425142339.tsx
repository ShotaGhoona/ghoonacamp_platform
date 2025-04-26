'use client';

import Image from 'next/image';
import { useSession } from 'next-auth/react';

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="flex items-center justify-between h-[70px] px-6 border-b border-slate-200 bg-white">
      {/* 空白をあけて中央に検索バーを置くレイアウト */}
      <div className="flex-1" />

      <div className="flex-1 flex justify-center">
        {/* ダミー検索バー */}
        <input
          type="text"
          placeholder="Search…"
          className="w-72 rounded-full border border-slate-300 px-4 py-1.5 text-sm focus:outline-primary"
        />
      </div>

      <div className="flex-1 flex justify-end items-center gap-4">
        {/* 通知ベルなど置く予定ならここ */}
        <button className="relative">
          <span className="sr-only">Notifications</span>
          <svg
            className="w-5 h-5 text-slate-600"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V4a2 2 0 10-4 0v1.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
        </button>

        {/* ユーザー情報 */}
        {session?.user && (
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-slate-700">
              {session.user.name}
            </span>
            <Image
              src={session.user.image || "/avatar-placeholder.png"}
              alt={session.user.name || "Avatar"}
              width={32}
              height={32}
              className="rounded-full ring-1 ring-slate-300"
            />
          </div>
        )}
      </div>
    </header>
  );
}
