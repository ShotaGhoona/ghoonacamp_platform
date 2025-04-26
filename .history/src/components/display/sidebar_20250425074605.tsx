'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const groups: { title: string; links: { href: string; label: string }[] }[] = [
  {
    title: 'Home',
    links: [
      { href: '/', label: 'Home' },
      { href: '/dashboard', label: 'Dashboard' },
    ],
  },
  {
    title: 'Morning',
    links: [
      { href: '/morning/ranking', label: 'ランキング' },
      { href: '/morning/weekend', label: '今週の朝活状況' },
      { href: '/morning/month', label: '今月の朝活状況' },
    ],
  },
  {
    title: 'Knowledge share',
    links: [
      { href: '/knowledge/tech', label: 'テクノロジー' },
      { href: '/knowledge/leadership', label: 'リーダーシップ' },
      { href: '/knowledge/management', label: 'マネジメント' },
    ],
  },
  {
    title: 'Information',
    links: [{ href: '/information/events', label: 'イベント情報' }],
  },
  {
    title: 'Member',
    links: [{ href: '/members', label: 'GhoonaCamper一覧' }],
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full h-screen bg-[#5D6B80] text-white">
      <div className="flex items-center gap-2 h-[75px] px-4 border-b border-[#374559]">
        <img src="/svg/logo.svg" alt="Ghoona Camp" className="w-[30px] h-[30px]" />
        <span className="font-bold">Ghoona Camp</span>
      </div>

      <nav>
        {groups.map((g) => (
          <div key={g.title} className="border-b border-[#374559] px-4 py-2">
            <p className="px-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
              {g.title}
            </p>
            {g.links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={clsx(
                  'flex items-center gap-2 rounded px-3 py-1.5 text-sm transition-colors',
                  pathname === l.href
                    ? 'bg-primary text-white'
                    : 'hover:bg-slate-600'
                )}
              >
                {/* ●アイコンはお好みで入れる */}
                <span className="shrink-0 w-2 h-2 rounded-full border border-white/30" />
                <span>{l.label}</span>
              </Link>
            ))}
          </div>
        ))}
      </nav>
    </aside>
  );
}
