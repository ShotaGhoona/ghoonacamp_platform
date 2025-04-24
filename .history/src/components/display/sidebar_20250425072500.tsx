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
    <aside className="sticky top-0 h-screen w-56 flex-shrink-0 bg-slate-700 text-slate-100">
      <div className="flex items-center gap-2 h-14 px-4 border-b border-white/10">
        {/* ロゴは適宜差し替え */}
        <img src="/logo.svg" alt="Ghoona Camp" className="w-6 h-6" />
        <span className="font-bold">Ghoona Camp</span>
      </div>

      <nav className="p-2 space-y-6 overflow-y-auto">
        {groups.map((g) => (
          <div key={g.title} className="space-y-1">
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
